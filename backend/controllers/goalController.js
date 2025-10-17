import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"
import Goal from "../models/goalsModel.js"

const createGoal = async (req, res) => {
    try {
        const userId = req.auth?.id;
        const { title, description, targetValue, unit, category, startedDate, deadline } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const newGoal = new Goal({
            user: userId,
            title,
            description,
            targetValue,
            unit,
            category,
            startedDate: startedDate || new Date(),
            deadline: deadline || (() => {
                const d = new Date();
                d.setMonth(d.getMonth() + 1);
                return d;
            })(),
            completed: false,
            currentValue: 0
        });

        await newGoal.save();

        const sendNotify = new Notification({
            user: userId,
            title: "New Goal Has Been Created",
            message: `New Month New Goal Let's Reduce Some Carbon!`,
        });

        await sendNotify.save();

        res.status(200).json({ message: "Goal Has Been Created!", goal: newGoal, notify: sendNotify });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const getGoal = async (req, res) => {
    try {
        const userId = req.auth?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setMilliseconds(-1);

        const goals = await Goal.find({
            user: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        res.status(200).json({ goals });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const userId = req.auth?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { goalId } = req.body;
        if (!goalId) return res.status(400).json({ message: "Goal ID is required" });

        const goal = await Goal.findOne({ _id: goalId, user: userId });
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        await goal.deleteOne();

        const sendNotify = new Notification({
            user: userId,
            title: "Goal Has Been Deleted",
            message: "Goal has been deleted. You can create a new goal.",
        });
        await sendNotify.save();

        res.status(200).json({ message: "Goal deleted successfully", notify: sendNotify });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


const editGoal = async (req, res) => {
    try {
        const { goalId, title, description } = req.body;
        const userId = req.auth?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        if (!goalId) return res.status(400).json({ message: "Goal ID is required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setMilliseconds(-1);

        const goal = await Goal.findOne({
            _id: goalId,
            user: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found for this month" });
        }

        if (goal.completed) {
            return res.status(400).json({ message: "You can't edit a completed goal." });
        }

        goal.title = title ?? goal.title;
        goal.description = description ?? goal.description;

        await goal.save();

        return res.status(200).json({ message: "Goal has been updated", goal });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export { createGoal, getGoal, deleteGoal, editGoal };
