import {
    createProduct,
    deleteProductService,
    detailProductService,
    getAllProductLimitService,
    getNameService,
    updateProductService
} from '../services/productService'

class ProductController {

    // [USE] /
    index(req, res) {
        return res.status(200).json({
            errMessage: 'URL error'
        })
    }

    // [POST] /product/create-product
    async handleCreateProduct(req, res) {
        try {
            // console.log(req.body)
            const data = req.body
            const response = await createProduct(data)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Missing input parameter"
            })
        }
    }

    //[GET] /product/get-all-product-limit
    async getAllProductLimit(req, res) {
        try {
            // const {} = req.query
            const { offset } = req.query
            const response = await getAllProductLimitService(offset)
            return res.status(200).json(response)
        } catch (error) {
            console.log('Day la loi: ', error)
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[PUT] /product/edit-product
    async handleEditProduct(req, res) {
        try {
            // console.log(req.body)
            const response = await updateProductService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[DELETE] /product/delete-product
    async handleDeleteProduct(req, res) {
        try {
            const response = await deleteProductService(req.body.id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[GET] /product/detail/:id
    async getDetailProduct(req, res) {
        try {
            const response = await detailProductService(req.params.id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[GET] /product/product/:id
    async getNameProduct(req, res) {
        try {
            const response = await getNameService(req.params.id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }
}

export default new ProductController;
