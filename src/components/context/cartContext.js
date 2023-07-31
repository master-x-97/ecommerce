import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { date } from "yup";
import { baseUrl } from "../utils/baseUrl";


export let CartContext = createContext(0)

 export default function CartContextProvider({children}){
    const [Cartcount, setCartcount] = useState(0)


    
    function getToken () {
        let token =localStorage.getItem('token');
        return token;
    }

    function logOut(){
        localStorage.removeItem('token');
      }

    function addToCart(token , productId ){
        return axios.post(`${baseUrl}/cart`,{productId},{headers:{token}}).
        then(data => data).
        catch(error => error)
        
    }
    
    
    function getUserCart(token ){
        return axios.get(`${baseUrl}/cart`,{headers:{token}}).
        then(data => data).
        catch(error => error)    
    }

    function removeCartItem(token , productId  ){
        return axios.delete(`${baseUrl}/cart/${productId}`,{headers:{token}}).
        then(data => data).
        catch(error => error)
        
    }
    
    function updateQty(token , productId ,count ){
        return axios.put(`${baseUrl}/cart/${productId}`,{count},{headers:{token}}).
        then(data => data).
        catch(error => error)
        
    }
    
    function getCartCount( ){
        let token =localStorage.getItem('token')
         axios.get(`${baseUrl}/cart`,{headers:{token}}).

        then(data => {console.log(data.data.numOfCartItems)

        setCartcount(data.data.numOfCartItems)}).

        catch(error => {console.log(error)})    
    }

    useEffect(()=>{getCartCount()},[])
    return <CartContext.Provider value={{ addToCart ,getCartCount ,getUserCart , removeCartItem , updateQty,Cartcount ,logOut,getToken }}>
        {children}

    </CartContext.Provider>
}


// هذا الكومبوننت هو خزان المشروع