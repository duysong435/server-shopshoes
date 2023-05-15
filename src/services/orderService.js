import { or } from 'sequelize';
import db from '../models/index'
import { v4 } from 'uuid'


const createOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order_id = v4();
            await db.Order.create({
                id: order_id,
                user_id: data.user_id,
                payment_method: data.payment_method,
                status: data.status,
                total_money: data.total_money,
                is_paid: data.is_paid,
                paidAt: data.paidAt ? data.paidAt : null
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                order_id: order_id
            })
        } catch (error) {
            reject()
        }
    })
}

const createOrderDetailService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.order_id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing value!'
                })
            } else {

                const order = await db.Order.findOne({
                    where: {
                        id: data.order_id
                    },
                    raw: true
                })
                if (order) {
                    await db.Order_Detail.create({
                        order_id: data.order_id,
                        product_id: data.product_id,
                        size: data.size,
                        amount: data.amount,
                        price: data.price,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Ok',
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Error!'
                    })
                }
            }
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const getListOrderLimitService = (offset, user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Order.findAndCountAll({
                where: {
                    user_id: user_id
                },
                raw: true,
                nest: true,
                offset: +offset * (process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response
            })
        } catch (error) {
            reject()
        }
    })
}

const getListOrderDetailService = (order_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const response = await db.Order_Detail.findAll({
            //     where: {
            //         order_id: order_id
            //     },
            //     raw: true,
            //     nest: true,
            //     attributes: {
            //         exclude: ['password', 'image']
            //     }
            // })
            // const orderDetails = await db.Order.findAll({
            //     where: { id: '8272c6ca-12ea-4219-be11-a322795f3bc8' },
            //     include: [
            //         { model: db.Product, attributes: [] },
            //     ]
            // });
            // const response = await db.Product.findAll({
            //     raw: true,
            //     include: [{
            //         model: db.Order,
            //         through: {
            //             model: db.Order_Detail,
            //             attributes: ['size', 'amount', 'price'],
            //             where: { id: order_id }
            //         },
            //         attributes: ['id']
            //     }]
            // }).then(products => {
            //     console.log(products);
            // });
            const response = await db.Order_Detail.findAll({
                where: { order_id: order_id },
                raw: true,
                nest: true,
                include: [{
                    model: db.Product, as: 'dataProduct', attributes: ['id', 'name', 'image']
                }],
                attributes: {
                    exclude: ['product_id']
                }
            })
            // .then(orderDetails => {
            //     console.log('áds', orderDetails);
            // });

            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response: response
            })
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const deleteOrderService = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.Order.findOne({
            //     where: { id: idOrder }
            // })
            // if (!user) {
            //     resolve({
            //         errCode: 2,
            //         errMessage: `The user isn't exist`
            //     })
            // }
            // await db.Order.destroy({
            //     where: { id: userId }
            // });
            // db.Order.destroy({
            //     where: { id: idOrder },
            //     include: [{ model: db.Order_Detail }]
            //   }).then(() => {
            //     console.log('Đã xoá dữ liệu thành công!');
            //   }).catch((error) => {
            //     console.log(error);
            //   });

            db.Order.destroy({
                where: { id: idOrder },
                include: [{ model: db.Order_Detail }]
            }).then(num => {
                if (num === 1) {
                    console.log("Order and its details have been successfully deleted");
                } else {
                    console.log("Failed to delete the order or it's details");
                }
            }).catch(err => console.log(err));


            resolve({
                errCode: 0,
                errMessage: `Order is deleted`
            })
        } catch (error) {
            reject()
        }
    })
}

// Lấy dữ liệu bảng order_detail và bảng product thông qua id bảng
const getOrderService = (order_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // await db.Order.findAll({
            //     include: [
            //         {
            //             model: db.Order_Detail,
            //             include: [Product],
            //         },
            //     ],
            // }).then((orders) => {
            //     console.log(orders);
            // });

            const response = await db.Order.findAll({
                where: { id: order_id },
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Order_Detail,
                        attributes: {
                            exclude: ['size', 'createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: db.Product, as: 'dataProduct',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response: response
            })

        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const getAdminListOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // await db.Order.findAll({
            //     include: [
            //         {
            //             model: db.Order_Detail,
            //             include: [Product],
            //         },
            //     ],
            // }).then((orders) => {
            //     console.log(orders);
            // });

            const response = await db.Order.findAll({
                raw: true,
                nest: true,
                include: [
                    // {
                    //     model: db.Order_Detail,
                    //     attributes: {
                    //         exclude: ['size', 'createdAt', 'updatedAt']
                    //     },
                    //     // include: [
                    //     //     {
                    //     //         model: db.Product, as: 'dataProduct',
                    //     //         attributes: ['id', 'name']
                    //     //     }
                    //     // ]
                    // },
                    {
                        model: db.User,
                        attributes: {
                            exclude: ['password', 'image', 'role_id']
                        }
                    },
                    {
                        model: db.Allcode,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt   ']
                        }
                    }
                ]
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response: response
            })

        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const updateOrderStatusService = (id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Order.update(
                { status: status }, // object chứa các giá trị cần cập nhật
                { where: { id: id } } // điều kiện để lấy ra đúng bản ghi cần cập nhật
            )
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
            })

        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const getOrderDetailService = (order_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Order.findAll({
                where: {
                    id: order_id
                },
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Order_Detail,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'order_id', 'product_id']
                        },
                        include: [
                            {
                                model: db.Product, as: 'dataProduct',
                                attributes: ['name', 'image']
                            }
                        ]
                    },
                ],
                attributes: ['total_money', 'id']
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response: response
            })
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}



export {
    createOrderService,
    createOrderDetailService,
    getListOrderLimitService,
    getListOrderDetailService,
    deleteOrderService,
    getOrderService,
    getAdminListOrderService,
    updateOrderStatusService,
    getOrderDetailService
}