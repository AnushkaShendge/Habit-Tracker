import { createContext, useContext, useState , useEffect } from "react";
import { LuListTodo, LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { UserContext } from "../UserContext";
import { AiOutlineMore } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

const SidebarContext = createContext();

function Sidebar({ children, isOpen, toggleSidebar }) {
    const { user } = useContext(UserContext);
    const [expanded, setExpanded] = useState(isOpen);
    const [isDropdownOpen , setIsDropdownOpen ] = useState(false)
    const [toLogin , setToLogin] = useState(false)

    useEffect(() => {
        setExpanded(isOpen);
    }, [isOpen]);

    async function handleLogout() {
        await axios.post('http://localhost:4000/logout')
        setToLogin(true);
    }
    if (toLogin){
        return <Navigate to="/" />
    }

    return (
        <>
            <aside className="fixed" style={{ top: "88px", height: "84.2%" }}>
                <nav className="h-full flex flex-col bg-purple-200 border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <div className={`flex items-center overflow-hidden transition-all ${expanded ? "" : "w-0"}`}>
                            <LuListTodo className="text-3xl" />
                            <h1 className="font-bold text-purple-400 ml-2 text-2xl">Habit</h1>
                            <span className="text-2xl mr-3">Tracker</span>
                        </div>
                        <button onClick={toggleSidebar} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
                        </button>
                    </div>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-grow px-3">
                            {children}
                        </ul>
                    </SidebarContext.Provider>
                    {isDropdownOpen && (
                        <div className="absolute top-[-40px] right-0 bg-violet-100 rounded-lg shadow-lg p-2 my-[405px] w-full">
                            <button className="rounded-lg shadow-lg p-2 w-full text-sm" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    <div className="border-t flex p-3">
                        <FaUserCircle size={26} className="" />
                        <div className={`flex justify-between items-center overflow-hidden ml-3 transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="leading-4">
                                {!!user && (
                                    <>
                                        <span className="font-semibold">{user.username}</span>
                                        <span className="text-xs text-gray-600 block">{user.email}</span>
                                    </>
                                )}
                            </div>
                            <div className="relative flex flex-col items-center ">
                                <button className="cursor-pointer">
                                    <AiOutlineMore className="text-2xl duration-300 active:text-white" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <Link to={to} className={`relative flex items-center py-2 px-3 my-1 font-md rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr-from-indigo-200 to-indigo-100 text-indigo-900" : "hover:bg-indigo-50 text-gray-600"}`} >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </Link>
    );
}
