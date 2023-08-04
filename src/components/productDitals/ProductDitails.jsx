import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../utils/baseUrl';

export default function ProductDitails() {
   let {id} = useParams()
   console.log();  
   const [Product, setProduct] = useState([])
   const GetProduct = async () => {

     let {data} = await axios.get(`${baseUrl}/products/${id}`)
     console.log(data.data);
     setProduct(data.data)
   }
   useEffect(() => {
     GetProduct()
   },[])
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                <img src={Product.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-9">
                  <div>hello</div>
                </div>
            </div>
        </div>
    </div>
  )
}
