import { createContext, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);

    const [cart, setCart] = useState([]);
    axios.defaults.withCredentials = true;
    
    const addToCart = async (productId) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/cart/add-to-cart`, { productDetails: productId })
            if (data.success) {
                toast.success("Product added to cart", { position: "top-center" });
            } else {
                toast.error("Please Login ", { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const increaseQuantity = async (productId) => {
    try {
        const { data } = await axios.post(`${backendUrl}/api/cart/increase-quantity`, {
            productDetails: productId
        });

        if (data.success) {
            setCart((prevCart) => {
                const updatedProducts = prevCart.products.map(item =>
                    item.productDetails._id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                const updatedTotal = updatedProducts.reduce(
                    (acc, item) => acc + item.productDetails.finalPrice * item.quantity,
                    0
                );

                const updatedItemCount = updatedProducts.length;

                return {
                    ...prevCart,
                    products: updatedProducts,
                    total: updatedTotal,
                    itemCount: updatedItemCount,
                };
            });
        }
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
    }
};

    const decreaseQuantity = async (productId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/cart/decrease-quantity`, { productDetails: productId })
            if (data.success) {
                setCart((prevCart) => {
                    const updatedProducts = prevCart.products
                        .map(item =>
                            item.productDetails._id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter(item => item.quantity > 0); 

                    const updatedTotal = updatedProducts.reduce(
                        (acc, item) => acc + item.productDetails.finalPrice * item.quantity,
                        0
                    );

                    const updatedItemCount = updatedProducts.length;

                    return {
                        ...prevCart,
                        products: updatedProducts,
                        total: updatedTotal,
                        itemCount: updatedItemCount,
                    };
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        }
    }

    const deleteFromCart = async (productId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/cart/delete-from-cart`, {
                productDetails: productId
            });

            if (data.success) {
                setCart((prevCart) => {
                    const updatedProducts = prevCart.products.filter(
                        item => item.productDetails._id !== productId
                    );

                    const updatedTotal = updatedProducts.reduce(
                        (acc, item) => acc + item.productDetails.finalPrice * item.quantity,
                        0
                    );

                    const updatedItemCount = updatedProducts.length;

                    return {
                        ...prevCart,
                        products: updatedProducts,
                        total: updatedTotal,
                        itemCount: updatedItemCount,
                    };
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        }
};

    const deleteCart = async () => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/cart/delete-cart`)
            if (data.success) {
                setCart([]);
                toast.success("Cart Cleared", { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        }
    }

    const getCart = async () => {
        try {
            setLoading(true); 
            const { data } = await axios.get(`${backendUrl}/api/cart/get-cart`)
            if (data.success) {
                setCart({
                ...data.cart,
                total: data.total,
                itemCount: data.itemCount
            });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            console.log(message);
        } finally {
            setLoading(false);
        }
    }

    const value = {
        loading,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        deleteCart,
        getCart,
        cart,
    }

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    )
}
