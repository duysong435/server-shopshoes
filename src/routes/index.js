import userRouter from './user'
import productRouter from './product'
import allcodeRouter from './allcode'
import paymentRouter from './payment'
import orderRouter from './order'



const initRoutes = (app) => {

    app.use('/user', userRouter)
    app.use('/product', productRouter)
    app.use('/allcode', allcodeRouter)
    app.use('/payment', paymentRouter)
    app.use('/order', orderRouter)


    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

export default initRoutes;