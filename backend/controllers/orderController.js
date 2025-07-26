const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");



const submitOrder = async (req, res) => {
    const { address, phone } = req.body;

    try {
        const cart = await cartModel.findOne({ userId: req.user.id }).populate("products.productDetails");

        if (!address || !phone) {
            return res.status(400).json({ success: false, message: "Address and phone number are required" });
        }
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        
        const totalPrice = cart.products.reduce((acc, product) => {
            if (product.productDetails && typeof product.productDetails.price === 'number') {
                return acc + product.productDetails.price * product.quantity;
            }
            return acc;
        }, 0);

        const newOrder = new orderModel({
            userId: req.user.id,
            products: cart.products, 
            totalPrice,
            address,
            phone,
            paymentMethod: "cod", 
        });

        await newOrder.save();
        await cart.deleteOne(); 

        return res.status(200).json({ success: true, message: "Order submitted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await orderModel.findOne({ _id: orderId, userId: req.user.id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        if (order.paymentMethod === "cod" && order.orderStatus === "pending") {
            
            await order.deleteOne({_id: orderId});
            return res.status(200).json({ success: true, message: "Order cancelled successfully" });
        } else {
            return res.status(400).json({
                success: false,
                message: `Order status is ${order.orderStatus}. Cancellation not allowed at the moment.`
            });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.user.id }).select("-__v -paymentMethod -createdAt -updatedAt")
            .populate({
                path: "products.productDetails",
                select: "image title price"
            })
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        return res.status(200).json({ success: true, orders });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
    
        const {page = 1, limit = 5} = req.query
        const skip = (Number(page) - 1) * Number(limit);

        

        const orders = await orderModel.find()
            .skip(skip)
            .limit(Number(limit))
            .select("-__v -createdAt -updatedAt")
            .populate({
                path: "products.productDetails",
                select: "title price image"
            }) 
            .populate({
                path: "userId",
                select: "name email" 
            })
            .sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        const totalOrders = orders.length;
        const totalPages = Math.ceil(totalOrders / Number(limit));
        const totalProfit = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        return res.status(200).json({ success: true, orders, totalOrders, totalProfit, totalPages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateOrderStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body;

    try {
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = orderStatus;
        await order.save();

        return res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const stripePayment = async (req, res) => {
    const { orderId } = req.body

    try {
        const order = await orderModel.findById(orderId)
        const user = await userModel.findById(req.user.id)

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Order by ${user.name}`,
                        },
                        unit_amount: order.totalPrice * 100,
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            customer_email: user.email,
            success_url: `${process.env.CLIENT_URL}/my-orders`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            metadata: {
                orderId: order._id.toString(),
                userId: req.user.id.toString(),
            }
        })

        return res.json({ success: true, url: session.url })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    submitOrder,
    getUserOrders,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    stripePayment
};
