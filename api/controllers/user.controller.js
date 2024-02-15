import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import nodemailer from 'nodemailer'
import Listing from '../models/listing.model.js';
import jwt from 'jsonwebtoken'

export const test = (req, res) => {
    res.json({
        message: 'API route is working'
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'))
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings'))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'user not found'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

export const forgotPassword = async (req, res, next) => {
    const {email} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            return next(errorHandler(401, 'User hasnt been registered'))
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '10m'})

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASS
            }
          });
          
        let mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Reset Password',
            text: 'Please clink the link below to reset your password, this link will expire in 10 minutes ' + `https://rushton-properties.onrender.com/resetPassword/${token}`
            
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({ message: 'error sending Email'})
            } else {
                return res.json({ success: true, message: 'Email Sent'})
            }
        });
    } catch (error) {
        return next(errorHandler(401, 'Something went wrong'))
    }
}

export const resetPassword = async (req, res, next) => {
    const {token} = req.params;
    const {password} = req.body

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded.id;
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashedPassword})
        return res.json({ status: true, message: "Updated Password Successfully"})

    } catch (err) {
        return next(errorHandler(404, 'Invalid Token'))
    }
}