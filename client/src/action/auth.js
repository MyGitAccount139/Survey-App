import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    AUTH_ERROR,
    LOAD_USER,
    LOG_OUT
}from '../constants/constants.js';
import {setToken} from '../setToken';
import axios from 'axios';
// import { application } from 'express';

export const loadUser= () => async dispatch=>{
    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }
try{
    const response=await axios.get('http://localhost:4000/api/users');  

    dispatch({
        type:LOAD_USER,
        payload:response.data
    });
}
catch(error){
    dispatch({type:AUTH_ERROR,payload:error});
}
}   

export const registerUser=(email,password)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
 
        const body=JSON.stringify({email,password});

        const response= await axios.post('http://localhost:4000/api/users/register',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        });
        dispatch(loadUser());
    }catch(error){
        alert("Enter Valid Data");
        dispatch({type:REGISTER_FAIL,payload:error});
    }
}

export const loginUser=(email,password)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const body=JSON.stringify({email,password});

        const response= await axios.post('http://localhost:4000/api/users/login',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        });
        dispatch(loadUser());
    }catch(error){ 
        alert("Enter valid credentials");
        dispatch({type:LOGIN_FAIL,payload:error});
    }
}

export const logOut=()=>async dispatch=>{
    dispatch ({ type:LOG_OUT })
}