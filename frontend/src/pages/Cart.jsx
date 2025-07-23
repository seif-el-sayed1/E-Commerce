import { useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { PopularProducts } from "../components/PopularProducts";
import { OrderContext } from "../context/OrderContext";

export const Cart = () => {
    const { cart, getCart, loading, 
        deleteFromCart, increaseQuantity, decreaseQuantity, deleteCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { submitOrder } = useContext(OrderContext);

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        getCart();
    }, []);

    if (loading) {
        return (
            <>
            <div className="flex items-center justify-center min-h-screen bg-black/50 ">
                <div className="relative top-0 left-0 w-full h-full  flex items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
            </>
        );
    }
    return (
        <>
            <div className="relative">
                <div className="bg-[#1a1a1a] min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 py-10 text-white">
                    <h2 className="text-3xl font-bold mb-8 text-[#1E88E5]">🛒 Your Cart</h2>

                    {!cart?.products || cart.products.length === 0 ? (
                        <p className="text-gray-400 text-lg text-center">Your cart is empty.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {/* Order Summary */}
                            <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md w-full h-fit border border-[#333]">
                                <h2 className="text-xl font-bold mb-4 text-[#1E88E5]">Order Summary</h2>

                                <div className="flex justify-between mb-3 text-gray-300">
                                    <p>Total Price:</p>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-3 text-gray-300">
                                    <p>Delivery Tax:</p>
                                    <span>${(cart.total * 0.03).toFixed(2)}</span>
                                </div>
                                <hr className="my-3 border-gray-600" />
                                <div className="flex justify-between text-white font-semibold text-lg">
                                    <p>Total:</p>
                                    <span>${(cart.total + cart.total * 0.03).toFixed(2)}</span>
                                </div>
                                <hr className="my-3 border-gray-600" />

                                <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                                    <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                        <input
                                            className="outline-none w-full bg-transparent text-white"
                                            type="number"
                                            placeholder="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                        <input
                                            className="outline-none w-full bg-transparent text-white"
                                            type="text"
                                            placeholder="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />  
                                    </div>
                                </div>

                                <button
                                    onClick={() => {submitOrder(address, phone); navigate("/my-orders")}}
                                    className="cursor-pointer mt-6 w-full bg-[#1E88E5] hover:bg-[#1565c0] transition text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    Make Order Now
                                </button>
                            </div>
                            {/* Clear Cart */}
                            <div className="flex justify-center w-40">
                                <button onClick={deleteCart}
                                    className="cursor-pointer duration-200 w-full bg-[#E53935] hover:bg-[#D32F2F] transition text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    Clear Cart
                                </button>
                            </div>

                            {/* Products List */}
                            <div className="flex-1">
                                {cart.products.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#2a2a2a] rounded-xl p-6 mb-6 shadow-md border border-[#333]"
                                    >
                                        <div className="w-full md:w-[120px]">
                                            <img
                                                className="w-full h-[100px] object-contain rounded"
                                                src={item.productDetails.image}
                                                alt={item.productDetails.title}
                                            />
                                        </div>

                                        <div className="flex-1 w-full md:w-auto">
                                            <h3 className="text-lg font-bold mb-2 text-[#1E88E5]">{item.productDetails.title}</h3>
                                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                                                {item.productDetails.description}
                                            </p>

                                            <button onClick={() => deleteFromCart(item.productDetails._id)}
                                                className="cursor-pointer flex items-center text-sm text-red-500 hover:underline gap-1 mt-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 bg-[#3a3a3a] px-3 py-2 rounded-md shadow-sm">
                                            <button onClick={() => decreaseQuantity(item.productDetails._id)} 
                                                className="cursor-pointer text-[#1E88E5] hover:text-white transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                </svg>
                                            </button>

                                            <span className="font-medium">{item.quantity}</span>

                                            <button onClick={() => increaseQuantity(item.productDetails._id)} 
                                                className="cursor-pointer text-[#1E88E5] hover:text-white transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div>
                                            <p className="text-xl font-semibold text-white">
                                                ${(item.productDetails.finalPrice * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <PopularProducts />
        </>
    );
};
