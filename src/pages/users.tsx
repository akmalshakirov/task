import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import Table from "../components/table";
import { TableColumns } from "../data/sidebarData";
import type { UserType } from "../types/userType";
import toast from "react-hot-toast";

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserType[] | null>(null);
    const [limit, setLimit] = useState<number>(10);
    const [query, setQuery] = useState<string>("");

    const getUsers = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                `https://dummyjson.com/users?limit=${limit}`
            );

            setData(data.users);
        } catch (error) {
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
                    loading: "Deleting user",
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
            </div>
            <div className='overflow-auto w-full'>
                {loading ? (
                    <p className='text-center'>Fetching data...</p>
                ) : !loading && data?.length === 0 ? (
                    <p className='text-center'>Users not found!</p>
                ) : (
                    <Table
                        data={data}
                        columns={TableColumns}
                        actions={{ delete: true }}
                        deleteFunc={handleDelete}
                    />
                )}
            </div>
        </>
    );
};

export default Users;
