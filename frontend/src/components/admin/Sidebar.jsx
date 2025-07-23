import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const { userData, logout } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className={`  absolute md:relative w-1/2 md:w-[250px]  md:left-0 border-gray-500 bg-[#263238] h-screen ${open ? 'left-0' : '-left-full'} transition-all duration-300`}>
                <div onClick={() => setOpen(!open)} 
                    className='w-fit p-2 rounded cursor-pointer bg-[#263238]  md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 border-1 rounded border-gray-500 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </div>

                <div className='flex flex-col items-center gap-1 py-5 '>
                    <img  className='w-17 h-17 rounded-full cursor-pointer' src={userData.image || assets.avatar} alt={userData.name || "Admin"} />
                    <p className='text-gray-500'>{userData.email}</p>
                    <button onClick={logout} className="mt-2 w-fit px-10 text-center cursor-pointer border-1 border-gray-500 rounded  mx-2 py-1 flex items-center justify-center gap-2">
                        <img className=" w-4" src={assets.logOut} alt="Logout" />
                        <span className=" text-gray-500">Logout</span>
                    </button>
                </div>
                <hr className='text-gray-500 py-2 mx-2' />

                <div>
                    <Link to="/admin" className='flex items-center gap-4  hover:bg-[#1E88E5] p-2 rounded duration-300'>
                        <img className='w-5 invert' src={assets.dashboard} alt="Dashboard" />
                        <p className='text-gray-100'>Dashboard</p>
                    </Link>

                    <Link to="/admin/add-product" className='flex items-center gap-4  hover:bg-[#1E88E5] p-2 rounded duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p className='text-gray-100'>Add Products</p>
                    </Link>

                    <Link to="/admin/list-products" className='flex items-center gap-4  hover:bg-[#1E88E5] p-2 rounded duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
                            <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p className='text-gray-100'>List Products</p>
                    </Link>

                    <Link to="/admin/users" className='flex items-center gap-4  hover:bg-[#1E88E5] p-2 rounded duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>
                        <p className='text-gray-100'>All Users</p>
                    </Link>

                    <Link to="/admin/orders" className=' flex items-center gap-4  hover:bg-[#1E88E5] p-2 rounded duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
                            <path fillRule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p className='text-gray-100'>All Orders</p>
                    </Link>
                </div>
            </div>
            <div onClick={() => setOpen(!open)} 
                className={`h-screen w-fit p-1 cursor-pointer bg-[#263238]  md:hidden ${open ? "hidden" : "block"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 border-1 border-gray-500 p-1 mt-1 rounded">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
            </div>
        </div>
    )
}
