import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { notify } from '../utils/notify';
import Style from './product.module.css'

export default function Product({Products}) {
  let {addToCart ,getCartCount} = useContext(CartContext)

    async function addProduct(productId){
      let token = localStorage.getItem('token')
      if(token){
        let response = await addToCart(token,productId)
        if(response.status=200){
          getCartCount()
          notify('Product added successfully to your cart','success')
        }
        console.log(response);
      }else{
        alert('you are not login')
      }
    }
  return (
    <>
    {Products.map((item) =>{
        return <div key={item._id} className={`mymedia col-md-2 mt-4 mb-5 `}>
<div className="product  ">
          <Link className='links' to={'/Product-details/'+item._id}>
          <img className='w-100 ' src={item.imageCover} alt="" />
            <h6 className='text-main my-1 links'>{item.category.name}</h6>
           <p className='fw-bolder links'>{item.title.split(' ').slice(0,2).join(' ')}</p> 
           <div className={`d-flex justify-content-around align-items-center mb-1 ${Style.links} `}>
            <span>{item.price} EG</span>
            <div>
                <i className='fas fa-star rating-color'></i>
                {item.ratingsAverage}
            </div>
           </div>
          </Link>
           <button className='btn bg-main text-white w-100  ' onClick={()=>addProduct(item._id)}>add to cart</button>
       </div>
    </div>
    })}
    </>
  )
}
// split() تحول الاسترنج الي اراي
// slice(0,2) تبدأ من اول الاراي وتأخذ قيمتين 
// join('') تفرق بين عناصر الاراي بالكراكتر الموجوده بين الدابل كودز