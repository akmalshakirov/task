import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultUserData } from "../data";
import type { UserType } from "../types/userType";

const EditUser = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<
        "notfound" | "updated" | "default" | "pending"
    >("default");
    const navigate = useNavigate();
    const [editingUser, setEditingUser] = useState<Partial<UserType | null>>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phone: "",
        role: "",
    });

    const getUser = async () => {
        try {
            if (!id) return;
            const { data } = await axios.get(
                `https://dummyjson.com/users/${id}`
            );
            setEditingUser({
                email: data.email,
                firstName: data.firstName,
                gender: data.gender,
                lastName: data.lastName,
                phone: data.phone,
                role: data.role,
                username: data.username,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 404) {
                    return setStatus("notfound");
                }
                toast.error("Something went wrong!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                    duration: 4444,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleSubmit = async () => {
        try {
            setStatus("pending");
            await axios.put(`https://dummyjson.com/users/${id}`, editingUser);
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                duration: 4444,
            });
            console.log(error);
        } finally {
            setStatus("updated");
        }
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.promise(
            handleSubmit,
            {
                loading: "Editing...",
                error: "Failed to updated user!",
                success: "User updated successfully",
            },
            {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                duration: 4444,
            }
        );
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-60px)]'>
                <p className='text-2xl font-semibold'>Loading user's data...</p>
            </div>
        );
    }
    if (!loading && status === "notfound") {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-60px)]'>
                <h2 className='text-2xl font-semibold'>User not found!</h2>
            </div>
        );
    }

    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-60px)] py-10'>
            <form
                className='bg-primary p-4 sm:p-6 md:p-8 rounded-xl flex flex-col space-y-1 sm:space-y-5 sm:max-w-[500px] sm:w-full'
                onSubmit={submit}>
                <h2 className='text-lg font-semibold sm:text-2xl text-center mb-4'>
                    Update the user's data
                </h2>
                {DefaultUserData.map((data, index) => (
                    <label
                        className='flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'
                        key={data.key}>
                        {data.label}:{" "}
                        <input
                            title={`Edit user's ${data.label}`}
                            aria-label={`Edit user's ${data.label}`}
                            type={
                                data.key === "email"
                                    ? "email"
                                    : data.key === "phone"
                                    ? "tel"
                                    : "text"
                            }
                            required
                            value={editingUser?.[data.key]}
                            onChange={(e) =>
                                setEditingUser((prev) => ({
                                    ...prev,
                                    [data.key]: e.target.value,
                                }))
                            }
                            name={data.key}
                            autoComplete='off'
                            className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-500/20 transition ml-auto sm:w-2/3'
                            autoFocus={index === 0}
                        />
                    </label>
                ))}
                <label className='flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'>
                    Role:{" "}
                    <select
                        name='role'
                        value={editingUser?.role}
                        onChange={(e) =>
                            setEditingUser((prev) => ({
                                ...prev,
                                role: e.target.value,
                            }))
                        }
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20 ml-auto w-full sm:w-2/3'
                        required
                        title="Select to update user's role"
                        aria-label="Select to update user's role">
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                        <option value='moderator'>Moderator</option>
                    </select>
                </label>
                <label className='flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'>
                    Gender:{" "}
                    <select
                        name='gender'
                        value={editingUser?.gender}
                        onChange={(e) =>
                            setEditingUser((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20 ml-auto w-full sm:w-2/3'
                        required
                        title="Select to update user's gender"
                        aria-label="Select to update user's gender">
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </label>
                <div className='flex items-center justify-end gap-5'>
                    {status !== "pending" && (
                        <button
                            type='reset'
                            onClick={() => navigate("/")}
                            className='border-red-600/50 border rounded-lg px-2 py-1 sm:px-4 sm:py-2 outline-none focus:ring-2 focus:ring-red-500/70 text-white bg-red-500/20 cursor-pointer transition hover:bg-red-500/40 mt-3'
                            title='Submit the form'
                            aria-label='Submit the form'>
                            Cancel
                        </button>
                    )}
                    <button
                        className='border-gray-600 border rounded-lg px-2 py-1 sm:px-4 sm:py-2 outline-none focus:ring-2 focus:ring-blue-500 text-white bg-primary cursor-pointer transition hover:bg-gray-500/40 mt-3'
                        title='Cancel and reset the form'
                        aria-label='Cancel and reset the form'>
                        {status === "pending" ? "Sending..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
