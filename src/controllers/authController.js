import { createToken } from "../helpers/authHelper.js";
import authService from "../services/authService.js";


const registerUser = async (req, res) => {
    try {
        const input = req.body;
        const data = await authService.registerUser(input);
        const token = createToken(data);
        res.cookie("authToken", token);
        res.json({ ...data, token });

    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
};

const loginUser = async (req, res) => {
    const input = req.body;
    try {

        const data = await authService.loginUser(input);
        const token = createToken(data);
        res.cookie("authToken", token);
        res.json({ ...data, token });
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const logoutUser = async (req, res) => {
    await res.clearCookie("authToken");
    res.send("logout successfully.");
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) return res.status(422).send("email is required.");
    try {
        const data = await authService.forgotPassword(email);
        res.send(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};

const resetPassword = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const token = req.query.token;
    const userId = req.params.userId;
    if (!password) return res.send("Password is required");
    if (password != confirmPassword) {
        return res.status(400).send("Password does not matched.");
    };
    try {
        const data = await authService.resetPassword(userId, password, token);
        res.json(data);


    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};


export { registerUser, loginUser, logoutUser, forgotPassword, resetPassword }