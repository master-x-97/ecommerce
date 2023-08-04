import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Product from '../product/Product';
import { baseUrl } from '../utils/baseUrl';

export default function Products() {
    const [Products, setProducts] = useState([])
    const GetAllProducts = async () => {

      let {data} = await axios.get(`${baseUrl}/products`)
      console.log(data.data);
      setProducts(data.data)
    }
    useEffect(() => {
      GetAllProducts()
    },[])
  return (   <>
    <div className="container">
        {Products!=0?<div className="row ">
        <Product Products={Products}/>
        </div>: <Loading/>}
    </div>
    </>
  )
}

