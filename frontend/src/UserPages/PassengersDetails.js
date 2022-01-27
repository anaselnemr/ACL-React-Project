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
    DatePicker,
} from 'antd';





const PassengersDetails = () => {

    const history = useHistory();

    const [componentSize, setComponentSize] = useState('default');
    // const [form] = Form.useForm();

    const Flight1 = history.location.state?.flight1;
    const Flight2 = history.location.state?.flight2;
    const CabinFrom = history.location.state?.CabinFrom;
    const CabinTo = history.location.state?.CabinFrom;
    const Adults = history.location.state?.Adults;
    const Children = history.location.state?.Children;
    var Passengers = history.location.state?.Passengers;

    const [Data, setState] = useState({
        FirstName: [],
        LastName: [],
        PassPort_No: [],
    });

    // const [value, setValue] = useState();

    // var Array = ["AAAAA", "aaaa", "aaaa", "aaaas"]
    // Array.apply(null, Array(5)).map(function () {})

    // useEffect(() => {

    //     setValue(Passengers)

    // })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const submitHandler = (e) => {
       console.log(Passengers)
       history.push({
        pathname: '/UserConfirmBooking',
        state: {
          flight1: Flight1,
          flight2: Flight2,
          CabinFrom: CabinFrom,
          CabinTo: CabinTo,
          Adults: Adults,
          Children: Children,
          Passengers: Passengers,
        }
      });




    
        }
    
    


    const changeHander = (e,Pass) => {

        Passengers[Pass.Passenger_NO][e.target.name] = e.target.value;


                console.log(Pass)

    };




    return (
        <>





            <div class="box d2">







                <div class="limiter">
                    <div class="container-login100" >
                        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <form class="login100-form validate-form">
                                <span class="login100-form-title p-b-49">
                                    Other Passengers Details
                                </span>


                                {Passengers.map(Pass =>
                                    <>
                                        <h12>Passenger {Pass.Passenger_NO}</h12>

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

                                                <input class="input100" name="FirstName" placeholder="Type your FirstName"  onChange={(e) => changeHander(e,Pass)}></input>
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
                                                <input class="input100" name="LastName" placeholder="Type your LastName" onChange={(e) => changeHander(e,Pass)}></input>
                                                <span class="focus-input100" ></span>
                                            </div>


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
                                                <input class="input100" name="PassPort_No" placeholder="Type your Passport Number"  onChange={(e) => changeHander(e,Pass)}></input>
                                                <span class="focus-input100" ></span>
                                            </div>



{/* 
                                            <div class="wrap-input100 validate-input m-b-23" data-validate="Email is required">
                                                <div class="grid-container-EditUser">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                    </svg>
                                                    <span >
                                                        Email
                                                    </span>
                                                </div>
                                                <input class="input100" name="Email" placeholder="Type your Email" value={Pass.Email} onChange={(e) => changeHander(e)}></input>
                                                <span class="focus-input100" ></span>
                                            </div> */}

                                        </div>

                                        <br></br>

                                    </>

                                )}
                             <a class="button-60 center20" role="button" onClick={(e) => submitHandler(e)}>Continue to Payment</a>


                                {/* <a class="button-60 center20" role="button" onClick={(e) => submitHandler(e)}>Create Account</a>
                  <a  class="button-60 center20" role="button" onClick={() => LoginHandler()}>Log In</a> */}

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

export default PassengersDetails;
