"use client"

import AddUserComponent from "@component/add-user";
import ListUserComponent from "@component/list-user";
import User from "@model/user";
import { useEffect, useState } from "react";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    // Cargar usuarios al montar
    useEffect(() => {
        setUsers([]);
    }, []);

    // Función para agregar usuario y refrescar la lista
    const handleUserAdded = (user: User) => {
        setUsers(prev => [...prev, user]);
    };

    return (
        <div className="ms-3">
            <h1 className="text-white">User Details</h1>
            <AddUserComponent onUserAdded={handleUserAdded} />
            <ListUserComponent users={users} />
        </div>
    )
}