
import ResetPassword from "../models/resetPassword.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const registerUser = async (input) => {
    const user = await User.findOne({ email: input.email });
    if (user) {
        throw {
            statusCode: 400,
            message: "User already exist."
        }
    }
    const hashedPassword = bcrypt.hashSync(input.password);
    const createdUser = await User.create({
        name: input.name,
        address: input.address,
        email: input.email,
        password: hashedPassword,
        roles: input.roles
    });
    // return createdUser;
    return {
        id: createdUser._id,
        name: createdUser.name,
        address: createdUser.address,
        email: createdUser.email,
        roles: createdUser.roles,
        createdAt: createdUser.createdAt
    };
};
const loginUser = async (input) => {
    const user = await User.findOne({ email: input.email });
    if (!user)
        throw {
            statusCode: 400,
            message: "user not found."
        };
    const isPasswordMatched = bcrypt.compareSync(input.password, user.password);
    if (!isPasswordMatched) {
        throw {
            statusCode: 400,
            message: "email and password does not matched."

        };
    }

    // return user;
    return {
        id: user._id,
        name: user.name,
        address: user.address,
        email: user.email,
        roles: user.roles,
        createdAt: user.createdAt
    };
};


const forgotPassword = async (email) => {
    const user = await User.findOne({ email });

    const otp = Math.floor(Math.random() * 1000000) + 1;

    await ResetPassword.create({
        userId: user._id,
        token: otp
    });
    return { message: "reset password link has been send." };
};



const resetPassword = async (userId, password, token) => {

    const data = await ResetPassword.findOne({ userId,expireAt:{$gt:Date.now()}, });

    if (!data || data.token != token) {
        throw {
            statusCode: 400,
            message: "Invalid token."
        };
    };
    if(data.isUsed){
        throw{
            statuscode:400,
            message:"Token already used."
        };
    };
    const hashedPassword = bcrypt.hashSync(password);
    await User.findByIdAndUpdate(userId, {
       password: hashedPassword
    });
    await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });
    return { message: "Password reset successfully." }

}; 


export default { registerUser, loginUser, forgotPassword, resetPassword }