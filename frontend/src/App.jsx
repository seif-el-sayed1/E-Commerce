import { Toaster } from "react-hot-toast";
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Footer } from "./components/Footer";
import { Products } from "./pages/Products";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />  
      <Routes>
        <Route path='/' element={
            <Home />
        } /> 
        <Route path='/products' element={
          <Products />
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
