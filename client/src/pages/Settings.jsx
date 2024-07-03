import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserContext } from '../UserContext';
import Header from './Header';
import axios from 'axios';

const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/update-profile', { username, email }, { withCredentials: true });
            setUser(res.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/change-password', { oldPassword, newPassword }, { withCredentials: true });
            alert(res.data.message);
        } catch (error) {
            console.error(error);
            alert('Error changing password');
        }
    };

    return (
        <>
            <Header />
            <div className={`mt-[90px] p-6 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-black'}`}>
                <div className="container mx-auto">
                    <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>Settings</h1>
                    <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Profile</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update Profile</button>
                    </form>

                    <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Old Password</label>
                            <input 
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Change Password</button>
                    </form>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Theme</h2>
                        <button
                            onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
