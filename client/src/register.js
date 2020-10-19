// import { useState } from "react";
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from './action/auth';
import {Redirect} from 'react-router-dom';

const Register=({isLoggedIn,registerUser})=>{


  //  console.log(isLoggedIn,registerUser);
  let [data,setData]=useState({
        email:'',
        password:''
      });
      if(isLoggedIn) return <Redirect to="/"/>

    let {email,password}=data;    
    
      // input method
    const onChange=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    
      // onclick for submit form 
    const submitData=()=>{  
        if(email==='' && password==='')return alert("Emapty values");
        else registerUser(email,password);
        // console.log(data);
    }
    
    return(
        <div>
        <h1>Register Page</h1>
        <br/>
        <label>E-mail</label>
        <br/>
        <input onChange={(e)=>onChange(e)} value={email} name="email" type="email"></input>
        <br/>
        <label>Password</label>
        <br/>
        <input onChange={(e)=>onChange(e)} value={password} name="password" type="password"></input>
        <br/>
        <button onClick={()=>submitData()}>Submit</button>
      </div>
    )
}

const mapStateToProps=state=>({
  isLoggedIn:state.isLoggedIn
});
export default connect(mapStateToProps,{registerUser})(Register);