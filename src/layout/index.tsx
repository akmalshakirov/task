import type React from "react";
import Header from "../components/header/header";

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <main className='min-h-screen bg-neutral-950'>
            <Header />
            {children}
        </main>
    );
};

export default Layout;
