// import { Document } from 'mongoose'
// import nodemailer from 'nodemailer'
// import config from '../config'
// import { IOrder } from '../interfaces/order.interfaces'
// import UsersModels from '../models/Users.models'
// import { products } from '../seeder/products'


// var transporter = nodemailer.createTransport({
//     service: config.NODEMAILER.SERVICE,
//     auth: {
//         user: config.NODEMAILER.USER,
//         pass: config.NODEMAILER.PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

// export const sendOrderEmailSummary = async (order: Document<unknown, any, IOrder> & IOrder & {
//     _id: string;
// }) => {
//     const user = await UsersModels.findById(order.userId)
//     console.log(user?.email)
//     let products = order.products.map(product => {
//         return {
//             Product: product.product
//         }
//     })

//     var mailOptions = {
//         from: `"Verify your email" <${config.NODEMAILER.USER}>`,
//         to: user?.email,
//         subject: 'Order Summary',
//         html: `<h2> ${user?.name}! Thanks for purchase on our site </h2>
//         <h4>Here is your purchase summary</h4>
//         <ul> </ul>
        
//         `
//     }
//     await transporter.sendMail(mailOptions, function (error: any, info: any) {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     })
// }