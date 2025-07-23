import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const UserRoutes = () => {
    const { userData, loading } = useContext(UserContext); 

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black/50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (userData && userData.role === "user") {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
}

