import type React from "react";
import Header from "../components/header/header";

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <main className='min-h-screen bg-neutral-950'>
            <div className='relative'>
                <Header />
                <div>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
