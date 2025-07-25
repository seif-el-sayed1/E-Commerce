# TechZoom

**TechZoom** is a full-featured e-commerce platform built from scratch using the **MERN Stack**. It delivers a smooth and responsive user experience, with a clean UI and intuitive UX design.

## 🔥 Features

- **Google Authentication:** Users can log in using their Google accounts.
- **Product Management with Cart:**
  - Add products to the cart
  - Increase/decrease product quantity
  - Remove items from the cart
  - View cart in real-time
- **Product Filters:**
  - Filter by **Price Range**
  - Filter by **Category**
- **Search Bar:** Quickly search for products by name.
- **Stripe Payments:** Secure online payments using Stripe.
- **Admin Panel:** Accessible only to admins, includes:
  - Add new products
  - Manage users
  - Manage products
  - View and manage all orders
- **Dashboard Stats:**
  - 🧑‍💻 Total Users
  - 💰 Total Profit
  - 📦 Total Products
  - 📑 Total Orders

## 📦 Order Status Flow

Each order can go through the following states:

- `Pending`
- `Shipped`
- `Out for Delivery`
- `Delivered`
- `Canceled`

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + Google OAuth
- **Payments:** Stripe API
