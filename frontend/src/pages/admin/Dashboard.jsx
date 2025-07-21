import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { ProductsContext } from '../../context/ProductsContext';

export const Dashboard = () => {
    const { allUsers, getAllUsers } = useContext(UserContext);
    const { getAllProducts, allProducts } = useContext(ProductsContext);

    useEffect(() => {
        getAllUsers();
        getAllProducts();
    }, []);
    
    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold text-[#1E88E5]">Dashboard</h1>
            <div className='bg-[#263238] w-full rounded border-1 border-[#1E88E5] mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                <div className='flex items-center gap-3 bg-[#121212] border-1 border-[#1E88E5] p-5 my-5 mx-2 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    <div>
                        <h2 className='text-lg font-semibold text-[#1E88E5]'>Total Users :</h2>
                        <p className="text-lg text-center font-bold">{allUsers.totalUsers || 0}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 bg-[#121212] border-1 border-[#1E88E5] p-5 my-5 mx-2 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    <div>
                        <h2 className='text-lg font-semibold text-[#1E88E5]'>Total products :</h2>
                        <p className="text-lg text-center font-bold">{allProducts.totalProducts || 0}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
