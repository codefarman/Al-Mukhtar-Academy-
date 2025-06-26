import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// const ADMIN_EMAIL = "alMukhtarAcademy@books.com";
// const ADMIN_PASSWORD = "alMukhtarAcademy@123";

export const adminLogin = (req, res) => {
    const { email, password} = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token =  jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};