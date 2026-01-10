export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    username: string;
    role: string;
    [key: string]: string | number;
};

export type TableColumns = {
    key: string;
    header: string;
};

export type TableActions = {
    delete?: boolean;
    edit?: boolean;
    info?: boolean;
};
