import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {email, password, name} = req.body;    
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({success:false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 7); //hashes the password to become unreadble to the user
        const verificationToken = Math.floor(100000 + Math.random() * 900000); //generates a random 6 digit number

        const newUser = new User({email, 
            password: hashedPassword, 
            name, 
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000 //expires in 1 hour
        });

        await newUser.save();

        // send email with verification token
        generateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmail(newUser.email, verificationToken);
        
        res.status(201).json({
            success: true, 
            message: "User created successfully",
            newUser: {
                ...newUser._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    res.send("Log-in Route");
}

export const logout= async (req, res) => {
    res.send("Log-out Route");
}