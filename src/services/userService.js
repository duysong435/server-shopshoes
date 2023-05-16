import db from '../models/index'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const salt = bcrypt.genSaltSync(10);
import { v4 } from 'uuid'


const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
}


const loginUserServices = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: {
                    email: data.email
                },
                raw: true
            })
            console.log(response)
            const isCorrectPassword = response && bcrypt.compareSync(data.password, response.password)
            const token = isCorrectPassword && jwt.sign({ id: response.id, email: response.email, role_id: response.role_id }, process.env.SECRET_KEY, { expiresIn: '2d' })
            resolve({
                errCode: token ? 0 : 2,
                errMessage: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Email not found !',
                token: token || null,
                role: response?.role_id,
                idUser: response?.id

            })
        } catch (error) {
            reject(error)
        }
    })
}

const createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            const response = await db.User.findOrCreate({
                where: {
                    email: data.email
                },
                defaults: {
                    id: v4(),
                    email: data.email,
                    password: hashPassword(data.password),
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address ? data.address : '',
                    phone_number: data.phoneNumber ? data.phoneNumber : '',
                    gender: data.gender ? data.gender : 'O',
                    image: data.image ? data.image : '',
                    role_id: data.role_id ? data.role_id : 'R2'
                }
            })
            const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
            resolve({
                errCode: token ? 0 : 2,
                errMessage: token ? 'Register is successfully !' : 'Email has been aldready used !',
                token: token || null
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getAllUserLimitService = (offset) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(offset)
            const response = await db.User.findAndCountAll({
                // where: queries,
                raw: true,
                nest: true,
                offset: +offset * (process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                // include: [

                // ],
                // attributes: ['id', 'title', 'star', 'address', 'description']
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                errCode: response ? 0 : 1,
                errMessage: response ? 'OK' : 'Getting posts is failed.',
                response
            })
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: { id: userId }
            });

            resolve({
                errCode: 0,
                errMessage: `The user is deleted`
            })
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const updateUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.role_id = data.role_id;
                user.gender = data.gender;
                user.phone_number = data.phoneNumber;
                if (data.image) {
                    user.image = data.image
                }

                await user.save();
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

export {
    loginUserServices,
    createUserService,
    getAllUserLimitService,
    deleteUserService,
    updateUserService
}