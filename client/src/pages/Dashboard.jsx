import Header from "./Header";
import Sidebar, { SidebarItem } from "./Sidebar";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoStatsChartSharp, IoSettings } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { PiEmptyBold } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

function Dashboard() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [habits, setHabits] = useState([]);
    const [completedHabits, setCompletedHabits] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchHabits(currentDate);
    }, [currentDate]);

    async function fetchHabits(date) {
        const formattedDate = formatDate(date);
        console.log(formattedDate);
        try {
            const res = await axios.get(`http://localhost:4000/habit?date=${formattedDate}`);
            setHabits(res.data.habits);
            setCompletedHabits(res.data.completedHabits);
        } catch (error) {
            console.error(error);
        }
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const completeHabit = (habitId) => {
        axios.post(`http://localhost:4000/habit/${habitId}/complete`)
            .then(() => {
                fetchHabits(currentDate);
            })
            .catch(error => console.error(error));
    };

    function handlePrevDate() {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
    }

    function handleNextDate() {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                    <SidebarItem icon={<FaHome size={20} />} text="Home" to="/dashboard/home" alert />
                    <SidebarItem icon={<MdDashboard size={20} />} text="Dashboard" active />
                    <SidebarItem icon={<IoStatsChartSharp size={20} />} text="Statistics" to="/dashboard/statistics" alert />
                    <SidebarItem icon={<SlCalender size={20} />} text="Calendar" to="/dashboard/calendar" />
                    <SidebarItem icon={<MdOutlineTaskAlt size={20} />} text="Cummunity" to="/dashboard/post" />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettings size={20} />} text="Settings" to="/dashboard/settings" />
                    <SidebarItem icon={<IoMdHelp size={20} />} text="Help" to="/dashboard/help" />
                </Sidebar>
                <div className={`w-full transition-all duration-300 mt-20 ${theme === 'light' ? '' : 'bg-gray-900 text-white'} ${sidebarOpen ? 'ml-[270px]' : 'ml-16'}`}>
                    <header className="border border-lg shadow-sm flex m-10 p-8 rounded-lg items-center gap-6">
                        <h1 className="text-xl font-semibold">{currentDate.toDateString()}</h1>
                        <div className="mr-auto">
                            <button onClick={handlePrevDate}>◀</button>
                            <button onClick={handleNextDate}>▶</button>
                        </div>
                        <Link to={'/dashboard/addHabit'} className="bg-purple-400 flex rounded-xl p-2 mx-10"><CiCirclePlus className="text-lg m-1" />New Habit</Link>
                    </header>
                    <div className="border border-lg shadow-sm flex flex-col m-10 p-8 rounded-lg">
                        <h2 className="text-2xl text-purple-300 font-light text-center mb-8">Habits for {currentDate.toDateString()}</h2>
                        <div className={habits.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "flex justify-center items-center h-full"}>
                            {habits.length > 0 ? (
                                habits.map(habit => (
                                    <Habit key={habit._id.toString()} habit={habit} onComplete={() => completeHabit(habit._id.toString())} />
                                ))
                            ) : (
                                <p className="font-bold border rounded-xl p-4 bg-indigo-300 flex items-center justify-center"><PiEmptyBold className="text-xl mr-2" />Nothing scheduled for this day</p>
                            )}
                        </div>
                    </div>
                    <div className={`border border-lg shadow-sm flex flex-col m-10 p-8 rounded-lg ${theme === 'light' ? '' : 'bg-gray-900 text-white'}`}>
                        <h2 className="text-2xl text-purple-300 font-light text-center mb-4">Habits Completed</h2>
                        <div className={completedHabits.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "flex justify-center items-center h-full"}>
                            {completedHabits.length > 0 ? (
                                completedHabits.map(habit => (
                                    <CompletedHabit key={habit._id.toString()} habit={habit} />
                                ))
                            ) : (
                                <p className="font-serif text-xl text-center">Habit stacking is like a superpower! Don't let it go to waste!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

const CompletedHabit = ({ habit }) => (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col justify-between transition-all duration-500 hover:scale-110">
        <h3 className="text-lg font-semibold text-center">{habit.title}</h3>
        <p className="text-xs font-thin text-center">{habit.description}</p>
    </div>
);

const Habit = ({ habit, onComplete }) => (
    <div className="bg-indigo-400 p-4 rounded-lg shadow-md flex flex-col justify-between transition-all duration-500 hover:scale-110">
        <h3 className="text-lg font-semibold text-center">{habit.title}</h3>
        <p className="text-xs font-thin text-center">{habit.description}</p>
        <button onClick={onComplete} className="bg-lime-500 text-white p-2 rounded mt-2">Complete</button>
    </div>
);
