import { useState } from 'react';
import loginImg from '../assets/Habit-Tracker.jpg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'

function Register() {
    const [username , setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [redirect , setRedirect] = useState(false)

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function handleSubmit (e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/register' , {username , email , password})
        if(response.data) {
            setRedirect(true)
        }
    }
    if(redirect){
        return <Navigate to='/dashboard' />
    }
 
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Habit Tracker 👋</h1>
                <span className="text-gray-600 text-md mb-8 text-center">Please Rgister with your details here</span>
                <form className="max-w-md w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={handlePasswordVisibility}
                        >
                            {showPassword ? <BsEyeSlash className="text-gray-500 mt-8" /> : <BsEye className="text-gray-500 mt-8" />}
                        </span>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                            Register
                        </button>
                    </div>
                    <div className="text-gray-600 mt-4 text-center">
                        Already have an account?{' '}
                        <Link to="/" className="text-blue-500 hover:underline">
                            Login Now
                        </Link>
                    </div>
                </form>
            </div>
            <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                <img src={loginImg} alt="Login" className="object-fit w-full h-full rounded-l-2xl" />
            </div>
        </div>
    );
}

export default Register;
