import { NavLink } from "react-router-dom";
import { SidebarData } from "../../data";
import SidebarMobile from "../sidebar/sidebarMobile";

const Header = () => {
    return (
        <header className='sticky top-0 left-0 bg-primary p-5 py-2 flex items-center justify-between'>
            <div className='flex items-center gap-5'>
                <h2>Task example</h2>
                <div className='items-center gap-5 hidden md:flex'>
                    {SidebarData.map((s) => (
                        <NavLink
                            key={s.id}
                            to={s.link}
                            className={({ isActive }) =>
                                `flex items-center gap-1 cursor-pointer px-2 py-2 rounded-lg text-white border transition focus:ring-2 focus:ring-blue-500 outline-none ${
                                    isActive
                                        ? "bg-white/20 border-transparent"
                                        : "border-gray-600 hover:bg-white/7"
                                }`
                            }>
                            <span>{s.icon}</span>
                            {s.label}
                        </NavLink>
                    ))}
                </div>
            </div>
            <SidebarMobile />
        </header>
    );
};

export default Header;
