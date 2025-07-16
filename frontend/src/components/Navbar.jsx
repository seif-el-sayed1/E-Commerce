import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'

export const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [menu, setMenu] = useState(false);

    const { userData, isLoggedin, logout, sentVerifyOtp } = useContext(UserContext)

    return (
        <nav className="flex items-center justify-between flex-wrap px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-blue-900 bg-[#0D1117] text-white relative transition-all">

            <Link to="/">
                <h1 className="text-2xl md:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#1E88E5] to-[#90CAF9]">
                    Tech Zone
                </h1>
            </Link>

            {/* Desktop Links */}
            <div className='hidden sm:flex gap-5 text-sm font-medium'>
                <Link to="/" className="hover:text-[#64B5F6] transition">Home</Link>
                <Link to="/products" className="hover:text-[#64B5F6] transition">Products</Link>
                <Link to="#" className="hover:text-[#64B5F6] transition">About</Link>
                <Link to="#" className="hover:text-[#64B5F6] transition">Contact</Link>
            </div>

            <div className='hidden sm:flex items-center gap-8'>
                {/* Cart */}
                <div className="relative cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#64B5F6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute -top-2 -right-3 text-xs text-white bg-[#1E88E5] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        3
                    </span>
                </div>

                {isLoggedin ? (
                    <>
                        <button onClick={() => setMenu(!menu)} aria-label="User menu">
                            <img className="w-10 h-10 rounded-full cursor-pointer" src={userData.image || assets.avatar} alt="User Avatar" />
                        </button>
                        {menu && (
                            <div className="absolute top-16 right-6 w-52 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-300 z-50">
                                <p className="text-sm font-bold text-gray-500 border-b px-4 py-2">{userData.email}</p>

                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                                    <img className="w-4 invert" src={assets.userIcon} alt="Edit Profile" />
                                    Edit Profile
                                </button>

                                {!userData.isVerified && (
                                    <button onClick={sentVerifyOtp} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                                        <img className="w-4" src={assets.verify} alt="Verify Email" />
                                        Verify Email
                                    </button>
                                )}

                                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-100 flex items-center gap-2">
                                    <img className="w-4" src={assets.logOut} alt="Logout" />
                                    <span className="font-bold text-red-500 hover:text-red-700">Logout</span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to="/login">
                        <button className="px-6 py-2 bg-[#1E88E5] hover:bg-[#1565C0] transition rounded-full text-white text-sm">
                            Login
                        </button>
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden cursor-pointer">
                <svg width="24" height="18" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#F5F5F5" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#F5F5F5" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#F5F5F5" />
                </svg>
            </button>

            {/* Mobile Drawer */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#0D1117] shadow-md flex-col justify-center items-center gap-6 text-base sm:hidden z-50`}>
                <Link to="/" onClick={() => setOpen(false)} className="text-white hover:text-[#1E88E5] transition text-lg">Home</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="text-white hover:text-[#1E88E5] transition text-lg">Products</Link>
                <Link to="#" onClick={() => setOpen(false)} className="text-white hover:text-[#1E88E5] transition text-lg">About</Link>
                <Link to="#" onClick={() => setOpen(false)} className="text-white hover:text-[#1E88E5] transition text-lg">Contact</Link>
                <Link to="/login" onClick={() => setOpen(false)}>
                    <button className="mt-4 px-8 py-2 bg-[#1E88E5] hover:bg-[#1565C0] transition text-white rounded-full text-base">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}
