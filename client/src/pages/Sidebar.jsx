import { createContext, useContext, useState } from "react";
import { LuListTodo, LuChevronFirst , LuChevronLast} from "react-icons/lu";
import { UserContext } from "../UserContext";
import { AiOutlineMore } from "react-icons/ai";

const SidebarContext = createContext();

function Sidebar({children}) {
    const { user } = useContext(UserContext);
    const [expanded , setExpanded] = useState(true)
    return(
       <>
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-purple-200 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <div className={`flex items-center overflow-hidden transition-all ${expanded ? "" : "w-0"}`}>
                        <LuListTodo className="text-3xl" />
                        <h1 className="font-bold text-purple-400 ml-2 text-2xl">Habit</h1>
                        <span className="text-2xl mr-3">Tracker</span>
                    </div>
                    <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <LuChevronFirst /> : <LuChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{expanded}} >
                    <ul className="flex-grow px-3">
                        {children}
                    </ul>
                </SidebarContext.Provider>
                <div className="border-t flex p-3">
                    <div className={`flex justify-between items-center overflow-hidden w-52 ml-3 transition-all ${expanded ? "" : "w-0"}`}>
                        <div className="leading-4">
                            {!!user && (
                                <>
                                    <span className="font-semibold">{user.username}</span>
                                    <span className="text-xs text-gray-600 block">{user.email}</span>
                                </>
                            )}
                        </div>
                        <div>
                            <AiOutlineMore className="text-2xl" />
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
       </>
    )
}
export default Sidebar;

export function SidebarItem({icon , text , active , alert}){
    const { expanded } = useContext(SidebarContext);
    return(
        <li className={`relative flex items-center py-2 px-3 my-1 font-md rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr-from-indigo-200 to-indigo-100 text-indigo-900" : "hover:bg-indigo-50 text-gray-600"}`} >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}
