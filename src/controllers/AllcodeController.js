import {
    getAllCodeService
} from '../services/allcodeService'

class AllcodeController {

    // [USE] /
    index(req, res) {
        return res.status(200).json({
            errMessage: 'URL error'
        })
    }

    // [GET] /api/allcode/get-all-code
    async getAllCode(req, res) {
        try {
            // console.log(req.query)
            let data = await getAllCodeService(req.query.type);
            return res.status(200).json(data)
        } catch (error) {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }

}

export default new AllcodeController;
