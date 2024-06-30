import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AddHabitForm (){
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [date , setDate] = useState(new Date());
    const [redirect , setRedirect] = useState(false)


    async function saveHabit(e) {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/habit' , {
            title,
            description,
            date,
        })
        if(res){
            setRedirect(true)
        }else{
            console.log("Error")
        }

    }
    if(redirect){
        return <Navigate to="/dashboard" />
    }
    return(
        <div>
            <form onSubmit={saveHabit} className="m-4">
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500">Title for your Habit, should be short and catchy</p>
                <input
                    className="w-full border my-1 py-2 px-3 rounded-md"
                    type='text'
                    placeholder="Title, for example: My Habit"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500">Descrition for your Habit</p>
                <textarea
                    className="w-full border my-1 py-2 px-3 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Date</h2>
                <p className="text-gray-500">Date of new Beginnings</p>
                <input
                    className="mb-2"
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
               <div className="flex items-center justify-center mb-4">
                    <button className="bg-purple-400  my-4 p-3 rounded-lg w-1/2 text-2xl">Save</button>
               </div>

                <h1 className="text-5xl text-center text-purple-300">All the Best... Have a nice day!!</h1>
            </form>
        </div>
    )
}
export default AddHabitForm;