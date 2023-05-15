import {
    createUserService,
    deleteUserService,
    getAllUserLimitService,
    loginUserServices,
    updateUserService
} from '../services/userService'

class UserController {

    // [USE] /
    index(req, res) {
        return res.status(200).json({
            errMessage: 'URL error'
        })
    }

    //[POST] /user/login
    async login(req, res) {
        try {
            const data = req.body;
            if (data && data.email && data.password) {
                const response = await loginUserServices(data);
                return res.status(200).json({
                    // errCode: 0,
                    // errMessage: 'Ok',
                    data: response
                })
            } else {
                return res.status(500).json({
                    errCode: 1,
                    errMessage: "Missing input parameter"
                })
            }

        } catch (error) {
            console.log(error)
        }

    }

    //[POST] /user/register
    async handleRegisterUser(req, res) {
        try {
            console.log(req.body)
            const response = await createUserService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Missing input parameter"
            })
        }
    }

    //[POST] /user/get-all-user-limit
    async getAllUserLimit(req, res) {
        try {
            const { offset } = req.query
            // console.log(req.query)
            const response = await getAllUserLimitService(offset)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[DELETE] /user/delete-user
    async handleDeleteUser(req, res) {
        try {
            const { id } = req.body
            const response = await deleteUserService(id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    //[PUT] /user/edit-user
    async handleEditUser(req, res) {
        try {
            // console.log(req.body)
            const response = await updateUserService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }
}

export default new UserController;
