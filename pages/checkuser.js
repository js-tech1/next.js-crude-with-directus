import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Checkuser() {
    const [AdminUsers, setUsers] = useState([]);
    const [Users, setAUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer rQ6lIiyR1r4DJ2AOCXmcGyIeWbyK98-m',
            };

            try {
                const response = await axios.get('http://localhost:8055/users', {
                    headers,
                });
                const data = response.data;
                console.log();
                const adminUsers = data.data.filter(
                    (user) => user.role === '87a27cff-79c1-4e89-8319-4c5cfbbbe1e5'
                );
                const regularUsers = data.data.filter(
                    (user) => user.role === '20135088-9892-4bf2-b97b-cbf7fdfcb12f'
                );
                console.log(adminUsers, regularUsers);
                setUsers(adminUsers);
                setAUsers(regularUsers)
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <h1>Admin Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {AdminUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>normal Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}



// return (
//     <>
//         <h1>Admin Users</h1>
//         {adminUsers.length > 0 ? (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {adminUsers.map((user) => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.password}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         ) : (
//             <p>No admin users found</p>
//         )}

//         <h1>Regular Users</h1>
//         {regularUsers.length > 0 ? (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {regularUsers.map((user) => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.password}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         ) : (
//             <p>No regular users found</p>
//         )}
//     </>
// )



