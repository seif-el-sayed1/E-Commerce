import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export const VerifyEmail = () => {
    const { isLoggedin, getUserData, userData, loading, setLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const inputsRef = useRef([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const otpArray = inputsRef.current.map((input) => input.value);
            const otp = otpArray.join("");
            const { data } = await axios.post(backendUrl + "/api/auth/verify-email", { otp });

            if (data.success) {
                toast.success(data.message, { position: "top-center" });
                getUserData();
                navigate("/");
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ((userData && userData.isVerified) || !isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, userData, navigate]);

    return (
        <div className="min-h-screen bg-[url('src/assets/signUp.png')] bg-cover bg-center flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-sm bg-gradient-to-b from-white/10 to-white/5 border border-white/20 text-white p-6 md:p-8 rounded-xl shadow-xl"
                aria-label="Verify Email Form"
            >
                <h2 className="text-2xl font-bold mb-2 text-center">Verify Your Email</h2>
                <p className="mb-6 text-sm text-center text-white/80">
                    Enter the 6-digit code we sent to your email
                </p>

                <div className="flex justify-between mb-6 px-2 gap-2">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputsRef.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="1"
                            required
                            onChange={(e) => handleInputChange(e, i)}
                            onPaste={handlePaste}
                            className="w-12 h-14 text-lg text-center rounded-md bg-white/20 border border-white/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition"
                            aria-label={`Digit ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold py-3 rounded-md transition active:scale-95"
                >
                    Verify
                </button>

                <p className="text-xs mt-4 text-center text-white/70">
                    Didn't get the code? Check your spam or try again later.
                </p>
            </form>
            {loading && (
                <div className=" bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full ">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
