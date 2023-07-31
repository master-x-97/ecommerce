import { useFormik } from 'formik'
import React from 'react'

export default function Checkout() {
    let checkoutformik = useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: "",

        },
        onSubmit:(values)=>{
            console.log(values);
        }
    })
  return (
    <>
    <div className="w-50 m-auto">
        <form onSubmit={checkoutformik.handleSubmit} >
            <label htmlFor="details">details</label>
            <input onChange={checkoutformik.handleChange} onBlur={checkoutformik.handleBlur} type="text" name='details' id='details' className='form-control  my-3' />
            <label htmlFor="phone">phone</label>
            <input onChange={checkoutformik.handleChange} onBlur={checkoutformik.handleBlur} type="text" name='phone' id='phone' className='form-control  my-3' />
            <label htmlFor="city">city</label>
            <input onChange={checkoutformik.handleChange} onBlur={checkoutformik.handleBlur} type="text" name='city' id='city' className='form-control  my-3' />
            <button className='btn bg-main text-white w-100'>Place Order</button>

        </form>
    </div>
    </>
  )
}
