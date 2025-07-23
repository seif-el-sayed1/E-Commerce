import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Footer } from "./components/Footer";
import { Products } from "./pages/Products";
import { Login } from "./pages/auth/Login";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { ProductsDetails } from "./pages/ProductsDetails";
import { Cart } from "./pages/Cart";
import { UserRoutes } from "./utils/UserRoutes";
import { Sidebar } from "./components/admin/Sidebar";
import { Dashboard } from "./pages/admin/Dashboard";
import { AddProduct } from "./pages/admin/AddProduct";
import { ListProducts } from "./pages/admin/ListProducts";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { AllUsers } from "./pages/admin/AllUsers";
import { MyOrders } from "./pages/MyOrders";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/auth");
  const isAdminPage = location.pathname.includes("/admin");
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {!isLoginPage && !isAdminPage && <Navbar />}
      
      <Routes>
        <Route path='/' element={
            <Home />
        } />
          
        <Route path="/auth" element={
          <Login />
        } />

        <Route path='/products' element={
          <Products />
        } />

        <Route path="/products/:id" element={
          <ProductsDetails />
        } />

        <Route element={<UserRoutes />}>

          <Route path="/auth/reset-password" element={
            <ResetPassword />
          } />

          <Route path="/auth/verify-email" element={
            <VerifyEmail />
          } />

          <Route path="/cart" element={
            <Cart />
          } />

          <Route path="/my-orders" element={
            <MyOrders /> 
          } />
        </Route>
        
        <Route path="/admin" element={
          <div className="flex">
            <Sidebar />
            <Dashboard />
          </div>
        } />

        <Route path="/admin/add-product" element={
          <div className="flex">
            <Sidebar />
            <AddProduct />
          </div>
        } />

        <Route path="/admin/list-products" element={
          <div className="flex ">
            <Sidebar />
            <ListProducts />
          </div>
        }
        />
        <Route path="/admin/update/:id" element={
          <div className="flex">
            <Sidebar />
            <UpdateProduct />
          </div>
        } />

        <Route path="/admin/users" element={
          <div className="flex">  
            <Sidebar />
            <AllUsers />
          </div>
        } /> 

      </Routes>
      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  )
}

export default App