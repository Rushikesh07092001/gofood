import React,{useState} from 'react'
import { NavLink,json,useNavigate} from 'react-router-dom'
export default function Login() {
  const [user,setUser]= useState({
    email:"",password:""
  });
  let navigate=useNavigate()
let name ,value;
const handleInputs = (e) => {
  console.log(e);
  name= e.target.name;
  value=e.target.value;

  setUser({...user,[name]:value})
}
const PostData = async(e)=>{
  e.preventDefault();
  const {email,password}=user;

  const res = await fetch("http://localhost:5000/api/login",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"

    },
    body:JSON.stringify({

      email,password

    })
  });
  const data = await res.json();
  console.log(data)

  if(data.success){
    localStorage.setItem('usermail', email)
    localStorage.setItem("authToken",data.authToken);
    console.log(localStorage.getItem("authToken"))
    navigate("/");
   
  }
  else{
    window.alert("enter valid credentials");
    console.log("enter valid credentials");


  }


}
  return (
    <div className='container'>
    <div className='signupForm'>
      <h2 className='form-title'>sign in</h2>
      <form method="POST" className='register-form' id='register-form'>
        
       
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"  name="email" className="form-control" value={user.email} onChange={handleInputs} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="current-password" name="password" className="form-control" value={user.password} onChange={handleInputs} id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary " onClick={PostData}>Login</button>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/creatuser" className="signup btn btn-danger ">New user</NavLink>
      </form>
    </div>
  </div>
  )
}
