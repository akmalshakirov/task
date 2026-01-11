import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../data";
import styles from "./sidebar.module.css";

const SidebarMobile = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className='md:hidden'>
            <button
                aria-label={visible ? "Close popup" : "Open popup"}
                title={visible ? "Close popup" : "Open popup"}
                // @ts-ignore
                key={visible}
                className={`bg-gray-200 p-2 rounded-full outline-none focus:bg-gray-300 ${styles.rotateAnim}`}
                onClick={() => setVisible(!visible)}>
                {visible ? <X size={18} /> : <Menu size={18} />}
            </button>

            <nav
                className={`absolute bg-neutral-700/60 backdrop-blur-sm flex flex-col items-center justify-center w-full -bottom-34 left-0 py-3 transition ${
                    visible
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none -translate-y-4"
                }`}>
                {SidebarData.map((s) => (
                    <NavLink
                        onClick={() => setVisible(false)}
                        key={s.id}
                        to={s.link}
                        className={({ isActive }) =>
                            `flex w-[70%] items-center p-5 gap-1 my-2 px-2 py-2 rounded-lg text-white ${
                                isActive ? "bg-white/20" : "bg-white/7"
                            }`
                        }>
                        <span>{s.icon}</span>
                        {s.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default SidebarMobile;
