import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user , setUser] = useState('');
    const [ready , setReady] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:4000/user')
        .then(({ data }) => {
            setUser(data);
            setReady(true)
        })
        .catch(err => {
            console.error("Error fetching profile:", err);
        });

    } , [user])
    return(
        <UserContext.Provider value={{ user, setUser , ready}}>
            {children}
        </UserContext.Provider>
    )
}