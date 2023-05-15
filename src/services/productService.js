import db from '../models/index'
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'
// const salt = bcrypt.genSaltSync(10);
import { v4 } from 'uuid'

const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(data?.data)
            await db.Product.create({
                id: v4(),
                name: data?.name,
                title: data?.title,
                image: data?.image,
                price: +data?.price,
                description: data?.description,
                brand_id: data?.brand_id,
            })
            resolve({
                errCode: 0,
                errMessage: 'Create product success!',
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getAllProductLimitService = (offset) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("Get all product: ", offset)
            const response = await db.Product.findAndCountAll({
                // where: queries,
                raw: true,
                nest: true,
                offset: +offset * (process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                // include: [

                // ],
                // attributes: ['id', 'title', 'star', 'address', 'description']
                attributes: {
                    // exclude: ['image']
                }
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const updateProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let product = await db.Product.findOne({
                where: { id: data.id },
                raw: false
            })
            if (product) {
                product.name = data.name;
                product.title = data.title;
                product.price = data.price;
                product.description = data.description;
                product.brand_id = data.brand_id;
                if (data.image) {
                    product.image = data.image
                }

                await product.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                })
            }
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Product.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The product isn't exist`
                })
            }
            await db.Product.destroy({
                where: { id: id }
            });

            resolve({
                errCode: 0,
                errMessage: `The product is deleted`
            })
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const detailProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await db.Product.findOne({
                where: { id: id },
                raw: false
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

const getNameService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                console.log(id)
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await db.Product.findOne({
                where: { id: id },
                raw: false,
                attributes: {
                    exclude: ['image', 'createdAt', 'updatedAt']
                }
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

export {
    createProduct,
    getAllProductLimitService,
    updateProductService,
    deleteProductService,
    detailProductService,
    getNameService
}