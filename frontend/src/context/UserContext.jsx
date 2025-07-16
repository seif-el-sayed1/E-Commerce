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

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    

    const login = async (e) => {
            setLoading(true);
            e.preventDefault();
            axios.defaults.withCredentials = true;
            try {
                if (state === "signUp") {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("image", image);
    
                    const { data } = await axios.post(backendUrl + "/api/auth/register", formData);
                    if (data.success) {
                        setIsLoggedin(true);
                        getUserData();
                        navigate("/");
                        setImage(null);
                    } 
                } else {
                    const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
                    if (data.success) {
                        setIsLoggedin(true);
                        getUserData();
                        navigate("/");
                    }
                }
            } catch (error) {
                const message = error.response?.data?.message || error.message || "Something went wrong";
                toast.error(message, { position: "top-center" });
            } finally {
                setLoading(false);
            }
    };
    
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
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }
    
    const getUserData = async () => {
        const {data} = await axios.get(backendUrl + "/api/auth/get-user")
        if(data.success) {
            setIsLoggedin(true)
            setUserData(data.userData)
            setIsAdmin(data.userData.role == "admin");
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/logout");
            if (data.success) {
                setUserData(null);
                setIsLoggedin(false);
                navigate("/");
            }
            location.reload();
        } catch (error) {
                const message = error.response?.data?.message || error.message || "Something went wrong";
                toast.error(message, { position: "top-center" });   
        } finally {
            setLoading(false);
        }
    };
    
    const sentVerifyOtp = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
                navigate('auth/verify-email');
            } 
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const value = {
        login,
        state,
        name,
        email,
        password,
        image,
        setState,
        setName,
        setEmail,
        setPassword,
        setImage,
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