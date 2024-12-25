import { transportClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [email]
    
    try {
        const response = transportClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Verify Your Account",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email"
        });
        
        console.log("Verfication Email sent successfully", response);

    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error("Error sending verification email", error);
    }
};

export const sendWelcomeEmail = async (email) => {
    const recipient = [email];

    try {
        const response = transportClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Welcome to Bruin Planner!",
            html: WELCOME_EMAIL_TEMPLATE,          
        });

        console.log("Welcome Email sent successfully", response);

    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email", error);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [email];

    try {
        const response = transportClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Email"
        });

        console.log("Password Reset Email sent successfully", response);

    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error("Error sending password reset email", error);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [email];

    try {
        const response = transportClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success"
        });

        console.log("Password Reset Success Email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw new Error("Error sending password reset success email", error);
    }
}

// const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });