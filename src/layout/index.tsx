import type React from "react";
import Header from "../components/header/header";

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <main className='min-h-screen flex bg-neutral-950'>
            <div className='flex flex-col w-full'>
                <Header />
                <div className='p-5'>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
