import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"
import mongoose from "mongoose";

const showAllNotifys = async (req, res) => {
    try {
        const userId = req.auth?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const notify = await Notification.find({ user: new mongoose.Types.ObjectId(userId) })

        res.status(200).json({ success: true, notifications: notify });
    } catch (error) {
        console.error("notifications error:", error);
        res.status(500).json({ message: "notifications error" });
    }
};


const markRead = async (req, res) => {
    try {
        const userId = req.auth?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        await Notification.updateMany(
            { user: new mongoose.Types.ObjectId(userId), read: false },
            { $set: { read: true } }
        );

        const updatedNotifications = await Notification.find({ user: new mongoose.Types.ObjectId(userId) })
            .sort({ createdAt: -1 });

        res.status(200).json({ notifications: updatedNotifications });

    } catch (error) {
        console.error("notifications error:", error);
        res.status(500).json({ message: "notifications error" });
    }
};

export { showAllNotifys, markRead }