import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const UserRoutes = () => {
    const { userData, loading } = useContext(UserContext); 

    if (!loading && userData && userData.role === "user") {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }

}
