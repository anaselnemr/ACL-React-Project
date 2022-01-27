import { Component, useState,useEffect, useReducer } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'; 
import '../css/App.css';
import Cookies from "js-cookies";



import moment from "moment";
import {
  Form,
  Input,
  Button,
  message,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';


const LoginPage = () => {

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

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': 'JWT fefege...'
    // }    

   // prevent reloading the page
    axios.post('http://localhost:8000/LoginPage', criteria, {
    // headers: headers
    })
    .then(res => {
      console.log(res.status);
      localStorage.clear();
      localStorage.setItem("AuthenticationState", "AdminAuthenticated")
      localStorage.setItem("AccessToken", res.data.AccessToken);
      localStorage.setItem("RefreshToken", res.data.RefreshToken);
      localStorage.setItem("UserID", res.data.UserID)
      console.log(localStorage)
      setState({
        Username: "",  
        Password: "",
        })
        // sessionStorage.setItem("AuthenticationState", "AdminAuthenticated");
        // sessionStorage.setItem("Username", criteria.Username);
        // console.log(sessionStorage.getItem("AuthenticationState"))
        // console.log(sessionStorage.getItem("Username"))
                
                //This authentication key will expire in 1 hour.
       // sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));
        history.push({
            pathname: '/homepage'
          });
       }).catch(err => {
        console.log(err.response.status);
           var msg = err.response.data
         warning(msg);
         console.log(err)
    })

  };
  
  const warning = (msg) => {
    message.warning(msg);
  }
  const Flighthome = (e) => {
    history.push({
      pathname: '/'
    });
   };



    return (

      <>
     

        <div class="box d2">

  
  


  <div class="limiter">
  <div class="container-login100" >
    <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
      <form class="login100-form validate-form">
        <span class="login100-form-title p-b-49">
         Admin Log In 
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
  
                 
                  <a  class="button-60 center20" role="button"  onClick={() => Flighthome()}>Flight Home</a>

                  <div class="grid-container-buttonCreate">
                 
                 </div>
        <div class="txt1 text-center p-t-54 p-b-20">
          
        </div>

        

        <div class="flex-col-c p-t-155">
          

          
        </div>
      </form>
    </div>
  </div>
</div>


</div>





      </>
      
    );
    

  

        
};
export default LoginPage;