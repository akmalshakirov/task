import { UserRoundPlus, Users } from "lucide-react";

export const SidebarData = [
    {
        id: 1,
        label: "Users",
        link: "/",
        icon: <Users size={18} />,
    },
    {
        id: 2,
        label: "Create user",
        link: "/create",
        icon: <UserRoundPlus size={18} />,
    },
    // {
    //     id: 3,
    //     label: "Edit user",
    //     link: "/edit",
    // },
];
