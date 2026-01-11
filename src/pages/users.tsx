import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/table";
import { TableColumns } from "../data/sidebarData";
import type { UserType } from "../types/userType";

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserType[] | null>(null);
    // const [deletingUser, setDeletingUser] = useState<UserType | null>(null);

    const getUsers = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("https://dummyjson.com/users");

            setData(data.users);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (item: UserType) => {
        try {
            confirm(
                `Do you really want to delete this user ${item.firstName}?`
            );
        } catch (error) {}
    };

    if (loading) {
        return <>Fetching data...</>;
    }

    return (
        <div className='overflow-auto w-full'>
            <Table
                data={data}
                columns={TableColumns}
                actions={{ delete: true }}
                deleteFunc={deleteUser}
            />
        </div>
    );
};

export default Users;
