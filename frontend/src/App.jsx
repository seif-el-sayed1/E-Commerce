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

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/auth");
  return (
    <>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path='/' element={
            <Home />
        } /> 

        <Route path='/products' element={
          <Products />
        } />

        <Route path="/auth" element={
          <Login />
        } />

        <Route path="/auth/reset-password" element={
          <ResetPassword />
        } />

        <Route path="/auth/verify-email" element={
          <VerifyEmail />
        } />

        <Route path="/products/:id" element={
          <ProductsDetails />
        } />

      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}

export default App
