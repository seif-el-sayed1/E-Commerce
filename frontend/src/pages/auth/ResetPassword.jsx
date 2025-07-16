import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [isOtp, setIsOtp] = useState(false);
    const inputsRef = useRef([]);

    const { loading, setLoading } = useContext(UserContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.withCredentials = true;

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").trim();
        const chars = paste.slice(0, 6).split("");
        chars.forEach((char, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = char;
            }
        });
        const nextEmpty = chars.length < 6 ? chars.length : 5;
        inputsRef.current[nextEmpty]?.focus();
    };

    const submitEmail = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
                setIsEmail(true);
            } 
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const submitOtp = (e) => {
        e.preventDefault();
        const otpArray = inputsRef.current.map((input) => input.value);
        const fullOtp = otpArray.join("");
        setOtp(fullOtp);
        setIsOtp(true);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
                email,
                otp,
                newPassword,
            });
            if (data.success) {
                toast.success(data.message);
                navigate("/auth");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {!isEmail && (
                    <form
                        onSubmit={submitEmail}
                        className="bg-[#263238] border border-[#1E88E5]/30 rounded-xl p-6 shadow-lg text-white"
                    >
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Enter Your Email
                        </label>
                        <div className="flex bg-[#37474F] border border-[#1E88E5]/40 rounded overflow-hidden">
                            <input
                                id="email"
                                name="email"
                                autoComplete="off"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter Your Email"
                                className="bg-transparent text-white w-full px-3 py-2 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-[#1E88E5] px-5 text-white font-semibold hover:bg-[#1565C0] transition"
                                aria-label="Submit Email"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                )}

                {isEmail && !isOtp && (
                    <form
                        onSubmit={submitOtp}
                        className="bg-[#263238] border border-[#1E88E5]/30 rounded-xl p-6 shadow-lg text-white mt-4"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
                        <p className="text-sm mb-4 text-center">
                            We've sent a 6-digit code to <strong>{email}</strong>
                        </p>
                        <div className="flex justify-between gap-2 mb-6">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    id={i + 1}
                                    name={i + 1}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="1"
                                    required
                                    onChange={(e) => handleInputChange(e, i)}
                                    onPaste={handlePaste}
                                    className="w-10 h-12 rounded text-center text-lg text-white bg-[#37474F] border border-[#1E88E5]/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    aria-label={`Digit ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#1E88E5] text-white font-semibold rounded hover:bg-[#1565C0] transition active:scale-95"
                        >
                            Submit OTP
                        </button>
                    </form>
                )}

                {isEmail && isOtp && (
                    <form
                        onSubmit={resetPassword}
                        className="bg-[#263238] border border-[#1E88E5]/30 rounded-xl p-6 shadow-lg text-white mt-4"
                    >
                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Enter Your New Password"
                            className="w-full px-3 py-2 bg-[#37474F] border border-[#1E88E5]/40 text-white rounded outline-none mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#1E88E5] text-white font-semibold rounded hover:bg-[#1565C0] transition active:scale-95"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
            {loading && (
                <div className=" bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full ">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
