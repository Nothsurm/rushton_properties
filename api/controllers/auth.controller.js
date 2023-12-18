import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save(); //saves the data inside the database
        res.status(201).json('User Created');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });   //tests if email exists
        if (!validUser) return next(errorHandler(404, 'User not found!'));  //if email doesnt exist
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc         //prevents password leakage
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)       //seperates password from the rest of the encyrption
    } catch (error) {
        next(error)
    }
}