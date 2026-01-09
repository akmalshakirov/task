import { NavLink } from "react-router-dom";
import { SidebarData } from "../../data/sidebarData";

const Sidebar = () => {
    return (
        <aside className='min-h-screen bg-primary max-w-[25vw] lg:max-w-60 p-5 hidden md:block'>
            <nav className='mt-15'>
                {SidebarData.map((s) => (
                    <NavLink
                        key={s.id}
                        to={s.link}
                        className={({ isActive }) =>
                            `flex items-center gap-1 my-2 cursor-pointer px-2 py-2 rounded-lg text-white ${
                                isActive ? "bg-white/20" : "bg-white/10"
                            }`
                        }>
                        <span>{s.icon}</span>
                        {s.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
