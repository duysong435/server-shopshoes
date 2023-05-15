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

        // req.user = user
        // console.log(req.user)
        // console.log(user)
        next()
    })


}

export default verifyToken