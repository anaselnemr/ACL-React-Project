import { Component, useState, useEffect, useReducer } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/EditUser.css';
import '../css/EditUser1.css';
import '../css/swal.css';
import Swal from 'sweetalert2'
import Cookies from "js-cookies";


import moment from "moment";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  message,
  Mentions
} from 'antd';





const CreateUserAccount = () => {

  const history = useHistory();

  const [componentSize, setComponentSize] = useState('default');
  // const [form] = Form.useForm();

  const [Data, setState] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Date_of_Birth: "", // Data type date
    PassPort_No: "",
    Username: "",
    Password: "",
  });


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const changeHander = (e) => {
    setState(prevData => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  };


  const submitHandler = (e) => {
    e.preventDefault();    // prevent reloading the page
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (Data.Date_of_Birth !== null && Data.FirstName !== '' && Data.LastName !== '' && Data.Email !== '' && Data.Username !== '' && Data.Password !== '' && Data.PassPort_No !== '') {
      if (Data.FirstName.trim().includes(" ")) { // means space name of contian space between username
        warning14();
      }
      else if (Data.LastName.trim().includes(" ")) { // means space name of contian space between username
        warning15();
      }
      else if (Data.Username.trim().includes(" ")) { // means space name of contian space between username
        warning13();
      }

      else { // will post normally
        axios.post('http://localhost:8000/createuseraccount', Data)
          .then(response => {
            console.log(response.status);
            success();
            setState({
              FirstName: "",
              LastName: "",
              Email: "",
              Date_of_Birth: "", // Data type date
              PassPort_No: "",
              Username: "",
              Password: "",
            })
            // data succ added less go

          }).catch(error => {
            console.log("errorrr")
            if (error.response.status == 401) {
              var msg = error.response.data
              warning9(msg);
            }
            else if (error.response.status == 403) {
              var msg = error.response.data
              warning9(msg);
            }


            else
              if (!Data.Email.match(mailformat)) {
                warning11()
              }

            //console.log(error);
          })
      }

    }




    else if (Data.FirstName == "") {
      warning4();
    }
    else if (Data.LastName == "") {
      warning5();
    }
    else if (Data.Date_of_Birth == '') {
      warning7();
    }
    else if (Data.PassPort_No == '') {
      warning12();
    }
    else if (Data.Email == '') {
      warning6();
    }
    else if (!Data.Email.match(mailformat)) {
      warning11()
    }
    else if (Data.Username == '') {
      warning8();
    }
    else if (Data.Password == '') {
      warning10();
    }

    else {
      warning();
    }

  };

  const Flighthome = (e) => {
    history.push({
      pathname: '/'
    });
   };



  const success = () => {
    Swal.fire(
      {
        title: 'Account Successfully Created!',
        text: 'continue to Log In',
        icon: 'success',
        confirmButtonText: 'Log In',
        confirmButtonColor: '#ff8300',
        // iconColor:'#ff8300' ,
      })
      .then((res) => {
        if (res.isConfirmed) {
          console.log('confirm');
          LoginHandler();



        }
      });
  };

  const warning = () => {
    message.warning('Fill All Fields Please!');
  };
  const warning13 = () => {
    message.warning('Remove Spaces From "Username"!');
  };
  const warning14 = () => {
    message.warning('Remove Spaces From "Fisrt Name"!');
  };
  const warning15 = () => {
    message.warning('Remove Spaces From "Last Name"!');
  };
  const warning11 = () => {
    message.warning('Invalid Email!');
  };

  const warning4 = () => {
    message.warning(' "First Name" Must be Filled!');
  };
  const warning5 = () => {
    message.warning(' "Last Name" Must be Filled!');
  };
  const warning6 = () => {
    message.warning(' "Email" Must be Filled!');
  };
  const warning7 = () => {
    message.warning(' "Date Of Birth" Must be Filled!');
  };
  const warning8 = () => {
    message.warning('"Username" Must be Filled!');
  };
  const warning10 = () => {
    message.warning('"Password" Must be Filled!');
  };
  const warning12 = () => {
    message.warning('"Passport No" Must be Filled!');
  };
  const warning9 = (msg) => {
    message.warning(msg);
  };

  const LoginHandler = event => {
    history.push({
      pathname: '/UserLogin',

    });
  };



  //  Swal.fire({
  //   title: 'Error!',
  //   text: 'Do you want to continue',
  //   icon: 'error',
  //   confirmButtonText: 'Cool'
  // })






  var now = new Date();
  now.setFullYear(now.getFullYear() - 18);
  var now2 = moment().subtract(18, 'years')

  return (
    <>





      <div class="box d2">







        <div class="limiter">
          <div class="container-login100" >
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-49">
                  User Create Account
                </span>

                <div class="grid-container">

                <div class="wrap-input100 validate-input m-b-23" data-validate="FirstName is reauired">
                  <div class="grid-container-EditUser">

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <span >
                      First Name
                    </span>
                  </div >

                  <input class="input100" name="FirstName" placeholder="Type your FirstName" value={Data.FirstName} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>





                <div class="wrap-input100 validate-input m-b-23" data-validate="LastName is reauired">
                  <div class="grid-container-EditUser">

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>

                    <span >
                      Last Name
                    </span>
                  </div >
                  <input class="input100" name="LastName" placeholder="Type your LastName" value={Data.LastName} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>


                </div>


                <div class="wrap-input100 validate-input m-b-23" data-validate="date of Birth is reauired">
                  <div class="grid-container-EditUser">

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar2-week-fill" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                    </svg>
                    <span >
                      Date Of Birth
                    </span>
                  </div >

                  <DatePicker 
                  style={{ 
                    borderTopColor:"transparent",
                    borderBottomColor:"transparent",
                    borderLeftColor:"transparent",
                    borderRightColor:"transparent",
                    // forcedColorAdjust:"red",
                    // stopColor: "#ccc",
                    // stopColor: "rgb(255, 255, 255)",
                minWidth:"600px",
                imageWidth:"250px",
            marginTop: "25px", 
            backgroundColor:"transparent",
            Color:"white",    
          }}type="date" format="DD-MM-YYYY"
                    defaultPickerValue={now2} disabledDate={d => d.isAfter(now)} value={Data.Date_of_Birth} name="Date_of_Birth" onChange={(date) => setState(prevData => {
                      return { ...prevData, Date_of_Birth: date }
                    })
                    } />
                  <span class="focus-input100" ></span>
                </div>


                <div class="grid-container">


                <div class="wrap-input100 validate-input m-b-23" data-validate="Passport Number is required">
                  <div class="grid-container-EditUser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                    </svg>
                    <span >
                      Passport No
                    </span>
                  </div >
                  <input class="input100" name="PassPort_No" placeholder="Type your Passport Number" value={Data.PassPort_No} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>




                <div class="wrap-input100 validate-input m-b-23" data-validate="Email is required">
                  <div class="grid-container-EditUser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                    <span >
                      Email
                    </span>
                  </div>
                  <input class="input100" name="Email" placeholder="Type your Email" value={Data.Email} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>


                </div>

                <div class="grid-container">

                <div class="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                  <div class="grid-container-EditUser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <span >
                      Username
                    </span>
                  </div>
                  <input class="input100" name="Username" placeholder="Type your Username" value={Data.Username} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>

                <div class="wrap-input100 validate-input m-b-23" data-validate="Password is required">

                  <div class="grid-container-EditUser"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                    <span >
                      Password
                    </span>
                  </div>
                  <input class="input100" type="password" name="Password" placeholder="Type your Password" value={Data.Password} onChange={(e) => changeHander(e)}></input>
                  <span class="focus-input100" ></span>
                </div>



                </div>


              
              
                <a class="button-60 center20" role="button" onClick={(e) => submitHandler(e)}>Create Account</a>
               
                <div class="grid-container">
                <a class="button-60 center20" role="button" onClick={() => LoginHandler()}>Log In</a>
                <a  class="button-60 center20" role="button"  onClick={() => Flighthome()}>Flight Home</a>


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

export default CreateUserAccount;
