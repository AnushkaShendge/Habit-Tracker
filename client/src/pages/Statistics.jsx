import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Header from "./Header";

function Statistics() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        fetchChartData();
    }, []);

    async function fetchChartData() {
        try {
            const res = await axios.get('http://localhost:4000/stats');
            const { dates, scheduledHabits, completedHabits } = res.data;

            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: "Scheduled Habits",
                        data: scheduledHabits,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                    {
                        label: "Completed Habits",
                        data: completedHabits,
                        backgroundColor: "rgba(153, 102, 255, 0.6)",
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="">
            <Header />
            <h2 className="text-3xl font-extrabold text-center m-4 mt-28 ">Habit Statistics</h2>
            <Bar data={chartData} className="h-screen w-full m-5" />
        </div>
    );
}

export default Statistics;
