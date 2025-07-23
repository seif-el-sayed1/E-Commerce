import { useContext, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';
import { PopularProducts } from '../components/PopularProducts';

export const MyOrders = () => {
    const { orders, getUserOrder, loading, stripePayment, cancelOrder } = useContext(OrderContext);

    useEffect(() => {
        getUserOrder();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-black/50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-[#1a1a1a] min-h-screen w-full px-6 md:px-16 lg:px-24 xl:px-32 py-10 text-white">
                <h2 className="text-3xl font-bold mb-8 text-[#1E88E5]">Your Orders</h2>
                {!orders.orders || orders.orders.length === 0 ? (
                    <p className="text-gray-400 text-lg text-center">You have no orders yet.</p>
                ) : (
                    <div className="flex flex-col gap-8">
                        {orders.orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-[#2a2a2a] rounded-xl p-6 shadow-md border border-[#333] space-y-4"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Date: <span className="text-white">{new Date(order.date).toLocaleDateString()}</span></p>
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
                                        <p className="text-sm text-gray-400 mb-1">Payment: <span className={`font-semibold ${order.isPaid ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus}</span></p>
                                        <p className="text-sm text-gray-400 mb-1">Address: <span className="text-white">{order.address}</span></p>
                                        <p className="text-sm text-gray-400 mb-1">Phone: <span className="text-white">{order.phone}</span></p>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p className="text-xl font-bold text-[#1E88E5]">Total: ${order.totalPrice.toFixed(2)}</p>
                                        <button onClick={() => stripePayment(order._id)}
                                            className={`${order.isPaid ? "hidden" : "block"} cursor-pointer bg-[#1E88E5] text-white py-2 px-4 rounded-md hover:bg-[#1E88E5]/80 transition`}
                                        >
                                            Pay Now
                                        </button>
                                        <span className={`${order.isPaid ? "block" : "hidden"} text-green-500 text-center`}>
                                            Paid
                                        </span>
                                        <button onClick={() => cancelOrder(order._id)}
                                            className={`${order.isPaid || order.orderStatus !== 'pending' ? "hidden" : "block"} cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500/80 transition`}
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                    {order.products.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center gap-4 bg-[#121212] border-1 border-[#1E88E5] p-3 rounded-md shadow-sm"
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

            <PopularProducts />
        </>
    );
};
