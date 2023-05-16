import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {

    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            errCode: 1,
            errMessage: 'Access token expired'
        })

        if (user?.role_id !== 'R1') {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Khong co quyen Admin'
            })
        }
        next()
    })


}

export default verifyToken