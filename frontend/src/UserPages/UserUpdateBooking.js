import { Component, useState,useEffect, useReducer } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'; 
import '../css/popup.css';
import '../css/swal.css';
import Swal from 'sweetalert2'
import Cookies from "js-cookies";
import '../css/main.css';
import '../css/guest.css';
import '../css/creditCard.css';
import $ from "jquery"; 
import {findDOMNode} from 'react-dom'

import "../css/App.css";
import StripeCheckout from "react-stripe-checkout";



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
  message,
  Switch,
} from 'antd';

//$('body').on('click', '.qr', function(){//delegated 


$(document).ready(function() { // must reload at least once 

  $('.input-cart-number').on('keyup change', function(){ //jqeury worked finally yaaaaaay
  var $t = $(this);
  
  
  
  var card_number = '';
  $('.input-cart-number').each(function(){
    card_number += $(this).val() + ' ';
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  })
  
  $('.credit-card-box .number').html(card_number);
});

$('#card-holder').on('keyup change', function(){
  var $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-holder').on('keyup change', function(){
  var $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(function(){
  var m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  var m = (m < 10) ? '0' + m : m;
  var y = $('#card-expiration-year').val().substr(2,2);
  $('.card-expiration-date div').html(m + '/' + y);
})

$('#card-ccv').on('focus', function(){
  $('.credit-card-box').addClass('hover');
}).on('blur', function(){
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function(){
  $('.ccv div').html($(this).val());
});


});
   

const UserUpdateBooking = () => {

  
 const history = useHistory();
  const [componentSize, setComponentSize] = useState('default');

  const Flight1 = history.location.state?.flight1;
  const Flight2 = history.location.state?.flight2;
  const Adults = history.location.state?.Adults;
  const Children = history.location.state?.Children;
  const reserv = history.location.state?.reserv;
  const CabinFrom = history.location.state?.CabinFrom;
  const CabinTo = history.location.state?.CabinTo;
  const SeatsTo = history.location.state?.SeatsTo;
  const SeatsFrom = history.location.state?.SeatsFrom;
  const SeatsToID = history.location.state?.SeatsToID;
  const SeatsFromID = history.location.state?.SeatsFromID;
console.log(CabinFrom)

 
  const [Data, setState] = useState({
    Username: localStorage.getItem('Username'),
    Email: "",

    Flight_IDFrom: Flight1._id,
    Flight_NoFrom: Flight1.Flight_No,
    Flight_DateFrom: Flight1.Flight_Date,
    Flight_From: Flight1.From,
    CabinFrom:CabinFrom,
    SeatsChoosenFrom: SeatsFrom,
    SeatsChoosenFromID: SeatsFromID,


    Flight_IDTo: Flight2._id,
    Flight_NoTo: Flight2.Flight_No,
    Flight_DateTo: Flight2.Flight_Date,
    Flight_To: Flight1.To,
    CabinTo:CabinTo,
    SeatsChoosenTo:  SeatsTo,
    SeatsChoosenToID: SeatsToID,

    Adults: Adults,
    Children: Children,

    TotalPrice: (Flight1[CabinFrom + "_Price" ]* Adults) + (Flight1[CabinFrom + "_Price" ]* Children * 0.8) + (Flight2[CabinTo + "_Price"]* Adults) + (Flight2[CabinTo + "_Price" ]* Children * 0.8),
  });

var payprice ;
payprice =(Data.TotalPrice - reserv.TotalPrice)/(reserv.Adults + reserv.Children)



  useEffect(() => {
   
    console.log(Data['Username'])

    const criteria = {};
    Object.keys(Data).forEach(key => {
   if (key==="Username") {
        criteria[key] = Data[key];
      }
    });

    console.log(criteria)
    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/GetUserInfo', criteria, {withCredentials: true})
    .then(response => {
        localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log(response.data[0].Email);
      setState( prevData => {
        return {...prevData ,['Email']: response.data[0].Email}});
      // console.log(Data.Email);
      //  window.location.reload(false);
      //  form.resetFields();
      //   success(); // data succ added less go
      }).catch(error => {
        if(error.response.status==403){
            history.push({
              pathname: '/UserLogin'
            });}
        console.log(error);
    })


  },[]);

  const success = () => {
    Swal.fire(
      {
      title: 'Flight Booked Successfully!',
      // text: 'continue to Log In',
      icon: 'success',
      confirmButtonText: 'Manage Reservation!',
      confirmButtonColor: '#ff8300',
      // iconColor:'#ff8300' ,
    })
      .then((res) => {
           if(res.isConfirmed){
              console.log('confirm');
              history.push({
                pathname: '/UserManageBooking',
              });
               
          }    
      });
  };

   
  
  const BookFlightHandler = () => {
      // prevent reloading the page
    console.log(Flight1)
    console.log(Data)
    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.put('http://localhost:8000/updateeditflight', {data: {var1:reserv._id, var2:Data}}, {withCredentials: true})
    .then(response => {
        localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        history.push('/UserManageBooking')
      success(); // data succ added less go
       }).catch(error => {
        if(error.response.status==403){
            history.push({
              pathname: '/UserLogin'
            });}
      console.log(error);
    })
  };



  const [product, setProduct] = useState({
    name: "Updating Flights",
    price: payprice,
    productBy: "Fly Nawww"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch('http://localhost:8000/payment' ,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        BookFlightHandler();
        // console.log("RESPONSE ", response);
        // const { status } = response;
        // console.log("STATUS ", status);
        history.push({
          pathname: '/UserManageBooking'
        });

      })
      .catch(error => console.log(error));
  };

  if(payprice>=0){
    return (
      <div className="App">
      <header className="App-header">
        <StripeCheckout
          stripeKey="pk_test_51KBY7kLBghzABh1I2vU4wbpZdHYNnKbYkKj3oQZp8FJAbeRIjZblvVPFBdcNxAjSRlFU1ESIJrxrSMUWGdC4rnFV00fyx9hoAS"
          token={makePayment}
          name="Reserve Flights"
          amount={payprice*100}
          billingAddress
          allowRememberMe = {true}
          bitcoin = {true}
        >
           <button class="button-79" role="button" smooth={true}>Pay {payprice} $</button>
        </StripeCheckout>
    
      </header>
    </div>
    );
    }
    else{
    
    return (
      <div className="App">
      <header className="App-header">
        <StripeCheckout
          stripeKey="pk_test_51KBY7kLBghzABh1I2vU4wbpZdHYNnKbYkKj3oQZp8FJAbeRIjZblvVPFBdcNxAjSRlFU1ESIJrxrSMUWGdC4rnFV00fyx9hoAS"
          token={makePayment}
          name="Reserve Flights"
          amount={0}
          billingAddress
          allowRememberMe = {true}
          bitcoin = {true}
        >
      
   <button class="button-79" role="button" smooth={true}>Pay {0} $</button>
          <h1> You will be refunded {payprice} $</h1>
        </StripeCheckout>
    
      </header>
    </div>
    );
    
    }






};
export default UserUpdateBooking;
