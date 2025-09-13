import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({role = "user"}) => {
    const navigate = useNavigate();
    let home_route = "/";
    if(role=="admin"){
      home_route ="/admin/dashboard";
    }
  return (
    <div>
        <h1>404- Page Not Found !</h1>
        <button className='btn sucsess' onClick={()=> navigate(home_route)}> Go to Home</button>
    </div>
  )
}

export default ErrorPage
