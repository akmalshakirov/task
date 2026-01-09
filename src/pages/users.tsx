import axios from "axios";
import { useEffect, useState } from "react";
import type { UserType } from "../types/userType";

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

    return (
        <div>
            {data?.map((u) => (
                <div key={u.id}>
                    <p>{u.firstName}</p>
                </div>
            ))}
        </div>
    );
};

export default Users;
