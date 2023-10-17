import { useState, useEffect } from "react";
import style from "../styles/form.module.css";
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh_token: refreshToken }),
                    };
                    fetch('http://localhost:8055/auth/refresh', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem('accessToken', data.data.access_token);
                        })
                        .catch(error => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            router.push('/login');
                        });
                } else {
                    localStorage.removeItem('accessToken');
                    router.push('/login');
                }
            }
        }
    }, []);
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            router.push('/profile');
        }
    }, []);
    const [fname, setFnameValue] = useState('');
    const [lname, setLnameValue] = useState('');
    const [email, setEmailValue] = useState('');
    const [Pass, setPassValue] = useState('');
    const apiUrl = 'http://localhost:8055/users';
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer apikey");

    const handleCreate = async () => {
        const newItem = { first_name: fname, last_name: lname, email: email, password: Pass, role: "20135088-9892-4bf2-b97b-cbf7fdfcb12f" };
        await fetch(apiUrl, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newItem),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Created item:', data);
            });
    };

    const handleFname = (event) => {
        setFnameValue(event.target.value);
    };
    const handleLname = (event) => {
        setLnameValue(event.target.value);
    };
    const handleEmail = (event) => {
        setEmailValue(event.target.value);
    };
    const handlePass = (event) => {
        setPassValue(event.target.value);
    };
    return (
        <div className={style.myfrm}>
            <form method="post">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        onChange={handleFname}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        onChange={handleLname}
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleEmail}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={handlePass}
                                        type="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${style.mybtn} mt-6 flex items-center justify-end gap-x-6`}
                >
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleCreate}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}