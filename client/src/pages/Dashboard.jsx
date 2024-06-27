import Header from "./Header";
import Sidebar, { SidebarItem } from "./Sidebar";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoStatsChartSharp , IoSettings  } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";

function Dashboard() {
    return(
        <>
            <Header />
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<FaHome size={20} />} text="Home" alert />
                    <SidebarItem icon={<MdDashboard size={20} />} text="Dashboard" active />
                    <SidebarItem icon={<IoStatsChartSharp size={20} />} text="Statstics" alert />
                    <SidebarItem icon={<SlCalender size={20} />} text="Calender"  />
                    <SidebarItem icon={<MdOutlineTaskAlt size={20} />} text="Tasks"  />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettings size={20} />} text="Settings"  />
                    <SidebarItem icon={<IoMdHelp size={20} />} text="Help"  />
                </Sidebar>
            </div>
        </>
    )
}
export default Dashboard;