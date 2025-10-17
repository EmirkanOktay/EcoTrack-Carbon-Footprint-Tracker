import { useEffect, useState } from "react";
import { createGoal, deleteGoal, getGoal } from "../../api/goalSlicer";
import type { createGoalProp, goalProps } from "../../types/goal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../stores/Store";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Background from "../../Images/background5.png"
import {
    Card,
    CardContent,
    IconButton,
    Typography,
    Divider,
    LinearProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

function MyGoals() {

    const [goals, setGoals] = useState<goalProps[]>([]);
    const [loadingGoals, setLoadingGoals] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [targetValue, setTargetValue] = useState<number>(0);
    const [unit, setUnit] = useState<string>("Count");
    const [category, setCategory] = useState<string>("Other");
    const dispatch = useDispatch<AppDispatch>();

    const getGoals = async () => {
        try {
            setLoadingGoals(true);
            const response = await dispatch(getGoal()).unwrap();
            setGoals(response.goals);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch goals");
            setGoals([]);
        } finally {
            setLoadingGoals(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!title || !description || !targetValue) {
            toast.error("Please fill in all fields");
            return;
        }

        const newGoal: createGoalProp = { title, description, targetValue, unit, category };

        try {
            setSubmitting(true)
            const response = await dispatch(createGoal(newGoal)).unwrap();
            if (response) {
                toast.success("Goal has been created!");
                resetForm();
                await getGoals();
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTargetValue(0);
        setUnit("Count");
        setCategory("Other");
    };


    const deleteButton = async (goalId: string) => {
        try {
            setLoadingGoals(true)
            const response = await dispatch(deleteGoal(goalId)).unwrap();
            if (response) {
                toast.success("Goal Has Been Deleted!");
                setGoals((prev) => prev.filter(goal => goal._id !== goalId));
            }
        } catch (error: any) {
            toast.error(error)
        }
        finally {
            setLoadingGoals(false)
        }
    }

    useEffect(() => {
        getGoals();
    }, []);


    if (loadingGoals) {
        return <Loading />
    }
    else if (submitting) {
        return <Loading />
    }

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <div className="min-h-screen w-full bg-black/60 flex flex-col items-center px-4 md:px-8 py-20">
                <div className="w-full max-w-5xl space-y-10">
                    <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">
                        🎯 My Goals
                    </h1>
                    <p className="text-center text-gray-200 mb-10">
                        Set, track, and achieve your personal growth goals efficiently.
                    </p>

                    <div className="bg-white/85 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full">
                        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
                            Create a New Goal
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Goal title"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
                                    >
                                        <option value="Transport">🚗 Transport</option>
                                        <option value="Recycling">♻️ Recycling</option>
                                        <option value="Energy">⚡ Energy</option>
                                        <option value="Water">💧 Water</option>
                                        <option value="Other">🌱 Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Value
                                    </label>
                                    <input
                                        type="number"
                                        value={targetValue || ""}
                                        onChange={(e) => setTargetValue(Number(e.target.value))}
                                        placeholder="e.g. 100"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit
                                    </label>
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
                                    >
                                        <option value="Km">🏃 Km</option>
                                        <option value="Kg">⚖️ Kg</option>
                                        <option value="%">📊 %</option>
                                        <option value="Count">🔢Count</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Describe your goal..."
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? "Creating..." : "+ Create Goal"}
                            </button>
                        </form>
                    </div>

                    {goals.length === 0 ? (
                        <p className="text-center text-gray-300 italic mt-10">
                            No goals found. Start by creating one above!
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {goals.map((goal) => {
                                const progress =
                                    (goal.currentValue / goal.targetValue) * 100 || 0;
                                return (
                                    <Card
                                        key={goal._id}
                                        className="shadow-lg hover:shadow-2xl transition border border-gray-100 rounded-3xl bg-white/90 backdrop-blur-sm"
                                    >
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <Typography
                                                    variant="h6"
                                                    className="font-semibold text-gray-800"
                                                >
                                                    {goal.title}
                                                </Typography>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => deleteButton(goal._id)}
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>

                                            <Typography
                                                variant="body2"
                                                className="text-gray-600"
                                            >
                                                {goal.description || "No description provided."}
                                            </Typography>

                                            <Divider />

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-gray-700">
                                                    <span>
                                                        {goal.currentValue} / {goal.targetValue}{" "}
                                                        {goal.unit}
                                                    </span>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progress}
                                                    color={goal.completed ? "success" : "success"}
                                                />
                                            </div>

                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p>
                                                    <strong>Category:</strong> {goal.category}
                                                </p>
                                                <p>
                                                    <strong>Started:</strong>{" "}
                                                    {new Date(
                                                        goal.startedDate
                                                    ).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    <strong>Deadline:</strong>{" "}
                                                    {new Date(
                                                        goal.deadline
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <p
                                                className={`text-sm font-semibold mt-2 ${goal.completed
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                                    }`}
                                            >
                                                Status:{" "}
                                                {goal.completed
                                                    ? "Completed ✅"
                                                    : "In Progress ⏳"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyGoals;
