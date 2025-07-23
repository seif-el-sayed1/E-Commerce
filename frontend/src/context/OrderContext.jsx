import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [loading, setLoading] = useState(false);
    
    const [orders, setOrders] = useState({
        orders: [],
        totalOrders: 0,
        totalProfit: 0,
        totalPages: 0
    });

    const [allOrders, setAllOrders] = useState({
        orders: [],
        totalOrders: 0,
        totalProfit: 0,
    });

    const submitOrder = async (address, phone) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/order/submit-order`, { address, phone })
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const cancelOrder = async (orderId) => {
        const confirmed = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmed) return;   
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendUrl}/api/order/cancel-order`, { orderId });
            if (data.success) {
                setOrders((prev) => ({ ...prev, orders: prev.orders.filter((order) => order._id !== orderId) }));
                
            }
            
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const getUserOrder = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/order/get-user-orders`);
            if (data.success) {
                setOrders({
                    orders: data.orders,
                    totalOrders: data.totalOrders,
                    totalProfit: data.totalProfit,
                    totalPages: data.totalPages
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }   
    }

    const getAllOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/order/get-all-orders`);
            if (data.success) {
                setAllOrders({
                    orders: data.orders,
                    totalOrders: data.totalOrders,
                    totalProfit: data.totalProfit,
                    totalPages: data.totalPages
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const updateOrderStatus = async (orderId, orderStatus) => {
        try {
            
            const { data } = await axios.put(`${backendUrl}/api/order/update-order-status`, { orderId, orderStatus });
            if (data.success) {
                setAllOrders((prev) => ({ ...prev, orders: prev.orders.map((order) => order._id === orderId ? { ...order, orderStatus } : order) }));
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        }
    }

    const stripePayment = async (orderId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/order/stripe-payment`, { orderId });
            if (data.success) {
                window.location.assign(data.url);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value ={
        submitOrder,
        cancelOrder,
        getUserOrder,
        getAllOrders,
        allOrders,
        updateOrderStatus,        
        stripePayment,
        loading,
        orders
    }

    return (
        <OrderContext.Provider value={value}>
            {props.children}
        </OrderContext.Provider>
    )

}