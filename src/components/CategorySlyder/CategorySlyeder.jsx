import React, {useEffect, useState}  from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl'
import Slider from "react-slick";
import style from "./categories.module.css"


export default function CategorySlyeder() {
  const [categorys, setcategorys] = useState([])
    const GetAllCategorys = async () => {

      let {data} = await axios.get(`${baseUrl}/Categories`)
      // console.log(data.data);
      setcategorys(data.data)
    }
    useEffect(() => {
      GetAllCategorys()
    },[])
    var settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
      autoplay: true
    };
  return ( <>
      <div className='container'>
        <h3>Lorem ipsum dolor sit.</h3>
      <Slider {...settings} autoplaySpeed={3000} className={`${style.slidex} my-4`} >
        {categorys.map((item) =>{
        return  <div key={item._id}>
          <img src={item.image}  alt="" />
          <h5>{item.name}</h5></div>

        })}

      </Slider>
    </div>
    </>
   
  )
}
