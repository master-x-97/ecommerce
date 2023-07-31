import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { baseUrl } from '../utils/baseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login({saveUserData}) {
  const notify = (msg,type) => {
    toast[type](msg)};
  let [loading,setloading] = useState(false)
  let navigate=useNavigate()
  // let validate = (values)=>{
  //   let errors ={}
  //   if(!values.name){
  //     errors.name = 'name is required'
  //   }else if(values.name.length<6){
  //     errors.name = 'Must be 6 characters or less';

  //   }
  //   if(!values.email){
  //     errors.email = 'email is required'
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email = 'Invalid email address';
  //   }

  //   if(!values.password){
  //     errors.password = 'password is required'
  //   }else if(!/^[A-Z][a-z0-9A-Z!@$%]$/i.test(values.password)){
  //     errors.password = 'password is not invalid';
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword = 'rePassword is required'
  //   }else if(values.rePassword!=values.password){
  //     errors.rePassword = 'password and repassword is not match';

  //   }

  //   return errors


  // }

  let validationSchema = Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
  })
    let RegisterFormk = useFormik({
        initialValues:{
          email: '',
          password:'',
        },
        // validate
        validationSchema
        ,
        onSubmit:(values)=>{
          setloading(true)
          // console.log(values);
          axios.post(`${baseUrl}/auth/signin`, values).then((data)=>{
            if(data.status === 200){
              localStorage.setItem('token' , data.data.token)
              setloading(false)
              notify("success" , "success")
              navigate('/')
              saveUserData()
            }

          }).catch((error)=>{
            if (error.response.status === 401){
              setloading(false)
              notify( error.response.data.message , 'error') 
              // alert(error.response.data.message)
            }
          })
          //sned to API

        }
    })
    // console.log(RegisterFormk.errors);
  return (
    <>
    <div className="w-50 m-auto my-5">
        <h2>Login now</h2>
        <form onSubmit={RegisterFormk.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input onBlur={RegisterFormk.handleBlur} value={RegisterFormk.values.email} onChange={RegisterFormk.handleChange} type="email" className=' form-control my-3' id='email' name='email' />
            {RegisterFormk.errors.email && RegisterFormk.touched.email ?<div className="alert alert-danger">
              {RegisterFormk.errors.email}
            </div>:''}

            <label htmlFor="password">password</label>
            <input onBlur={RegisterFormk.handleBlur} value={RegisterFormk.values.password} onChange={RegisterFormk.handleChange} type="password" className=' form-control my-3' id='password' name='password' />
            
            {RegisterFormk.errors.password && RegisterFormk.touched.password ?<div className="alert alert-danger">
              {RegisterFormk.errors.password}
            </div>:''}

            <button disabled={!(RegisterFormk.isValid&&RegisterFormk.dirty&&!loading)} type='submit' className='btn bg-main text-white'>
              {!loading ? "Login" : <i className='fas fa-spinner fa-spin fa-spin-pulse'></i>}
            </button>
        </form>
    </div>
    </>
  )
}
