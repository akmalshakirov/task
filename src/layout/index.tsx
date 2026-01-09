import type React from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";

type Props = {
    children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className='min-h-screen flex bg-neutral-950'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Header />
                <div className='p-5'>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
