import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Notifactions from "../models/notificationModel.js";
import { Resend } from "resend";

const createUser = async (req, res) => {
    try {

        let userHasAccount = await User.findOne({ email: req.body.email });
        if (userHasAccount) return res.status(409).send({ message: "User with given email already exist" })

        if (userHasAccount) {
            if (userHasAccount) {
                return res.status(400).json({ message: "User already exists" });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            password: password,
            joinDate: Date.now(),
            cartype: req.body.cartype || "I don't have a car",
        });


        const sendNotifyToNewUser = new Notifactions({
            user: user._id,
            title: "Welcome To EcoTrack",
            message: `Welcome To EcoTrack: ${user.name}`,
        });

        await user.save();
        await sendNotifyToNewUser.save();
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                age: user.age,
                email: user.email,
                joinDate: user.joinDate,
                cartype: user.cartype,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" }),
                notifyForNewUser: sendNotifyToNewUser,
            });
            console.log("user created!")
        }
        else {
            res.status(400).json({ message: "register error" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email: email })

        if (!findUser) {
            return res.status(400).json({ message: "User not found" })
        }
        else {
            const validPassword = await bcrypt.compare(password, findUser.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong Password" })
            }

            const expiresIn = req.body.rememberMe ? "7d" : "1h";

            const token = jwt.sign(
                { id: findUser._id, email: findUser.email },
                process.env.JWT_SECRET,
                { expiresIn }
            );

            res.status(201).json({
                message: "Login Has Been Succesful",
                id: findUser._id,
                token,
            });

        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: "Logout failed" });
            }
            return res.status(200).json({ message: "Logout successful" });
        });
    } else {
        return res.status(400).json({ message: "No active session" });
    }
}

const resetPasswordMail = async (req, res) => {
    const resend = new Resend(process.env.SEND_MAIL_KEY);

    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const token = jwt.sign(
            { userId: findUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const resetLink = `${process.env.CLIENT_URL || "http://localhost:5173"}/auth/reset-your-password/${token}`;

        const mail = await resend.emails.send({
            from: "EcoTrack <no-reply@ecotrack.com>",
            to: email,
            subject: "Reset Your Password",
            html: `
        <h2>Hello ${findUser.name || "User"},</h2>
        <p>If you want to reset your password click the link below:</p>
        <a href="${resetLink}" target="_blank"
           style="display:inline-block;padding:10px 20px;
           background:#16a34a;color:#fff;border-radius:8px;
           text-decoration:none;font-weight:bold">
           Reset Your Password
        </a>
        <p><b>Note:</b> This link is valid only for 15 minutes.</p>
      `
        });

        return res.status(200).json({
            message: "Reset password mail has been sent",
            resetLink,
            mailId: mail?.id || null
        });

    } catch (error) {
        console.error("Resend error:", error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) return res.status(400).json({ msg: "Password required" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({ msg: "User not found" });

        const encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword;
        await user.save();

        res.json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Invalid or expired token" });
    }
};

const resetPasswordFromProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide both passwords" });
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        const sendNotify = new Notifactions({
            user: user._id,
            title: "Your Password Has Been Changed",
            message: `If you did not change password please change your password and secure your account`,
        });

        await sendNotify.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getUserInfos = async (req, res) => {
    try {
        const userId = req.params.id;
        const findUser = await User.findById(userId);
        if (findUser) {
            res.status(200).json({
                name: findUser.name,
                lastname: findUser.lastname,
                age: findUser.age,
                email: findUser.email,
                joinDate: findUser.joinDate,
                cartype: findUser.cartype,
                joinDate: findUser.joinDate,
                level: findUser.level,
                xpCounter: findUser.xpCounter,
                lastSeen: findUser.lastSeen
            })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, lastname, age, email, cartype } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name ?? user.name;
        user.lastname = lastname ?? user.lastname;
        user.age = age ?? user.age;
        user.email = email ?? user.email;
        user.cartype = cartype ?? user.cartype;

        await user.save();

        const sendNotify = new Notifactions({
            user: user._id,
            title: "Your Personal Details Has Been Changed",
            message: `If you did not change please change your password and secure your account`,
        });

        await sendNotify.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


export { createUser, login, logout, resetPassword, resetPasswordMail, getUserInfos, resetPasswordFromProfile, updateUser };
