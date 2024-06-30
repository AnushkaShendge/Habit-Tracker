import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import Header from './Header';
import { ThemeContext } from '../ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResponsiveDateTimePickers() {
  const { theme } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const checkReminders = () => {
      const now = dayjs();
      reminders.forEach((reminder) => {
        const reminderTime = dayjs(reminder.date);
        
        // Notify one hour before the reminder
        if (now.isAfter(reminderTime.subtract(1, 'hour')) && now.isBefore(reminderTime)) {
          toast.info(`Upcoming Reminder: ${reminder.message}`, {
            autoClose: 5000,
            position: 'top-right',
          });
        }

        // Notify at the time of the reminder
        if (now.isSame(reminderTime, 'minute')) {
          toast.warning(`Reminder Due: ${reminder.message}`, {
            autoClose: 5000,
            position: 'top-right',
          });
        }

        // Notify after the reminder deadline
        if (now.isAfter(reminderTime) && now.isBefore(reminderTime.add(1, 'hour'))) {
          toast.success(`Reminder Passed: ${reminder.message}`, {
            autoClose: 5000,
            position: 'top-right',
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const reminderMessage = prompt('Enter reminder message:');
    if (reminderMessage) {
      const reminder = {
        date: date.toISOString(),
        message: reminderMessage,
      };
      setReminders([...reminders, reminder]);
    }
  };

  return (
    <>
      <Header />
      <div className={`mt-[90px] ${theme === 'light' ? '' : 'bg-gray-900 text-white'}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <DemoContainer components={['StaticDateTimePicker']}>
              <DemoItem label="Static variant" className="mb-6">
                <StaticDateTimePicker
                  defaultValue={dayjs('2024-06-30T15:30')}
                  onChange={handleDateChange}
                  className=""
                />
              </DemoItem>
            </DemoContainer>
          </div>
        </LocalizationProvider>
      </div>
      <ToastContainer />
    </>
  );
}
