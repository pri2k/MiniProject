import User from "@/models/User";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e41b040579a1c5",
                pass: "46b2cbdfd6d7dd"
            }
        });

        const mailOptions = {
            from: "tokosaniya09@gmail.com",
            to: "email",
            subjec: emailType === "VERIFY" ? "Verify your email" : "Reset your password", html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}