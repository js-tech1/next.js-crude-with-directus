import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Route } from 'react-router-dom';


export default function Profile() {
    const [user, setUser] = useState(null);
    const [Fname, setFnameValue] = useState(null);
    const [Lname, setLnameValue] = useState(null);
    const [email, setEmailValue] = useState(null);
    const [isUpdate, setIsupdate] = useState(false);
    
    const router = useRouter();
    let uid = null;


    const handleLogout = async () => {
        localStorage.removeItem('accessToken', null);
        localStorage.removeItem('refreshToken', null);
        window.location.reload();

    }
    let run = 0;
    useEffect(() => {

        const fetchUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);

            if (!accessToken) {
                router.push('/login');
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Authorization", `Bearer ${accessToken}`);

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            try {
                const response = await fetch("http://localhost:8055/users", requestOptions);

                // const user = await response.findOne(accessToken);
                // console.log("this is my data", user);
                const result = await response.json();
                const data = await result.data;
                setUser(await data[0])
                console.log(data[0]);


            } catch (error) {
                router.push('/login');
            }
        };
        fetchUser();
        setIsupdate(false);

    },[isUpdate]);
    console.log(user);

    // if()
    // console.log();

    const handleUpdate = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer apikey`,
        };
        const body = {
            first_name: Fname ?? user.first_name,
            last_name: Lname ?? user.last_name,
            email: email ?? user.email,
        }
        console.log(body);
        let requestOptions = {
            method: 'PATCH',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(body)
        };
        
            const response = await fetch(`http://localhost:8055/users/${user.id}`, requestOptions);
            const result = await response.json();
            const data = await result.data;
            setUser(await data[0])

            setIsupdate(true);
    }
    const handleDelete = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer apikey`,
        };
        let requestOptions = {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow',
        };
        await fetch(`http://localhost:8055/users/${user.id}`, requestOptions);
        
        localStorage.removeItem('accessToken', null);
        localStorage.removeItem('refreshToken', null);
        window.location.reload();


    }


    const handleEmail = (event) => {
        setEmailValue(event.target.value);
    };
    const handleFname = (event) => {
        setFnameValue(event.target.value);
    };
    const handleLname = (event) => {
        setLnameValue(event.target.value);
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {user ? (
                    <>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6"  method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        firstname
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fname"
                                            name="fname"
                                            onChange={handleFname}
                                            type="text"
                                            autoComplete="fname"
                                            defaultValue={user.first_name}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            lastname
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="lname"
                                            type="text"
                                            name="lname"
                                            onChange={handleLname}
                                            defaultValue={user.last_name}
                                            autoComplete="lname"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                email
                                            </label>

                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={user.email}
                                            onChange={handleEmail}
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type='button'
                                        onClick={handleUpdate}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Update
                                    </button>
                                    <br />
                                    <br />

                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                <button
                    onClick={handleLogout}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    logout
                </button>
                <button
                    onClick={handleDelete}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    delete
                </button>
            </div>
        </>
    );

}