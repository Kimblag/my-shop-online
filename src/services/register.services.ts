import UsersModels from '../models/Users.models'
import { Request } from 'express'
import nodemailer from 'nodemailer'
import config from '../config'


var transporter = nodemailer.createTransport({
    service: config.NODEMAILER.SERVICE,
    auth: {
        user: config.NODEMAILER.USER,
        pass: config.NODEMAILER.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const registerService = async (req: Request): Promise<any> => {
    try {
        const user = await UsersModels.findOne({ email: req.body.email })
        if (user) throw new Error('Email already exists')
        const newUser = new UsersModels(req.body)
        await newUser.save()
        var mailOptions = {
            from: `"Verify your email" <${config.NODEMAILER.USER}>`,
            to: newUser.email,
            subject: 'Verify your email',
            html: `<h2> ${newUser.name}! Thanks for registering on our site </h2>
            <h4>Please verify your email to continue...</h4>
            <a href="http://${req.headers.host}/signup/verify-email?id=${newUser.id}">Verify Your Email</a>`
        }
        await transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        return {
            message: 'User created successfully',
            user: newUser
        }
    } catch (error: any) {
        console.error(error)
    }
}