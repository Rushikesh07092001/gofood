import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
export default function Signup() {
  const [user,setUser]= useState({
    name:"",location:"",email:"",password:""
  });
let name ,value;
let navigate = useNavigate()
const handleInputs = (e) => {
  console.log(e);
  name= e.target.name;
  value=e.target.value;

  setUser({...user,[name]:value})
}
const PostData = async(e)=>{
  e.preventDefault();
  const {name,location,email,password}=user;

  const res = await fetch("http://localhost:5000/api/creatuser",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"

    },
    body:JSON.stringify({

      name,location,email,password

    })
  });
  const data = await res.json();
  if (data.success) {
    //save the auth toke to local storage and redirect
    localStorage.setItem('token', data.authToken)
    navigate("/login")

  }
  else {
    alert("Enter Valid Credentials")
  }


}


  return (
    <div className='container'>
      <div className='signupForm'>
        <h2 className='form-title'>sign up</h2>
        <form method="POST" className='register-form' id='register-form'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">name</label>
            <input type="text" name="name" className="form-control" value={user.name} onChange={handleInputs} id="exampleInputName" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">location</label>
            <input type="text" name="location" className="form-control" value={user.location} onChange={handleInputs} id="exampleInputLocation" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email"  name="email" className="form-control" value={user.email} onChange={handleInputs} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="current-password" name="password" className="form-control" value={user.password} onChange={handleInputs} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="btn btn-primary " onClick={PostData}>Register</button>
          &nbsp;&nbsp;&nbsp;
          <NavLink to="/login" className="signup btn btn-danger ">Already user</NavLink>
        </form>
      </div>
    </div>
  )
}
