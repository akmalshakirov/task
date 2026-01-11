import axios from "axios";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DefaultUserData } from "../data";
import type { UserType } from "../types/userType";

const CreateUser = () => {
    const [newUserData, setNewUserData] = useState<Partial<UserType>>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phone: "",
        role: "",
    });
    const [status, setStatus] = useState<"created" | "pending" | "default">(
        "default"
    );
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setStatus("pending");
            await axios.post(`https://dummyjson.com/users/add`, newUserData);
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        } finally {
            setStatus("created");
        }
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.promise(
            handleSubmit,
            {
                loading: "Sending...",
                error: "Failed to create user!",
                success: "User created successfully",
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

    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-60px)] py-10'>
            <form
                className='bg-primary p-4 sm:p-6 md:p-8 rounded-xl flex flex-col space-y-1 sm:space-y-5 sm:max-w-[500px] sm:w-full'
                onSubmit={submit}>
                <h2 className='text-lg font-semibold sm:text-2xl text-center mb-4'>
                    Create user
                </h2>
                {DefaultUserData.map((data, index) => (
                    <label
                        className='flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'
                        key={data.key}>
                        {data.label}:{" "}
                        <input
                            title={`Enter a ${data.label}`}
                            aria-label={`Enter a ${data.label}`}
                            type={
                                data.key === "email"
                                    ? "email"
                                    : data.key === "phone"
                                    ? "tel"
                                    : "text"
                            }
                            required
                            value={newUserData[data.key]}
                            onChange={(e) =>
                                setNewUserData((prev) => ({
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
                        value={newUserData.role}
                        onChange={(e) =>
                            setNewUserData((prev) => ({
                                ...prev,
                                role: e.target.value,
                            }))
                        }
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20 ml-auto w-full sm:w-2/3'
                        required
                        title='Select role for new user'
                        aria-label='Select role for new user'>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                        <option value='moderator'>Moderator</option>
                    </select>
                </label>
                <label className='flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center'>
                    Gender:{" "}
                    <select
                        name='gender'
                        value={newUserData.gender}
                        onChange={(e) =>
                            setNewUserData((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20 ml-auto w-full sm:w-2/3'
                        required
                        title='Select gender for new user'
                        aria-label='Select gender for new user'>
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

export default CreateUser;
