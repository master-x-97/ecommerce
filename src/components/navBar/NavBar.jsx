import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import logo from "../../imgs/freshcart-logo.svg"



export default function NavBar({}) {
  // const [userToken,serUserToken]=useState();
  const navigate =useNavigate();
  let {Cartcount,logOut,getToken} = useContext(CartContext);

    function signOut(){
    logOut();
    navigate('/Login');
    // serUserToken(isToken);
  }

  // useEffect(()=>{

  // },[])
  return (<>
<nav className="navbar navbar-expand-lg bg-main-light   py-3 ">
  <div className="container ">
    <NavLink className="navbar-brand" to="/"><img src={logo} alt="" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Categorys</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Brands">Brands</NavLink>
        </li>
        
      </ul>
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {getToken() !== null? <>
         <Link to='/Cart' type="button" className="btn mx-2 position-relative">Card
        <i className="fa-solid fa-cart-shopping"></i>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success p-2">
  {Cartcount}
    <span className="visually-hidden"></span>
    
  </span>
</Link>
        <li className="nav-item">
          <NavLink className="nav-link" to="/" onClick={signOut}>logout</NavLink>
        </li>
        </>:<>
                <li className="nav-item">
          <NavLink className="nav-link" to="/Register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Login">login</NavLink>
        </li>
        </>}
       

      </ul>

    </div>
  </div>
</nav>

 </>
  )
}
