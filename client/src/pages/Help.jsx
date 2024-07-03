import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';
import Header from './Header';

const Help = () => {
    const { theme } = useContext(ThemeContext);
    const [helpContent, setHelpContent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/help').then((response) => {
            setHelpContent(response.data);
        })
    }, []);

    if (!helpContent) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <div className={`mt-[90px] rounded-lg p-6 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Help & Documentation</h1>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Overview</h2>
                        <p>{helpContent.overview}</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Features</h2>
                        <h3 className="text-lg font-semibold mb-1">User Authentication</h3>
                        <ul className="list-disc ml-6">
                            {helpContent.features.userAuthentication.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-semibold mb-1">Habit Management</h3>
                        <ul className="list-disc ml-6">
                            {helpContent.features.habitManagement.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-semibold mb-1">User Posts</h3>
                        <ul className="list-disc ml-6">
                            {helpContent.features.userPosts.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-semibold mb-1">Settings Page</h3>
                        <ul className="list-disc ml-6">
                            {helpContent.features.settingsPage.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Further Queries</h2>
                        <p>{helpContent.furtherQueries}</p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Help;
