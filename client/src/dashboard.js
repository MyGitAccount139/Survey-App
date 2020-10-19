 import { Link } from 'react-router-dom';
 import { logOut } from './action/auth';
import React from 'react';
import {connect} from 'react-redux';

const Dashboard=({isLoggedIn,logOut})=>{
  
    return(
        <div>
        <h1>Dashboard</h1>
        <br/>
        <Link to="/register" style={{display:isLoggedIn? "none": "block"}}>Register</Link>
        <br/>
        <Link to="/login" style={{display:isLoggedIn?"none":"block"}}>Login</Link>
        {
          isLoggedIn?(
            <div>
              <h1>you are logged in</h1>
              <br/>
              <button onClick={()=>logOut()}>lof out</button>
              </div>
          ):
          (
            <div>
              <h1>you are not logged in</h1>
              </div>
          )         

        }
      </div>
    )
}

const mapStateToProps=state=>({
  isLoggedIn:state.isLoggedIn
})
export default connect(mapStateToProps,{logOut})(Dashboard);