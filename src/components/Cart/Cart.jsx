import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import Loading from '../Loading/Loading'
import { notify } from '../utils/notify'

export default function () {
   let {getUserCart , removeCartItem , updateQty,getCartCount}= useContext(CartContext)
   let [Cart , setCart] = useState([])
   let [TotalPrice , setTotalPrice] = useState([])
   async function getCart(){
    let token = localStorage.getItem('token')
    if(token){
      let response =  await  getUserCart(token)
      console.log(response);
      setCart(response.data.data.products)
      setTotalPrice(response.data.data.totalCartPrice)
    }
   }


   async function deleteProduct(productId){
    let token = localStorage.getItem('token')
    if(token){
        
      let response =  await  removeCartItem(token ,productId)
    //   console.log(response);
      setCart(response.data.data.products)
      setTotalPrice(response.data.data.totalCartPrice)
      notify('product deleted','success')
      getCartCount()
    }
   }
   
   async function updateProductQty(productId , count){
    let token = localStorage.getItem('token')
    if(token){
        
      let response =  await  updateQty(token,productId , count)
    //   console.log(response);
      setCart(response.data.data.products)
      setTotalPrice(response.data.data.totalCartPrice)
      notify('product updated','success')
    }
   }
   useEffect(()=>{
    getCart()

   },[])
  return (<>
  {Cart.length!=0?  <div className="container">
   <div className="bg-main-light p-3 my-4">
    <h3>
        Shop Cart
    </h3>
    <h6 className='text-main my-3 fw-bold'>total cart price {TotalPrice} egp</h6>
    {Cart.map((item)=>{
        return <div key={item._id} className="row border-bottom my-3">
            <div className="col-md-1">
                <img src={item.product.imageCover} className='w-100 m-1' alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between ">
            <div>
                <h6>{item.product.title}</h6>
                <h6 className='text-main fw-bolder'>{item.price} EGP</h6>
                <button onClick={()=>deleteProduct(item.product._id)} className='text-danger border-0 '>Remove <i class="fa-solid fa-trash "></i></button>
            </div>
            <div>
                <button onClick={()=>updateProductQty(item.product._id,item.count+1)} className='text-main btn-border'>+</button>
                <span className='mx-2'>{item.count}</span>
                <button onClick={()=>updateProductQty(item.product._id,item.count-1)} className='text-main btn-border'>-</button>
            </div>
            </div>
        </div>

    })}
    <Link to='/Checkout' className='btn bg-main text-white'>CHECkOUT</Link>
   </div>

  </div> : /*"<Loading/>"*/ <div className='w-100 vh-100 container  bg-secondary-subtle position-relativ'>
    <div className='fs-1 my-4 position-absolute top-50 start-50 translate-middle'><p className='text-main fw-bold '>you have no products in your cart</p> </div>
    </div>}
    
    </>
  )
}
