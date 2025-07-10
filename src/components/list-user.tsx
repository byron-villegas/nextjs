"use client"

import User from "@model/user";
import "@style/ListUserComponent.css"; // Import local styles

export default function ListUserComponent({ users } : { users: User[] } ) {
    const onRowMouseMove = (e: any) => {
        e.currentTarget.classList.add('hovered');
    };

    const onRowMouseLeave = (e: any) => {
        e.currentTarget.classList.remove('hovered');
    };

    const formatBalance = (value: any) => {
        let numberValue = Number(value) || 0;
        return `$${numberValue.toLocaleString('es-CL')}`;
    }

    return (
        <div>
            <h3 className="text-white">Users</h3>
            <table className="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RUT</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edad</th>
                        <th>Sexo</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="pointer" onMouseMove={onRowMouseMove} onMouseLeave={onRowMouseLeave}>
                            <td>{index + 1}</td>
                            <td>{user.rut}</td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.fechaNacimiento}</td>
                            <td>{user.edad}</td>
                            <td>{user.sexo}</td>
                            <td>{formatBalance(user.saldo)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}