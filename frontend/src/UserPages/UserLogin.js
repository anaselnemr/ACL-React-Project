import { Component, useState,useEffect, useReducer } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'; 
import '../css/App.css';
import Swal from 'sweetalert2' ;


import moment from "moment";
import {
  Form,
  Input,
  Button,
  message,
} from 'antd';


const UserLogin = () => {

  const [componentSize, setComponentSize] = useState('default');
  const history = useHistory();
  const [Data, setState] = useState({
    Username: "",  
    Password: "",
  }); 
  

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  const changeHander = (e) => {
    setState( prevData => {
     return {...prevData ,[e.target.name]: e.target.value}})
  };


  const loginHandler = (e) => {
      
    e.preventDefault(); 
  
    const criteria = {};
    Object.keys(Data).forEach(key => {
   if (Data[key]!=="") {
        criteria[key] = Data[key];
      }
    });

    if(Data.Username!==''&& Data.Password!==''){
   // prevent reloading the page
    axios.post('http://localhost:8000/userlogin', criteria)
    .then(res => {
      console.log(res.status);
      console.log(res.data);
      localStorage.setItem("AuthenticationState", "UserAuthenticated")
      localStorage.setItem("AccessToken", res.data.AccessToken);
      localStorage.setItem("RefreshToken", res.data.RefreshToken);
      localStorage.setItem("UserID", res.data.UserID)
      localStorage.setItem("Username", Data.Username.toLowerCase())

console.log(localStorage.getItem("UserInfo"))
      console.log(localStorage)
      // console.log(sessionStorage.getItem("AuthenticationState"))
      // console.log(sessionStorage.getItem("Username"))

      setState({
        Username: "",  
        Password: "",
        })
        history.push({
            pathname: '/ReservationHomePage' //Pass to 
          });

          success(Data.Username);
       }).catch(err => {
        console.log(err.response.status);
        console.log(err.response)
           var msg = err.response.data
         warning(msg);
         console.log(err)
    })
  }
  else if(Data.Username=='' ){
    warning1();
  }
  else if(Data.Password=='' ){
    warning2();
  } 
  };


  const createHandler = (e) => {
   
   
    e.preventDefault();  
        history.push({
            pathname: '/CreateUserAccount'
          });
  };

  const GuestHandler = (e) => {
    success('Guest');
    warning3();
    e.preventDefault();  
        history.push({
            pathname: '/ReservationHomePage'
          });
  };
  const Flighthome = (e) => {
    history.push({
      pathname: '/'
    });
   };
  


  const success = (e) => {
    message.success('Welcome To Fly Nawwwwww '.concat(e));
  }




  const warning = (msg) => {
    message.warning(msg);
  }

  const warning1 = () => {
    message.warning('"Username" Must be Filled!');
  };
  const warning2 = () => {
    message.warning(' "Password" Must be Filled!');
  };

  const warning3 = () => {
    
    message.warning('Remember You Must Log In to Manage Flights Or Edit Profile!');
  };
  
  




    return (
      <>
<div class="box d2">

  
  
<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css"/>
<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css"/>
<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css"/>
<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css"/>
<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css"/>
<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css"/>
<link rel="stylesheet" type="text/css" href="css/util.css"/>
<link rel="stylesheet" type="text/css" href="css/main.css"/>

  <div class="limiter">
  <div class="container-login100" >
    <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
      <form class="login100-form validate-form">
        <span class="login100-form-title p-b-49">
         User Log In 
        </span>

                 





                  




                 



        <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                  <div class="grid-container-EditUser">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
<span >
         Username
        </span>
                  </div>
          <input class="input100"  name="Username" placeholder="Type your Username" value={Data.Username} onChange={(e) => changeHander(e)}></input>
                      <span class="focus-input100" ></span>
        </div>

        <div class="wrap-input100 validate-input m-b-23" data-validate="Password is required">

                  <div class="grid-container-EditUser"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
<path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>
<span >
         Password
        </span>
                  </div>
          <input class="input100" type="password" name="Password" placeholder="Type your Password" value={Data.Password} onChange={(e) => changeHander(e)}></input>
          <span class="focus-input100" ></span>
        </div>
        
        
                  <a  class="button-60 center20" role="button" onClick={(e) => loginHandler(e)}>Log In</a>
                  <div class="grid-container-buttonCreate">
                  <a class="button-50 center21" role="button" onClick={(e) => createHandler(e)}>Create Account</a>
                  <a  class="button-50 center21" role="button" onClick={(e) => GuestHandler(e)}>Continue as Guest</a>
                 </div>
                 <a  class="button-60 center20" role="button"  onClick={() => Flighthome()}>Flight Home</a>
        <div class="txt1 text-center p-t-54 p-b-20">
          
        </div>

        

        <div class="flex-col-c p-t-155">
          

          
        </div>
      </form>
    </div>
  </div>
</div>


<div id="dropDownSelect1"></div>
<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<script src="vendor/animsition/js/animsition.min.js"></script>
<script src="vendor/bootstrap/js/popper.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="vendor/select2/select2.min.js"></script>
<script src="vendor/daterangepicker/moment.min.js"></script>
<script src="vendor/daterangepicker/daterangepicker.js"></script>
<script src="vendor/countdowntime/countdowntime.js"></script>
<script src="js/main.js"></script>
</div>
      
        
      </>
      
    );
    
    

  

        
};
export default UserLogin;