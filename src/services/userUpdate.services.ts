import { Request } from 'express'
import Product from '../interfaces/products.interfaces'
import User from '../interfaces/user.interfaces'
import UsersModels from '../models/Users.models'
import nodemailer from 'nodemailer'
import config from '../config'
import passport from 'passport'
import { createTokenService } from './token.services'
import dotenv from 'dotenv'
dotenv.config()

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

export const updatePasswordService = async (password: string, id: string): Promise<any> => {
    try {
        UsersModels.findById(id, async (err: any, result: any) => {
            if (err) return false
            result.password = password
            await result.save()
        })
    } catch (error) {
        throw error
    }
}

export const updatePersonalDataService = async (req: Request, id: string) => {
    try {
        const query = { _id: id }
        const update: User = req.body

        UsersModels.findOneAndUpdate(query, update, (err: any, result: any) => {
            if (err) return false
            return result
        })
    } catch (error) {
        throw error
    }
}

export const addProductFavorite = async (req: Request, id: string) => {
    const product: Product = req.body.favorites
    console.log(id)
    try {
        UsersModels.findById(id, product, async (err: any, result: any) => {
            console.log(result)
        })
    } catch (error) {
        throw error
    }
}

export const updatePassword = async (password: string, id: string) => {
    try {
        UsersModels.findById(id, async function (err: any, result: any) {
            if (err) return false;
            result.password = password;
            await result.save();
        });
    } catch (e) {
        throw e
    }
}

export const forgotPasswordService = async (req: Request): Promise<any> => {
    console.log(req.body.email)
    const message = "Please check your email for password reset link";
    var emailStatus = "ok";
    var verificationLink;
    try {
        var user: any = await UsersModels.findOne({ email: req.body.email })
        if(!user) throw new Error('Email does not exists')
        var token = createTokenService(user)
        user.resetToken = token
        verificationLink = `${process.env.URL_CLIENT}/change-password?token=${token}`
        await user.save()
    } catch (error: any) {
        throw Error(error || error.message)
    }
    try {
        var mailOptions = {
            from: `"Reset Password" <${config.NODEMAILER.USER}>`,
            to: req.body.email,
            subject: 'Forgot password',
            html: `<h2> ${user?.name}! This email was send to you because you told to us you forgot your password, if you don't requested it, then ignore this email. </h2>
            <h4>Please follow the link in order to proceed to change your password</h4>
            <a href=${verificationLink}> ${verificationLink}</a>`
        }
        await transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.error(error);
                throw Error('Something went wrong')
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    } catch (error: any) {
        throw Error(error || error.message)
    }
    return { message, info: emailStatus }
}
export const resetPasswordService = async (req: Request): Promise<any> => {
    try {
        console.log(req.body.password, req.params.token)
        const token = req.params.token
        passport.authenticate('jwt', { session: false })
        var user = await UsersModels.findOne({ resetToken: token })
        user ? user.password = req.body.password : { message: 'Password changed correctly' }
        await user?.save()
        return { message: 'Password changed correctly' }
    } catch (error: any) {
        return error || error.message
    }
}