import axios from "axios";
import { useEffect, useState } from "react";
import type { UserType } from "../types/userType";
import Table from "../components/table";
import { TableColumns } from "../data/sidebarData";

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserType[] | null>(null);

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

    if (loading) {
        return <>Loading...</>;
    }

    return <Table data={data} columns={TableColumns} />;
};

export default Users;
