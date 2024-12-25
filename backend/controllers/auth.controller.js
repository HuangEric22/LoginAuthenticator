import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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

        const newUser = new User({
            email, 
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
};

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const newUser = await User.findOne( {
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!newUser) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"});
        }

        newUser.isVerified = true;
        newUser.verificationToken = undefined;
        newUser.verificationTokenExpiresAt = undefined;
        await newUser.save();

        await sendWelcomeEmail(newUser.email, newUser.name);

        res.status(200).json({
            success: true, 
            message: "Welcome email sent successfully",
            user: {
                ...newUser._doc,
                password: undefined
            }
        });
                
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success: false, message: `User ${email} not found!`});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid password"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true, 
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        console.log("Error logging in");
        res.status(400).json({success: false, message: error.message});
    }

};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User has logged out successfully"});
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        // generate a reset token
        const resetToken = crypto.randomBytes(69).toString("hex");
        const resetTokenExpiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 hours

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Password reset link has been sent to your email"});
    }
    catch (error) {
        console.log("Error sending password reset email", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }

        // update the password
        const hashedPassword = await bcrypt.hash(password, 7);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Password reset successfully"});

    } catch (error) {
        console.log("Error resetting password", error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, user });

    } catch (error) {
        console.log("Error checking auth", error);
        res.status(400).json({success: false, message: error.message});
    }
};