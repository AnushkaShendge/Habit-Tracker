import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import Header from './Header';
import { UserContext } from '../UserContext';
import { PiEmptyBold } from "react-icons/pi";
import axios from 'axios';
import PieChart from './PieChart';

const HomePage = () => {
   const { theme } = useContext(ThemeContext);
   const {user} = useContext(UserContext);
   const [currentDate, setCurrentDate] = useState(new Date());
   const [completedHabits, setCompletedHabits] = useState([]);
   const [habits, setHabits] = useState([]);
   const [quote, setQuote] = useState('');

   const quotes = [
     "“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill",
     "“It is better to fail in originality than to succeed in imitation.” —Herman Melville",
     "“The road to success and the road to failure are almost exactly the same.” —Colin R. Davis",
     "“Success usually comes to those who are too busy to be looking for it.” —Henry David Thoreau",
     "“I never dreamed about success. I worked for it.” —Estée Lauder",
     "“Success is getting what you want; happiness is wanting what you get.” —W. P. Kinsella"
   ];

   useEffect(() => {
        fetchHabits(currentDate);
        fetchQuote();
   }, []);

   const fetchQuote = () => {
      const storedQuote = localStorage.getItem('dailyQuote');
      const storedDate = localStorage.getItem('quoteDate');
      const today = new Date().toISOString().split('T')[0];

      if (storedQuote && storedDate === today) {
         setQuote(storedQuote);
      } else {
         const newQuote = getRandomQuote();
         localStorage.setItem('dailyQuote', newQuote);
         localStorage.setItem('quoteDate', today);
         setQuote(newQuote);
      }
   };

   async function fetchHabits(currentDate) {
        const formattedDate = formatDate(currentDate);
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

    const habitData = habits.length;
    const compHabitData = completedHabits.length;
    const val1 = compHabitData === 0 ? 0 : (compHabitData / (habitData + compHabitData)) * 100;
    const val2 = habitData === 0 ? 0 : (habitData / (habitData + compHabitData)) * 100;
    const taskData = [val1, val2];

    function getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    }

  return (
    <>
      <Header />
      <div className={`mt-[90px] rounded-lg p-6 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-black'}`}>
        <div className="container mx-auto">
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>Welcome Back, {!!user && (
            <span className="text-gray-500 text-2xl ">{user.username}!</span>
          )}</h1>
          <p className={`mb-6 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>Here’s a quick overview of your day and recent activity.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
              {habits.length > 0 ? (
                    habits.map(habit => (
                        <Habit key={habit._id.toString()} habit={habit}  />
                    ))
                    ) : (
                    <p className="font-bold border rounded-xl p-4 bg-indigo-300 flex items-center justify-center"><PiEmptyBold className="text-xl mr-2" />Nothing scheduled for this day</p>
                )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
              {completedHabits.length > 0 ? (
                    completedHabits.map(habit => (
                        <CompletedHabit key={habit._id.toString()} habit={habit} />
                    ))
                    ) : (
                        <p className="font-serif text-xl text-center">Habit stacking is like a superpower! Don't let it go to waste!</p>
                )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">User Progress</h2>
              <PieChart data={taskData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Tips and Suggestions</h2>
            <p>{quote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

const Habit = ({ habit }) => (
    <div className="bg-indigo-400 p-4 m-3 rounded-lg shadow-md flex flex-col justify-between transition-all duration-500 hover:scale-110">
        <h3 className="text-lg font-semibold text-center">{habit.title}</h3>
    </div>
);

const CompletedHabit = ({ habit }) => (
    <div className="bg-gray-200 p-4 m-3 rounded-lg shadow-md flex flex-col justify-between transition-all duration-500 hover:scale-110">
        <h3 className="text-lg font-semibold text-center">{habit.title}</h3>
    </div>
);
