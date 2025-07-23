import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from "./context/UserContext.jsx";
import { ProductsContextProvider } from "./context/ProductsContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import {OrderContextProvider} from "./context/OrderContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <App />
            </OrderContextProvider>
          </CartContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
