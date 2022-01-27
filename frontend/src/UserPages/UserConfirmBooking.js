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
import "../css/App.css";
import StripeCheckout from "react-stripe-checkout";
import {findDOMNode} from 'react-dom'



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


/*--------------------
CodePen Tile Preview
--------------------*/

});
   

const UserConfirmBooking = () => {
  // console.log(sessionStorage.getItem('AuthenticationState'));
  // console.log(sessionStorage.getItem('Username'));
 

  if (localStorage.getItem('AuthenticationState') !== "UserAuthenticated") {
    window.open("UserLogin", "_self");
 }
//   if (sessionStorage.getItem('AuthenticationState') !== "UserAuthenticated") {
//     Login();
//  }

  
 const history = useHistory();
  const [componentSize, setComponentSize] = useState('default');

  const Flight1 = history.location.state?.flight1;
  const Flight2 = history.location.state?.flight2;
  const Adults = history.location.state?.Adults;
  const Children = history.location.state?.Children;
  const Passengers = history.location.state?.Passengers;

  // const User = localStorage.getItem("UserInfo")
  const Update = history.location.state?.Update;
  const reserv = history.location.state?.reserv;
  const CabinFrom = history.location.state?.CabinFrom;
  const CabinTo = history.location.state?.CabinTo;
  const SeatsTo = history.location.state?.SeatsTo;
  const SeatsFrom = history.location.state?.SeatsFrom;
  const SeatsToID = history.location.state?.SeatsToID;
  const SeatsFromID = history.location.state?.SeatsFromID;
  const User = localStorage.getItem("UserInfo")


  const [Data, setState] = useState({
    Username: localStorage.getItem('Username'),
    Email: localStorage.getItem('Email'),

    Flight_IDFrom: Flight1._id,
    Flight_NoFrom: Flight1.Flight_No,
    Flight_DateFrom: Flight1.Flight_Date,
    Flight_From: Flight1.From,
    FromPrice: Flight1.Price,
    CabinFrom: history.location.state?.CabinFrom,
    SeatsChoosenFrom: "",
    SeatsChoosenFromID: "",


    Flight_IDTo: Flight2._id,
    Flight_NoTo: Flight2.Flight_No,
    Flight_DateTo: Flight2.Flight_Date,
    Flight_To: Flight1.To,
    ToPrice: Flight2.Price,
    CabinTo: history.location.state?.CabinTo,
    SeatsChoosenTo: "",
    SeatsChoosenToID: "",


    FirstName: localStorage.getItem("FirstName"),
    LastName: localStorage.getItem("LastName"),
    PassPort_No: localStorage.getItem("PassPort_No"),
    Username: localStorage.getItem("Username"),
    Email: localStorage.getItem("Email"),
    ReservationOwner: true,
    isChild: false,
    Adults: Adults,
    Children: Children,

    TotalPrice: +(Math.round(((Flight1.Price * Adults) + (Flight1.Price * Children * 0.8) + (Flight2.Price * Adults) + (Flight2.Price * Children * 0.8) )* 100) / 100).toFixed(2),
  });
 
  const [Data2, setState2] = useState({
    Username: sessionStorage.getItem('Username'),
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
  console.log(Data);
 


  useEffect(() => {
   
  //   console.log(Data['Username'])

  //   const criteria = {};
  //   Object.keys(Data).forEach(key => {
  //  if (key==="Username") {
  //       criteria[key] = Data[key];
  //     }
  //   });

  //   console.log(criteria)
  //   Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
  //   Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
  //   axios.post('http://localhost:8000/GetUserInfo', criteria, {withCredentials: true})
  //   .then(response => {
  //     localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
  //     document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //     document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //     console.log(response.data[0].Email);
  //     setState( prevData => {
  //       return {...prevData ,['Email']: response.data[0].Email}, 
  //           ['FirstName']: response.data[0].FirstName});
  //     // console.log(Data.Email);
  //     //  window.location.reload(false);
  //     //  form.resetFields();
  //     //   success(); // data succ added less go
  //     }).catch(error => {
  //       if(error.response.status==403){
  //         history.push({
  //           pathname: '/LoginPage'
  //         });
  //       }
  //       console.log(error);
  //   })


  // },[]);


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
              // state: {
              //   flight1: isdepart,
              //   flight2: isreturn,
              //   CabinFrom: Data.CabinDepart,
              //   CabinTo: Data.CabinDepart,
              //   Adults: Data.Adults,
              //   Children: Data.Children,
              // }
              });
               
          }    
      });
  };

   
  
  const BookFlightHandler = () => {
       // prevent reloading the page

    var Refund = Data.TotalPrice;
    var mail = "anasnemr25@gmail.com";
    var reservation2= Data
    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.post("http://localhost:8000/sendmailconfirm", {data: {var1:Refund,var2:mail,var3:reservation2}}, {withCredentials: true}).then(response => {
       localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
      // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }).catch(error => {
      if(error.response.status==403){
        history.push({
          pathname: '/UserLogin'
        });
      }
})




      console.log(Data)
      console.log(Passengers)


    for (let i = 0; i < Data.Adults; i++) {   
      var criteria1 = {}; 

      if(i===0){
        criteria1 = Data
        console.log("testtt")
      }
      else{
      Object.keys(Data).forEach(key => {
          if (key == "FirstName") {
            criteria1[key] = Passengers[i].FirstName
          }
         else if (key == "LastName") {
            criteria1[key] = Passengers[i].LastName
          }
          else if (key == "PassPort_No") {
            criteria1[key] = Passengers[i].PassPort_No
          }
          else if (key == "ReservationOwner") {
            criteria1[key] = false
          }
          else if (key == "isChild") {
            criteria1[key] = false
          }
          else
            criteria1[key] = Data[key];
      });

    }

      console.log(criteria1)

// if(!Update){
   
    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/createnewReservation', criteria1, {withCredentials: true})
    .then(response => {
      localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
      document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // console.log(Data);
      // success();
      //  window.location.reload(false);
      //  form.resetFields();
      //   success(); // data succ added less go
      }).catch(error => {
        if(error.response.status==403){
          history.push({
            pathname: '/LoginPage'
          });
        }
        console.log("asdfasfsafdsafsadf")
        console.log(error);
    })
  }




  for (let i = Data.Adults; i < Data.Adults + Data.Children; i++) {   
    var criteria1 = {}; 


    Object.keys(Data).forEach(key => {
        if (key == "FirstName") {
          criteria1[key] = Passengers[i].FirstName
        }
       else if (key == "LastName") {
          criteria1[key] = Passengers[i].LastName
        }
        else if (key == "PassPort_No") {
          criteria1[key] = Passengers[i].PassPort_No
        }
        else if (key == "ReservationOwner") {
          criteria1[key] = false
        }
        else if (key == "isChild") {
          criteria1[key] = true
        }
        else if(key == "FromPrice"){
          criteria1[key] = +(Math.round((Flight1.Price * 0.8) * 100) / 100).toFixed(2)
        }
        else if(key == "ToPrice") {
          criteria1[key] = +(Math.round((Flight2.Price * 0.8) * 100) / 100).toFixed(2)
        }
        else
          criteria1[key] = Data[key];
    });


    console.log(criteria1)

  Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
  Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
  axios.post('http://localhost:8000/createnewReservation', criteria1, {withCredentials: true})
  .then(response => {
    localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
    document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // console.log(Data);
    // success();
    //  window.location.reload(false);
    //  form.resetFields();
    //   success(); // data succ added less go
    }).catch(error => {
      if(error.response.status==403){
        history.push({
          pathname: '/LoginPage'
        });
      }
      console.log("asdfasfsafdsafsadf")
      console.log(error);
  })


}


success();



    // setState({
    //   Flight_No: "",
    //   From: "",  
    //   To: "",
    //   Flight_Date: "", // Data type date
    //   Terminal: "",
    //   Flight_Duration: "",
    //   Economy_Seats: "",
    //   Business_Seats: "",
    //   First_Seats: "",
    //   Economy_Baggage: "",
    //   Business_Baggage: "",
    //   First_Baggage: "",
    //   Economy_Price: "",
    //   Business_Price: "",s
    //   First_Price: "",
    //   Available_Seats: "",
    //   })
   
  // };

  };
  const [product, setProduct] = useState({
    name: "Flights",
    price: Data.TotalPrice,
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

return (
  <div className="App">
  <header className="App-header">
    <StripeCheckout
      stripeKey="pk_test_51KBY7kLBghzABh1I2vU4wbpZdHYNnKbYkKj3oQZp8FJAbeRIjZblvVPFBdcNxAjSRlFU1ESIJrxrSMUWGdC4rnFV00fyx9hoAS"
      token={makePayment}
      name="Reserve Flights"
      amount={ Data.TotalPrice*100}
      billingAddress
      allowRememberMe = {true}
      bitcoin = {true}
    >
     <button class="button-79" role="button" smooth={true}>Pay {Data.TotalPrice} $</button>
    </StripeCheckout>

  </header>
</div>
);




  






};
export default UserConfirmBooking;

