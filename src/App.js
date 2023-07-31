
import './App.css';
import NavBar from './components/navBar/NavBar';
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import { Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './components/pages/Homepage';
import Products from './components/products/Products';
import ProductDitails from './components/productDitals/ProductDitails';
import Register from './components/Rigister/Register';
import Login from './components/login/Login';
import { ToastContainer } from 'react-toastify';
import CartContextProvider from './components/context/cartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import Brands from './components/Brands/Brands';






 function App() {
  const[userData , setUserData] = useState(null)
  // function saveUserData(){
  //   let encodedToken = localStorage.getItem('token')
  //   let decodedToken = jwtDecode(encodedToken)
  //   setUserData(decodedToken);
  // }
  let routes=createBrowserRouter([
    {
      path:'',
      element:<Layout/>,
      children:[
      {index:true,element:<Homepage/>},
      {path:'Products',element:<Products/>},
      {path:'Product-details/:id',element:<ProductDitails/>},
      {path:'Products',element:<Products/>},
      {path:'Register',element:<Register/>},
      {path:'Login',element:<Login />},
      {path:'Cart',element:<Cart/>},
      {path:'Checkout',element:<Checkout/>},
      {path:'Brands',element:<Brands/>},

      ]
    }
  ])
  return (<>
  <ToastContainer theme='colored' />
  <CartContextProvider>
    
  <RouterProvider router={routes} />
  </CartContextProvider>



  </>
  );
}

export default App;


