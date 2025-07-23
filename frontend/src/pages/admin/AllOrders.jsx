import { useContext, useEffect } from 'react';
import { OrderContext } from '../../context/OrderContext';

export const AllOrders = () => {
    const { allOrders, getAllOrders, loading, updateOrderStatus } = useContext(OrderContext);

    useEffect(() => {
        getAllOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-black/50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#1a1a1a] min-h-screen w-full px-6 py-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-[#1E88E5]">All Orders</h2>

            {!allOrders.orders || allOrders.orders.length === 0 ? (
                <p className="text-gray-400 text-lg text-center">No orders found.</p>
            ) : (
                <div className="flex flex-col gap-8">
                    {allOrders.orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-[#263238] border-1 border-[#1E88E5] rounded-xl p-6 shadow-md  space-y-4"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <div>
                                    <div className='flex items-center gap-5 mb-2'>
                                        <p className="text-sm text-gray-400 mb-1">Client: <span className="text-white">{order.userId.name}</span></p>
                                        <p className="text-sm text-gray-400 mb-1">Email: <span className="text-white">{order.userId.email}</span></p>                                        
                                    </div>
                                    <div className='flex items-center gap-5 mb-2'>
                                        <p className="text-sm text-gray-400 mb-1">Address: <span className="text-white">{order.address}</span></p>
                                        <p className="text-sm text-gray-400 mb-1">Phone: <span className="text-white">{order.phone}</span></p>
                                    </div>
                                    <div className='flex items-center gap-5 mb-2'>
                                        <p className="text-sm text-gray-400 mb-1">
                                            Order Status:
                                            <span className={`ml-1 font-semibold ${
                                                order.orderStatus === 'pending' ? 'text-yellow-400' :
                                                order.orderStatus === 'shipped' ? 'text-blue-400' :
                                                order.orderStatus === 'out-for-delivery' ? 'text-purple-400' :
                                                order.orderStatus === 'delivered' ? 'text-green-500' :
                                                order.orderStatus === 'cancelled' ? 'text-red-500' :
                                                'text-white'
                                            }`}>
                                                {order.orderStatus}
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-400 mb-1">Payment: <span className={`${order.paymentStatus === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus}</span></p>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-1">Date: <span className="text-white">{new Date(order.date).toLocaleDateString()}</span></p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <p className="text-xl font-bold text-[#1E88E5]">Total: ${order.totalPrice.toFixed(2)}</p>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className="bg-[#121212] py-2 cursor-pointer text-white border border-[#1E88E5] rounded px-3"
                                    >
                                        {["pending", "delivered", "shipped", "out-for-delivery", "cancelled"].map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                {order.products.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center gap-4 bg-[#121212] border border-[#1E88E5] p-3 rounded-md shadow-sm"
                                    >
                                        <img
                                            src={item.productDetails.image}
                                            alt={item.productDetails.title}
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-[#1E88E5]">{item.productDetails.title}</h4>
                                            <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-gray-400">
                                                Price: ${item.productDetails.price.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-white font-medium">
                                                Total: ${(item.productDetails.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
