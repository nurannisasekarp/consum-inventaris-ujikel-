import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [stuffCount, setStuffCount] = useState(0);
    //const [ variable, function]
    //useState untuk mengolah data, useEffect untuk digunakan untuk menjalankan suatu aksi ketika halaman berhasil di render
    const [userCount, setUserCount] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        cekUserRole(); 
        DataCounts();
        setIsLogin(true);
    }, []);

    function cekUserRole() {
        axios.get('http://localhost:2222/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUserRole(res.data.data.role);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    function DataCounts() {
        //axios  melakukan permintaan ke http dari backEnd nya
        axios.all([ //axios all metode yang dapat  menangani permintaan bersamaan
            axios.get('http://localhost:2222/stuffs', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }),
            axios.get('http://localhost:2222/users', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        ])
        .then(axios.spread((stuffResponse, userResponse) => { //axios.spread memisahkan hasil dari kedua permintaan menjadi parameter individual 
            setStuffCount(stuffResponse.data.data.length); //menghitung jumlah stuff
            setUserCount(userResponse.data.data.length); //menghitung jumlah 
            //length  properti untuk mendapatkan jumlah array
            //saat jumlah user sudah diinput
        }))
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    return (
        <>
            <Navbar />
            {isLogin && userRole === "admin" ? ( 
                <div className="flex flex-wrap justify-center m-10">
                    <div className="p-4 w-1/2">
                        <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                                <h1 className="text-white dark:text-white text-lg font-medium">{stuffCount}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 w-1/2">
                        <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                                <h1 className="text-white dark:text-white text-lg font-medium">{userCount}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </>
    );
}
