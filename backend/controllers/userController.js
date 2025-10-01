const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Notifactions = require("../models/notificationModel");

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
                token,
                name: findUser.name,
                lastname: findUser.lastname,
                age: findUser.age,
                email: findUser.email,
                cartype: findUser.cartype,
                joinDate: findUser.joinDate,
                level: findUser.level,
                xpCounter: findUser.xpCounter,
                lastSeen: findUser.lastSeen,
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


const getUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const findUser = await User.findOne({ _id: userId });
        if (!findUser) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(findUser);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = { createUser, login, logout, getUserData }