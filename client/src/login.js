// import { Link } from "react-router-dom";
import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import { loginUser } from './action/auth';
import { connect } from 'react-redux';



const Login=({loginUser, isLoggedIn})=>{


  // else console.log('hi');

    let [data,setData]=useState({
        email:'',
        password:''
      });
  if(isLoggedIn)return<Redirect to="/" />
    
      // input method
      const onChange=e=>{
        setData({...data,[e.target.name]:e.target.value})
      }
    
      // onclick for submit form 
      const submitData=()=>{  
        // console.log(data);
        loginUser(email,password);
      }
    
      let {email,password}=data;

    return(
        <div>
        <h1>Login Page</h1>
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
export default connect(mapStateToProps,{ loginUser })(Login);