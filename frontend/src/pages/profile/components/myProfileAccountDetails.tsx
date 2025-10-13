import { useEffect, useState } from "react";
import type { AppDispatch } from "../../../stores/Store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { UserDetails } from "../../../types/user";
import { getUser, updateUser } from "../../../api/userSlicer";
import Loading from "../../../components/Loading";

function MyProfileAccountDetails() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [email, setEmail] = useState("");
    const [carType, setCarType] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await dispatch(getUser(userId)).unwrap();
                setName(userData.name || "");
                setLastName(userData.lastname || "");
                setAge(userData.age || "");
                setEmail(userData.email || "");
                setCarType(userData.cartype || "");
            } catch (error: any) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUser();
    }, [dispatch, userId]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let isDigit = /\d/;

        if (age > 150 || age < 10) {
            return toast.error("please enter your real age")
        }

        if (isDigit.test(name) || isDigit.test(lastName)) {
            return toast.error("please enter your real name or surname")
        }

        const updatedUser: UserDetails = {
            name,
            lastname: lastName,
            age,
            email,
            cartype: carType
        };

        try {
            const respond = await dispatch(updateUser({ id: userId, updatedUser })).unwrap();
            if (respond) {
                toast.success("Profile updated successfully");
            }
            setLoading(true);
        } catch (error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="w-full flex justify-center py-10 px-5">
            <div className="bg-white/90 shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Account Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Age
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) =>
                                    setAge(Number(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Car Type
                            </label>
                            <div>
                                <select
                                    value={carType}
                                    onChange={(e) => setCarType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                >
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="I don't have a car">I don't have a car</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MyProfileAccountDetails;
