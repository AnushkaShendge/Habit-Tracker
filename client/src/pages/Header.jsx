import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { IoSettings } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {  Navigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { ThemeContext } from "../ThemeContext";


function Header() {
    const { user } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        
        <div className="shadow-md p-4 flex justify-between items-center bg-purple-100 fixed w-full top-0">
            <div>
                <h1 className="text-2xl font-bold">Hi there, {!!user && (
                    <span className="font-extrabold text-purple-400">{user.username}</span>
                )}
                </h1>
                <h3 className="text-md text-gray-400">Welcome...</h3>
            </div>
            <div className="flex items-center justify-between w-1/2">
                <div className="relative w-full">
                    <IoIosSearch size={24} className="absolute top-0 left-0 mt-2 ml-3 text-gray-400" />
                    <input type="text" placeholder=" Search..." className="border rounded-full pl-10 pr-4 py-2 w-full" />
                </div>
                <div className="ml-4 flex items-center space-x-4 m-4 cursor-pointer">
                    
                    {theme === 'dark' ? (
                        <FaMoon size={24} onClick={toggleTheme}  />
                    ) : (
                        <FiSun size={24} onClick={toggleTheme}  />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
