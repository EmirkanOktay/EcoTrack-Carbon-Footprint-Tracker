const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Notifactions = require("../models/notificationModel");

const createUser = async (req, res) => {
    try {

        const userHasAccount = await User.findOne({ email: req.body.email })

        if (userHasAccount) {
            return res.status(400).json({ message: "User already exist" })
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
            cartype: req.body.carType,
        })

        const sendNotifyToNewUser = new Notifactions({
            user: user._id,
            title: "Welcome To EcoTrack",
            message: `Welcome To EcoTrack: ${user.name}`,
        });

        await user.save();
        await sendNotifyToNewUser.save();
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                password: user.password,
                joinDate: user.joinDate,
                carType: user.carType,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" }),
                notifyForNewUser: sendNotifyToNewUser
            })
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
            res.status(201).json({ message: "Login Has Been Succesful" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { createUser, login }