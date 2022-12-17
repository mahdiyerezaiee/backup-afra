import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [userEdit, setUserEdit] = useState({ user: {}, isEdit: true });

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData= async ()=> {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );
        setUsers(data);

    }
    const deleteUsers = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        setUsers(users.filter((user) => user.id !== id));
    };
    const editUsers = (user) => {
        setUserEdit({ user, isEdit: true });
    };
    const updateUser = async (id, user) => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
        const data = response.data;
       

        setUsers(
            users.map((user) => (user.id === id ? { ...user, ...data } : user))
        );

    };
    return (
        <APIContext.Provider
            value={{
                users,
                userEdit,
                deleteUsers,
                editUsers,
                updateUser,
            }}
        >
            {children}
        </APIContext.Provider>
    );
}

export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
