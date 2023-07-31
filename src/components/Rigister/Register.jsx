import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { baseUrl } from '../utils/baseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {
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
    name:Yup.string().min(6).max(25).required('el bta da hohm azmely'),
    email:Yup.string().email().required(),
    password:Yup.string().matches(/^[A-z][a-z0-9!@#$%]{6,}$/ , 'low password').required(),
    rePassword:Yup.string().oneOf([Yup.ref('password')] , 'password and repassword is not match').required(),
  })
    let RegisterFormk = useFormik({
        initialValues:{
          name: '' ,
          email: '',
          password:'',
          rePassword:'',
        },

        // validate
        validationSchema
        ,
        onSubmit:(values)=>{
          setloading(true)
          console.log(values);
          axios.post(`${baseUrl}/auth/signup`, values).then((data)=>{
            if(data.status === 201){
              setloading(false)
              notify("success" , "success")
              navigate('/login')
            }

          }).catch((error)=>{
            if (error.response.status == 409){
              setloading(false)
              notify(error.response.data.message , 'error')
              
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
        <h2>Register</h2>
        <form onSubmit={RegisterFormk.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input onBlur={RegisterFormk.handleBlur} value={RegisterFormk.values.name} onChange={RegisterFormk.handleChange} type="text" className=' form-control my-3' id='name' name='name' />
            {RegisterFormk.errors.name && RegisterFormk.touched.name ?<div className="alert alert-danger">
              {RegisterFormk.errors.name}
            </div>:''}
            
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

            <label htmlFor="rePassword">rePassword</label>
            <input onBlur={RegisterFormk.handleBlur} value={RegisterFormk.values.rePassword} onChange={RegisterFormk.handleChange} type="password" className=' form-control my-3' id='rePassword' name='rePassword' />
            
            {RegisterFormk.errors.rePassword && RegisterFormk.touched.rePassword ?<div className="alert alert-danger">
              {RegisterFormk.errors.rePassword}
            </div>:''}

            <button disabled={!(RegisterFormk.isValid&&RegisterFormk.dirty&&!loading)} type='submit' className='btn bg-main text-white'>
              {!loading ? "Register" : <i className='fas fa-spinner fa-spin'></i>}
            </button>
        </form>
    </div>
    </>
  )
}
