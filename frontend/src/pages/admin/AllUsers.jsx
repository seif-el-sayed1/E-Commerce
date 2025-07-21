import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

export const AllUsers = () => {
    const { allUsers, getAllUsers, loading } = useContext(UserContext);

    useEffect(() => {
        getAllUsers();
    }, []);

    
    return (
        <div className="m-5 w-full">
            <h1 className="text-3xl font-bold text-[#1E88E5]">All Users</h1>

            <div className="bg-[#263238] rounded border border-[#1E88E5] mt-5 overflow-x-auto">
                <table className="w-full text-white text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1E88E5] text-white">
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.users.map((user) => (
                            <tr key={user._id} className="border-t border-[#455A64] hover:bg-[#37474F] transition">
                                <td className="px-4 py-3">
                                    <img
                                        className="w-16 h-16 object-contain rounded"
                                        src={user.image}
                                        alt={user.name}
                                    />
                                </td>
                                <td className="px-4 py-3">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`${user.role === "admin" ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-lg text-white}`}>{user.role}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div className=" bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full ">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
