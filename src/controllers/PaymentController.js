// import {

// } from '../services/paymentService'

class PaymentController {

    // [USE] /
    index(req, res) {
        return res.status(200).json({
            errMessage: 'URL error'
        })
    }

    //[GET] /payment/config
    getConfig(req, res) {
        try {
            console.log(process.env.CLIENT_ID)
            return res.status(200).json({
                errCode: '0',
                errMessage: process.env.CLIENT_ID
            })
        } catch (error) {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

}

export default new PaymentController;
