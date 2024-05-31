import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        axios.get('http://localhost:2222/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setDataProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
                navigate('/login');
            });
    }, []);

    const navigate = useNavigate();
    function handleLogout() {
        axios.get('http://localhost:2222/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Navbar />
            <div className="bg-white min-h-screen">
                <div className="py-20"></div>
                <div className="block m-auto mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-6 pt-6">
                        <img src="../public/user.jpg" className="w-32 h-32 rounded-full mb-4" alt="Profile Picture" />
                        <h5 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{dataProfile.username}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                        <div className="flex mt-6 space-x-4">
                            <Link to={'/dashboard'} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition ease-in-out duration-150">Dashboard</Link>
                            <button onClick={handleLogout} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition ease-in-out duration-150">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
