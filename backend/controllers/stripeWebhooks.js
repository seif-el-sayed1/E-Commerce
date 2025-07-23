const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel"); // مهم جداً

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        try {
            const { orderId } = session.metadata;

            if (orderId) {
                const order = await orderModel.findByIdAndUpdate(orderId, {
                    isPaid: true,
                    paymentMethod: "online",
                    paymentStatus: "completed"
                }, { new: true }).populate("products.productDetails");

                if (order && order.products) {
                    for (const item of order.products) {
                        await productModel.findByIdAndUpdate(
                            item.productDetails._id,
                            { $inc: { sold: item.quantity } }
                        );
                    }

                }
            }
        } catch (err) {
            console.error("Error updating order/products:", err.message);
        }
    } else {
        console.log("Unhandled event type:", event.type);
    }

    return res.status(200).json({ received: true });
};

module.exports = stripeWebhook;
