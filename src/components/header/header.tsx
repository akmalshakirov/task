import SidebarMobile from "../sidebar/sidebarMobile";

const Header = () => {
    return (
        <header className='w-full bg-primary p-5 flex items-center justify-between'>
            Task example
            <SidebarMobile />
        </header>
    );
};

export default Header;
