import {
    createOrderDetailService,
    createOrderService,
    deleteOrderService,
    getAdminListOrderService,
    getListOrderDetailService,
    getListOrderLimitService,
    getOrderDetailService,
    getOrderService,
    updateOrderStatusService
} from '../services/orderService'

class OrderController {

    // [USE] /
    index(req, res) {
        return res.status(200).json({
            errMessage: 'URL error'
        })
    }

    //[POST] /order/create
    async createOrder(req, res) {
        try {
            const response = await createOrderService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[POST] /order/create-order-detail
    async createOrderDetail(req, res) {
        try {
            const response = await createOrderDetailService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[GET] /order/get-list-order
    async getListOrderLimit(req, res) {
        try {
            const { offset, user_id } = req.query
            const response = await getListOrderLimitService(offset, user_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[GET] /order/get-order-detail
    async getOrderDetail(req, res) {
        try {
            const { order_id } = req.query
            const response = await getListOrderDetailService(order_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[DELETE] /order/delete-order
    async deleteOrder(req, res) {
        try {
            const { id } = req.body
            const response = await deleteOrderService(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[GET] /order/get-out-check
    async getOutCheckOrder(req, res) {
        try {
            const { order_id } = req.query
            const response = await getOrderService(order_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    //[GET] /order/admin/get-list-order
    async getAdminOrderList(req, res) {
        try {
            // const { order_id } = req.query
            const response = await getAdminListOrderService()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }
    //[PUT] /order/admin/update-order-status
    async updateOrderStatus(req, res) {
        try {
            const { id, status } = req.body
            console.log(id, status)
            const response = await updateOrderStatusService(id, status)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

    // [GET] /order/admin/get-order-detail
    async getAdminGetOrderDetail(req, res) {
        try {
            const { order_id } = req.query
            const response = await getOrderDetailService(order_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

}

export default new OrderController;
