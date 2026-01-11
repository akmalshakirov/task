import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import Table from "../components/table";
import { TableColumns } from "../data";
import type { FilterUsersBy, UserType } from "../types/userType";

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserType[] | null>(null);
    const [limit, setLimit] = useState<number>(10);
    const [query, setQuery] = useState<string>("");
    const [filter, setFilter] = useState<FilterUsersBy | string>("asc");

    const getUsers = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(`https://dummyjson.com/users`, {
                params: {
                    limit: limit,
                },
            });

            setData(data.users);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [limit]);

    const deleteUser = async (id: number) => {
        try {
            const { data } = await axios.delete(
                `https://dummyjson.com/users/${id}`
            );

            return data;
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
        }
    };

    const handleDelete = (item: UserType) => {
        const conf = confirm(
            `Do you really want to delete user ${item.firstName}?`
        );
        conf &&
            toast.promise(
                deleteUser(Number(item.id)),
                {
                    loading: "Deleting user...",
                    success: (data: UserType) =>
                        `User ${data.firstName} deleted successfully`,
                    error: "Failed to delete user!",
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

    const searchUsers = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/users/search?q=${e.target.value}`,
                {
                    params: {
                        limit: limit,
                    },
                }
            );

            setData(data.users);
            console.log(data.users);
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
        }
    };

    const filterUsers = async (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
        try {
            const { data } = await axios.get(`https://dummyjson.com/users`, {
                params: {
                    ...(e.target.value == "desc" || e.target.value == "asc"
                        ? { order: e.target.value }
                        : { sortBy: e.target.value }),
                    limit: limit,
                },
            });

            setData(data.users);
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
        }
    };

    return (
        <>
            <div className='flex flex-wrap items-center justify-center gap-5 p-5 bg-primary mb-5 border-t border-t-gray-200/50'>
                <label>
                    Fetch limit:{" "}
                    <select
                        title='Limit fetching users'
                        aria-label='Limit fetching users'
                        name='limit'
                        onChange={(e) => setLimit(Number(e.target.value))}
                        value={limit}
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20'>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='50'>50</option>
                    </select>
                </label>

                <label>
                    Search:{" "}
                    <input
                        title='Search for users'
                        aria-label='Search for users'
                        name='search'
                        value={query}
                        onChange={searchUsers}
                        type='text'
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-500/20'
                        autoFocus
                        autoComplete='off'
                    />
                </label>

                <label>
                    Filter by:{" "}
                    <select
                        title={`Filter users by: ${filter}`}
                        aria-label={`Filter users by: ${filter}`}
                        name='filter'
                        onChange={filterUsers}
                        value={filter}
                        className='border-gray-600 border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-white open:text-black open:bg-gray-200 bg-gray-500/20'>
                        <option value='asc'>Asc</option>
                        <option value='desc'>Desc</option>
                        <option value='username'>Username</option>
                        <option value='firstName'>First Name</option>
                        <option value='lastName'>Last Name</option>
                    </select>
                </label>
            </div>
            <div className='overflow-auto w-full'>
                {loading ? (
                    <div className='flex items-center justify-center min-h-[70vh]'>
                        <h2 className='text-2xl font-semibold'>
                            Fetching data...
                        </h2>
                    </div>
                ) : !loading && data?.length === 0 ? (
                    <div className='flex items-center justify-center min-h-[70vh]'>
                        <h2 className='text-2xl font-semibold'>
                            Users not found!
                        </h2>
                    </div>
                ) : (
                    <Table
                        data={data}
                        columns={TableColumns}
                        actions={{ delete: true, edit: true }}
                        deleteFunc={handleDelete}
                    />
                )}
            </div>
        </>
    );
};

export default Users;
