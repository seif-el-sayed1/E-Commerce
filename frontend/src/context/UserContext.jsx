import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    axios.defaults.withCredentials = true   
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [loading, setLoading] = useState(true);

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false)
    
    const authState = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/auth/is-auth")
            if(data.success) {
                setIsLoggedin(true)
                getUserData()
            } else {
                setUserData(false)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    const getUserData = async () => {
        const {data} = await axios.get(backendUrl + "/api/auth/getUser")
        if(data.success) {
            setIsLoggedin(true)
            setUserData(data.userData)
            setIsAdmin(data.userData.role == "admin");
        } else {
            toast.error(data.message) 
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/logout");
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
                setUserData(null);
                setIsLoggedin(false);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };
    
    const sentVerifyOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
                navigate('/verifyEmail');
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        setLoading,
        isLoggedin, 
        setIsLoggedin,
        userData, 
        setUserData,
        getUserData,
        authState,
        isAdmin,
        setIsAdmin,
        logout,
        sentVerifyOtp
    };

    useEffect(() => {
        authState()
    },[])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};