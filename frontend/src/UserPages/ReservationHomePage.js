import { Component, useState, useEffect, useReducer } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-scroll'
import "./styles.css";
import Swal from 'sweetalert2'
import SeatMap from './SeatMapComponent.js';
import 'antd/dist/antd.css';
import '../css/popup.css';


import '../css/guest.css';
import '../css/SelectSeat.scss';
import '../css/header.css';


import '../css/newSearch.css';


import swal from 'sweetalert2'
import '../css/BoardingPass.scss';
import '../css/pass.scss';
import '../css/headerfinal.css';
import '../css/main.css';

import '../css/FooterFinal.css';
import Cookies from "js-cookies";


import '../css/FinalPopUp.css';
import '../css/ButtonReservation.css';

import '../css/NewBoardingPass.css';

import '../css/Adds.css';
import '../css/AdsFinal.css';

import PopUp from './PopUp.js';

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
import $ from "jquery";
import { findDOMNode } from 'react-dom'
import e from 'cors';


import { Modal } from 'antd';



var header = $('body');



var backgrounds = new Array(
  'url(https://i.ibb.co/80T0KvP/riayd3.jpg)'
  , 'url(https://i.ibb.co/kGqzWMY/Aerial-view-of-Berlin-32881394137.jpg)'
  , 'url(https://i.ibb.co/XYDcdfX/a33.jpg)'
  , 'url(https://i.ibb.co/9GwzNW8/swiss.jpg)'
);

var texts = new Array(
  'Riyadh To Cairo'
  , 'Berlin To Iceland'
  , 'Amsterdam To Jeddah'
  , 'Switzerland To Moscow'
);

var details = new Array(
  'Daily direct flights starting from 199.99$'
  , '3 direct weekly flights starting from 329.99$'
  , 'For your perfect Amsterdam holiday, trust Fly Nawww! Reserve your Flight today starting from 329.99$'
  , '20% discount for passengers with reduced mobility'
);

var current = 0;


function nextBackground() {

  current++;
  current = current % backgrounds.length;
  header.css('background-image', backgrounds[current]);

  $('.textNext a').text(texts[current]);
  $('.textNext2 a').text(details[current]);
}


setInterval(nextBackground, 8000);

header.css('background-image', backgrounds[0]);



var marginleft = -10;
function MovePlane() {
  // console.log("heeeere")
  if (marginleft < 80) {
    marginleft = marginleft + 5;
    $(".plane2").css("margin-left", marginleft + "px");
  }
  else
    marginleft = -10;


}

setInterval(MovePlane, 80);

// Change background image of a div by clicking on the button
var ToggleBetween = 0;
$('body').on('click', '.learn-more', function () {//delegated

  if (ToggleBetween % 2 == 0) {
    console.log("iff")
    $('.form-group-hidden').toggleClass('form-group-hidden form-group');
    $('.submit-btn2-hidden-under').toggleClass('submit-btn2-hidden-under submit-btn2-visable-under');
    $(".submit-btn2").css("display", "none");
    $(".booking-form2").css("margin-left", "7%");
    // $(".form-header").css("margin-left", "-400px");
    $(".arrow").css("display", "none");

    $('.arrowDown1').toggleClass('arrowDown1 arrowDown2');
    // $(".arrowDown").css("display", "inline");

  }
  else {
    console.log("elseee")
    $('.form-group').toggleClass('form-group form-group-hidden');
    $('.submit-btn2-visable-under').toggleClass('submit-btn2-visable-under submit-btn2-hidden-under');
    $(".submit-btn2").css("display", "initial");
    $(".booking-form2").css("margin-left", "40px");
    $(".form-header").css("margin-left", "0px");
    $(".arrow").css("display", "inline");
    // $(".arrowDown").css("display", "none");
    $('.arrowDown2').toggleClass('arrowDown2 arrowDown1');


  }
  ToggleBetween++;
});

$('body').on('click', '.submit-btn2', function () {//delegated
        console.log("heeeeeeeeere99")
  // $(".box2").css("display", "grid");
  // $('.box2').attr('style', 'display: grid !important');
  $('.box2').toggleClass('box2 box2-New');
  // $(".box").css("display", "grid");
});

$('body').on('click', '.submit-btn2-visable-under', function () {//delegated
  $('.box2').toggleClass('box2 box2-New');
});


$('body').on('click', '.submit-btn3', function () {//delegated
  $('.submit-btn3').toggleClass('submit-btn3 submit-btn3-rotate');
});
$('body').on('click', '.submit-btn3-rotate', function () {//delegated
  $('.submit-btn3-rotate').toggleClass('submit-btn3-rotate submit-btn3');
});


// $('body').on('click', '.submit-btn2', function () {//delegated
//   $(".box2").css("display", "grid");

// });

// $('body').on('click', '.submit-btn2-visable-under', function () {//delegated
//   $(".box2").css("display", "grid");
// });


$('body').on('click', '.flight-card', function () {//delegated
  // document.getElementById("1").style.backgroundColor= 'red';
  // $(".flight-card").css("background-color", "#74992e"); 
});
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);


// var pre = "";
// var current = "";

// $('body').on('click', '.flight-card', function () {//delegated
//   // $(this).css('background-color', 'red');
//   // console.log($(this)) ;
//   if (pre == "") {
//     pre = $(this).attr('id')
//     current = $(this).attr('id')
//     document.getElementById(current).style.backgroundColor = 'green'
//   }
//   else {
//     pre = current;
//     current = $(this).attr('id')
//     document.getElementById(current).style.backgroundColor = 'green'
//     document.getElementById(pre).style.backgroundColor = '#e8e3e3'
//   }
//   //  document.getElementById("1").style.backgroundColor= 'green';
//   //  document.getElementById("1").style.backgroundColor= 'green';
// });


// var preright = "";
// var currentright = "";

// $('body').on('click', '.flight-card2', function () {//delegated

//   if (preright == "") {
//     currentright = $(this).attr('id')
//     document.getElementById(currentright).style.backgroundColor = 'green'
//     preright = $(this).attr('id')
//   }
//   else {
//     preright = currentright;
//     currentright = $(this).attr('id');
//     document.getElementById(currentright).style.backgroundColor = 'green'
//     document.getElementById(preright).style.backgroundColor = '#e8e3e3'
//   }
//   //  document.getElementById("1").style.backgroundColor= 'green';
//   //  document.getElementById("1").style.backgroundColor= 'green';
// });







// var $headline = $('.headline'),
//     $inner = $('.inner'),
//     $nav = $('nav'),
//     navHeight = 75;

// $(window).scroll(function() {


//   // var scrollTop = $(window).scrollTop(),
//   var scrollTop = ($(window).scrollTop() || $("body").scrollTop()),
//       headlineHeight = $headline.outerHeight() - navHeight,
//       navOffset = $nav.offset().top;

//   $headline.css({
//     'opacity': (1 - scrollTop / headlineHeight)
//   });
//   $inner.children().css({
//     'transform': 'translateY('+ scrollTop * 0.4 +'px)'
//   });
//   if (navOffset > headlineHeight) {
//     $nav.addClass('scrolled');
//   } else {
//     $nav.removeClass('scrolled');
//   }
// });

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
function myFunction2() {
 
  var popup2 = document.getElementById("myPopup2");
  popup2.classList.toggle("show");
 
}
function myFunction3() {
  var  popup3 = document.getElementById("myPopup3");
 // var popup = document.getElementById("myPopup");
  popup3.classList.toggle("show");
}




const ReservationHomePage = () => {
  
  // const warning101 = () => {

  //   message.warning('Remember You Must Log In to Manage Flights Or Edit Profile!');
  // };
  // const GuestLogin = (e) => {
  //   message.success('Welcome To Fly Nawwwwww '.concat(e));
  // }
  // GuestLogin('Guest');
  // warning101();


  //   if (localStorage.getItem('AuthenticationState') !== "UserAuthenticated") {
  //     window.open("UserLogin", "_self");
  //  }
  //   if (localStorage.getItem('AuthenticationState') !== "UserAuthenticated") {
  //     window.open("UserLogin", "_self");
  //  }

  const history = useHistory();
  const [isLoading, setLoading] = useState(true);

  const criteria = {};
  const [Result1, setResult1] = useState();
  const [Result2, setResult2] = useState();
  const [Guard, setGuard] = useState();
  // const [Guard, setGuard] = useState(true);
  criteria["Username"] = localStorage.getItem("Username");
  const criteria1 = {};
  const [Reservations, setallReservation] = useState();
  const [mapped, setmapped] = useState(false);
  // const [Available, setAvailable] = useState();
  const [reserv, setreserv] = useState();
  const [data1, setData] = useState();
  const [bothselected, setbothselected] = useState(true);

  const [flight1, setflight1] = useState();
  const [flight2, setflight2] = useState();

  const [isdepart, setdepart] = useState();
  const [isreturn, setreturn] = useState();

  const [Display1, setDisplay1] = useState([]);
  const [Display2, setDisplay2] = useState([]);

  const [Data99, setState99] = useState({
    Username: "",  
    Password: "",
  }); 


  const [Data, setState] = useState({
    Flight_No: "",
    From: "",
    To: "",
    Flight_Date_Depart: "", // Data type date
    Flight_Date_Return: "", // Data type date
    Terminal: "",
    Flight_Duration: "",
    Seats: "",
    Baggage: "",
    Price: "",
    Adults: "",
    Children: "",
    CabinDepart: "",
    CabinReturn: "",

  });

  const [Data2, setState2] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Date_of_Birth: "", // Data type date
    PassPort_No: "",
    Username: "",
    Password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();    // prevent reloading the page
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (Data2.Date_of_Birth !== null && Data2.FirstName !== '' && Data2.LastName !== '' && Data2.Email !== '' && Data2.Username !== '' && Data2.Password !== '' && Data2.PassPort_No !== '') {
      if (Data2.FirstName.trim().includes(" ")) { // means space name of contian space between username
        warning14();
      }
      else if (Data2.LastName.trim().includes(" ")) { // means space name of contian space between username
        warning15();
      }
      else if (Data2.Username.trim().includes(" ")) { // means space name of contian space between username
        warning13();
      }

      else { // will post normally
        axios.post('http://localhost:8000/createuseraccount', Data2)
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
              if (!Data2.Email.match(mailformat)) {
                warning11()
              }

            //console.log(error);
          })
      }

    }




    else if (Data2.FirstName == "") {
      warning4();
    }
    else if (Data2.LastName == "") {
      warning5();
    }
    else if (Data2.Date_of_Birth == '') {
      warning7();
    }
    else if (Data2.PassPort_No == '') {
      warning12();
    }
    else if (Data2.Email == '') {
      warning6();
    }
    else if (!Data2.Email.match(mailformat)) {
      warning11()
    }
    else if (Data2.Username == '') {
      warning8();
    }
    else if (Data2.Password == '') {
      warning10();
    }

    else {
      warning();
    }

  };

  const warning = (msg) => {
    message.warning(msg);
  }
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




  const [Temp1, setTemp1] = useState({
    Flight_No: "",
    From: "",
    To: "",
    Flight_Date: "", // Data type date
    Terminal: "",
    Flight_Duration: "",

    Seats: "",
    Baggage: "",
    Price: "",
  });

  const [Temp2, setTemp2] = useState({
    Flight_No: "",
    From: "",
    To: "",
    Flight_Date: "", // Data type date
    Terminal: "",
    Flight_Duration: "",

    Seats: "",
    Baggage: "",
    Price: "",
  });

  const changeHander = (e) => {
    // console.log(moment(Data.Flight_Date));

    setState(prevData => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  };

  const changeHander99 = (e) => {
    setState99( prevData => {
     return {...prevData ,[e.target.name]: e.target.value}})
  };

  const departHandler = (flight) => {
    setdepart(flight)
    console.log(flight);

  };

  const returnHandler = (flight) => {
    setreturn(flight)
    console.log(flight);
  };




  function switchText() {
    console.log("wow")
    var obj1 = document.getElementById('left').value;
    var obj2 = document.getElementById('right').value;

    var temp = obj1;
    obj1 = obj2;
    obj2 = temp;


    document.getElementById('left').value = obj1;
    document.getElementById('right').value = obj2;
  }




  useEffect(() => {


    const criteria = {};


    criteria["Username"] = localStorage.getItem("Username").toLowerCase()

    console.log(criteria)
    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/GetUserInfo', criteria, { withCredentials: true })
      .then(response => {

        // var UserInfo = {};

        // Object.keys(response.data[0]).forEach(element => {
        //   if (element !== "Password") 
        //     UserInfo[element] = response.data[0][element]
        // })

        // console.log(UserInfo)

        localStorage.setItem("FirstName", response.data[0].FirstName)
        localStorage.setItem("LastName", response.data[0].LastName)
        localStorage.setItem("PassPort_No", response.data[0].PassPort_No)
        localStorage.setItem("Email", response.data[0].Email)


        localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
        document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';


        // console.log(response.data[0].Email);
        // setState( prevData => {
        //   return {...prevData ,['Email']: response.data[0].Email}});
        // // console.log(Data.Email);
        // //  window.location.reload(false);
        // //  form.resetFields();
        // //   success(); // data succ added less go
      }).catch(error => {
        if (error.response.status == 403) {
          history.push({
            pathname: '/LoginPage'
          });
        }
        console.log(error);
      })


  }, []);



  useEffect(() => {

    if (Result1 && Result2) {

      console.log("Result recieveddd")
      console.log(Result1)
      console.log(Result2)



      var seatcabin1 = Data.CabinDepart + '_Seats';
      var baggagecabin1 = Data.CabinDepart + '_Baggage';
      var pricecabin1 = Data.CabinDepart + '_Price';

      var seatcabin2 = Data.CabinReturn + '_Seats';
      var baggagecabin2 = Data.CabinReturn + '_Baggage';
      var pricecabin2 = Data.CabinReturn + '_Price';
      // console.log(Data.CabinDepart+'_Price');
      var seatsrequested = Data.Adults + Data.Children
      const FilteredResult1 = [];
      const FilteredResult2 = [];
      console.log(Result1);

      // var minFlightDate = Result1[0]['Flight_Date'];
      var minFlightDate = new Date();


      console.log(Result1)
      console.log(Result2)



      Object.keys(Result1).forEach(AllFlights => {
        if (moment(minFlightDate).isAfter(moment(Result1[AllFlights]['Flight_Date']))) {
          return;
        }
        // if(Result1[key].seatavaliable)
        //  console.log(moment(minFlightDate).isSameOrAfter(moment(Result1[AllFlights]['Flight_Date'])))
        if (moment(minFlightDate).isSameOrAfter(moment(Result1[AllFlights]['Flight_Date']))) {
          minFlightDate = moment(Result1[AllFlights]['Flight_Date']);
          // console.log(minFlightDate);
        }
        if (Result1[AllFlights][seatcabin1] < seatsrequested) {
          return;
        }
        else {
          Object.keys(Result1[AllFlights]).forEach(DetailsPerFlight => {
            if (DetailsPerFlight in Temp1) {
              // console.log(DetailsPerFlight)
              // console.log(DetailsPerFlight in Temp1)
              Temp1[DetailsPerFlight] = Result1[AllFlights][DetailsPerFlight];
            }
          });
          Temp1['Seats'] = Result1[AllFlights][seatcabin1];
          Temp1['Baggage'] = Result1[AllFlights][baggagecabin1];
          Temp1['Price'] = Result1[AllFlights][pricecabin1];
          // console.log(Result1[AllFlights]['_id'])
          Temp1['_id'] = Result1[AllFlights]['_id'];
          var newObject = JSON.parse(JSON.stringify(Temp1));
          FilteredResult1[AllFlights] = newObject;
        }

      });
      setDisplay1(FilteredResult1);


      console.log(minFlightDate);

      Object.keys(Result2).forEach(AllFlights => {
        // if(Result1[key].seatavaliable)
        console.log(moment(Result2[AllFlights]['Flight_Date']))
        console.log(Data.Flight_Date_Depart)
        console.log(moment(Result2[AllFlights]['Flight_Date']).isSameOrAfter(Data.Flight_Date_Depart)
          || moment(Result2[AllFlights]['Flight_Date']).isSameOrAfter(minFlightDate))
        if (Result2[AllFlights][seatcabin2] < seatsrequested) {
          return;
        }
        else if (moment(Result2[AllFlights]['Flight_Date']).isSameOrAfter(Data.Flight_Date_Depart)
          || moment(Result2[AllFlights]['Flight_Date']).isSameOrAfter(minFlightDate)) {

          Object.keys(Result2[AllFlights]).forEach(DetailsPerFlight => {
            if (DetailsPerFlight in Temp2) {
              // console.log(DetailsPerFlight)
              // console.log(DetailsPerFlight in Temp1)
              Temp2[DetailsPerFlight] = Result2[AllFlights][DetailsPerFlight];
            }
          });
          // console.log("innnn");
          Temp2['Seats'] = Result2[AllFlights][seatcabin2];
          Temp2['Baggage'] = Result2[AllFlights][baggagecabin2];
          Temp2['Price'] = Result2[AllFlights][pricecabin2];
          Temp2['_id'] = Result2[AllFlights]['_id'];
          var newObject = JSON.parse(JSON.stringify(Temp2));
          console.log(newObject)
          FilteredResult2[AllFlights] = newObject;
          console.log(FilteredResult2);
        }
      });
      setDisplay2(FilteredResult2);

    }

    // if (Result1 && Result2 && Guard === true) {
    //   setTimeout(() => {
    //     setGuard(false);
    //   }, 500);
    // }

    // if (Display1 && Display2) {
    //   setLoading(false);
    //   console.log(Display1);
    //   console.log(Display2);
    // }

    // if (isdepart && isreturn) {
    //   document.getElementById("yourButtonID").style.visibility = "visible";
    //   setbothselected(false);
    //   // document.getElementById("yourButtonID").style.backgroundColor="red";
    // }


  }, [Result1, Result2]);



  useEffect(() => {

    if (isdepart && isreturn) {
      console.log("innnnnn")
      $(".btn-search3").css("display", "inline");
    }

  }, [isdepart, isreturn]);


  useEffect(() => {

    if (Display1 && Display2) {
      $(".box2").css("display", "grid");

    }

  }, [Display1, Display2]);


  const AboutUs = () => { // e will contain the reservation number 
    Swal.fire({
      title: 'Fly Nawww is a Saudi Arabian leading low-cost carrier with a fleet of 34 aircrafts, operating more than 1500 weekly flights to 35 domestic and international destinations.',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  };


  const Vision = () => { // e will contain the reservation number 
    Swal.fire({
      title: 'To act responsibly in developing the market, evolving our employees, supporting our partners and local communities.',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animateanimated animatefadeInDown'
      },
      hideClass: {
        popup: 'animateanimated animatefadeOutUp'
      }
    })
  };
  const Mission = () => { // e will contain the reservation number 
    Swal.fire({
      title: 'To minimize distances, and bring you closer to those you love <3, to what you desire, to what you want to discover!',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animateanimated animatefadeInDown'
      },
      hideClass: {
        popup: 'animateanimated animatefadeOutUp'
      }
    })
  };

  const Values = () => { // e will contain the reservation number 
    Swal.fire({
      title: "Respond to our passenger's needs"+
      " and put the passenger always in focus.",
     
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animateanimated animatefadeInDown'
      },
      hideClass: {
        popup: 'animateanimated animatefadeOutUp'
      }
    })
  };







  // const warning1 = () => {
  //   message.warning('Please enter departure city');
  // };
  // const warning2 = () => {
  //   message.warning('Please enter a destination.');
  // };
  // const warning3 = () => {
  //   message.warning('Please enter departure date.');
  // };
  // const warning4 = () => {
  //   message.warning('Please enter return date.');
  // };
  const SearchFlightHandler = event => {
    history.push({
      pathname: '/UserSearchFlight',
      state: { detail: 'some_value' }
    });
  };

  const EditProfileHendler = event => {
    history.push({
      pathname: '/UserEditProfile',
      state: { detail: 'some_value' }
    });
  };


  const senddata = (reserv) => {


    // setGuard(true);
  }


  // const ScrollToBottom = () => {
  //   window.scrollTo(0,document.body.scrollHeight);
  // }

  const searchHandler = (e) => {
    e.preventDefault();

    /// setDisplay1([]);
    // setDisplay2([]);

    const criteria1 = {};
    const criteria2 = {};
    var dd;


    console.log(Data);

    Object.keys(Data).forEach(key => {
      if (Data[key] !== "") {
        if (key == "Flight_Date_Depart") {
          criteria1["Flight_Date"] = Data[key];
          // criteria2["Flight_Date_Depart"] = Data[key];
        }
        else
          criteria1[key] = Data[key];
        if (key == "From") {
          criteria2[key] = Data["To"];
        }
        else if (key == "To") {
          criteria2[key] = Data["From"];
        }
        else if (key == "Flight_Date_Return") {
          criteria2["Flight_Date"] = Data[key];
        }
        else
          criteria2[key] = Data[key];
      }
    });
    console.log(criteria2);

    // prevent reloading the page
    //  console.log(Data.Flight_Date_Depart);
    //  if(Data.From.length==3 && Data.To.length==3 &&Data.Flight_Date_Depart!=="" &&Data.Flight_Date_Return!==""){


    // Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    // Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))

    axios.post('http://localhost:8000/usersearchflight', criteria1,)//{withCredentials: true})
      .then(response => {
        // localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        console.log(response.data)

        setResult1(response.data);
        //  console.log(Result1);
      }).catch(error => {
        // if(error.response.status==403){
        //   history.push({
        //     pathname: '/UserLogin'
        //   });
        // }
        console.log(error);
      })

    // Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    // Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))

    axios.post('http://localhost:8000/usersearchflight', criteria2)//,{withCredentials: true})
      .then(response => {
        // localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        console.log(response.data)
        setResult2(response.data);
        //  console.log(Result2);
      }).catch(error => {
        // if(error.response.status==403){
        //   history.push({
        //     pathname: '/UserLogin'
        //   });
        // }
        console.log(error);
      })
    // console.log("woooooooooow")
    // console.log(Result1.Adults)
    // console.log(Result1.Children)

    setGuard(true);

    // console.log(Result1);
    // console.log(Result2);


    // setState({
    //   Flight_No: "",
    //     From: "",  
    //     To: "",
    //     Flight_Date_Depart: "", // Data type date
    //     Flight_Date_Return: "", // Data type date
    //     Terminal: "",
    //     Flight_Duration:"",
    //     Seats: "",
    //     Baggage: "", 
    //     Price: "",

    //     Adults: "",
    //     Children:"",
    //     CabinDepart: "",
    //     CabinReturn: "",
    //   })


    // }

    // else if(Data.From.length<3 ){
    //   warning1();
    // }
    // else if(Data.To.length<3 ){
    //   warning2();
    // }
    // else if(Data.Flight_Date_Depart=="" ){
    //   warning3();
    // }
    // else if(Data.Flight_Date_Return=="" ){
    //   warning4();
    // }

  };


  const parentToChild = (res, from) => {
    console.log(from);
    setmapped(false);
    var ID;
    if (from == true)
      ID = res.Flight_IDFrom
    else
      ID = res.Flight_IDTo

    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/flightmap', { data: { var1: ID } }, { withCredentials: true })
      .then((result) => {
        localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
        document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setreserv({ reserv: res, from: from, Available: result.data[0].Available_Seats });
        // setAvailable(result.data[0].Available_Seats);
        // console.log(Available)
      })
      .catch((error) => {
        if (error.response.status == 403) {
          history.push({
            pathname: '/LoginPage'
          });
        }
      })


    // setmapped(true);
  }
  const swalWithBootstrapButtons = Swal.mixin({
    // customClass: {
    //   confirmButton: 'btn btn-success',
    //   cancelButton: 'btn btn-danger'
    // },
    // buttonsStyling: false
  })

  const success = () => {


    swalWithBootstrapButtons.fire({

      html:
        '<div class="card aa-theme">' +
        '<div class="card_heading">' +
        '<div class="card_logo">' +
        '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>' +
        '</div>' +
        '<img src="https://static.onecms.io/wp-content/uploads/sites/28/2021/09/14/berlin-germany-aerial-lead-BERLINTG0921.jpg" />' +
        '<div class="card_divider">' +
        '<div class="divider_left divider_hole">' +
        '</div>' +
        '<div class="divider">' +
        '</div>' +
        '<div class="divider_right divider_hole">' +
        '</div>' +
        '</div>' +
        '<h1>Departure Flight</h1>' +
        '<div class="inner"></div>' +
        '</div>' +
        '<div class="card_trip">' +
        '<div class="trip_from">' +
        '<h1>' + isdepart.From + '</h1>' +
        '</div>' +
        '<div class="trip_icon">' +
        '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />' +
        '</div>' +
        '<div class="trip_to">' +
        '<h1>' + isdepart.To + '</h1>' +
        '</div>' +
        '</div>' +
        '<div class="card_divider">' +
        '<div class="divider_left divider_hole">' +
        '</div>' +
        '<div class="divider">' +
        '</div>' +
        '<div class="divider_right divider_hole">' +
        '</div>' +
        '</div>' +
        '<div class="card_flight_details">' +
        '<div class="card_seating">' +
        '<div class="seating_passenger">' +
        '<h2>Flight Number</h2>' +
        '<h3>' + isdepart.Flight_No + '</h3>' +
        '</div>' +
        '<div class="seating_passenger_dos">' +
        '<h2>Passenger</h2>' +
        '<h3>'+"---"+'</h3>' +
        '</div>' +
        '<div class="seating_seat">' +
        '<h2>Seat</h2>' +
        '<h3>' + '---' + '</h3>' +
        '</div>' +
        '</div>' +
        '<div class="card_details">' +
        '<div class="details_flight">' +
        '<h2>Depart Date</h2>' +
        '<h3> ' + moment(isdepart.Flight_Date).format("YYYY-MM-DD") + '</h3>' +
        '</div>' +
        '<div class="details_date">' +
        '<h2>Depart Time</h2>' +
        '<h3>' + moment(isdepart.Flight_Date).format("HH:mm") + '</h3>' +
        '</div>' +
        '<div class="details_time">' +
        '<h2>Duration</h2>' +
        '<h3 class="countdown">' + isdepart.Flight_Duration + '</h3>' +
        '</div>' +
        '</div>' +
        '<div class="card_details_continued">' +
        '<div class="details_flight">' +
        '<h2>Price</h2>' +
        '<h3>' + isdepart.Price + '$' + ' </h3>' +
        '</div>' +
        '<div class="details_date">' +
        '<h2>Buggage </h2>' +
        '<h3>' + isdepart.Baggage + '</h3>' +
        '</div>' +
        '<div class="details_time">' +
        '<h2>Terminal</h2>' +
        '<h3>' + isdepart.Terminal + '</h3>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="card qr-theme">' +
        '<div class="card_heading">' +
        '<div class="card_logo">' +
        '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>' +
        '</div>' +
        '<img src="https://www.planetware.com/wpimages/2020/11/united-arab-emirates-abu-dhabi-to-dubai-best-ways-to-get-there-by-car.jpg" />' +
        '<div class="card_divider">' +
        '<div class="divider_left divider_hole">' +
        '</div>' +
        '<div class="divider">' +
        '</div>' +
        '<div class="divider_right divider_hole">' +
        '</div>' +
        '</div>' +




        '<h1>Return Flight</h1>' +
        '<div class="inner"></div>' +
        '</div>' +
        '<div class="card_trip">' +
        '<div class="trip_from">' +
        '<h1>' + isreturn.From + '</h1>' +
        '</div>' +
        '<div class="trip_icon">' +
        '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />' +
        '</div>' +
        '<div class="trip_to">' +
        '<h1>' + isreturn.To + '</h1>' +

        '</div>' +
        '</div>' +
        '<div class="card_divider">' +
        '<div class="divider_left divider_hole">' +
        '</div>' +
        '<div class="divider">' +
        '</div>' +
        '<div class="divider_right divider_hole">' +
        '</div>' +
        '</div>' +
        '<div class="card_flight_details">' +
        '<div class="card_seating">' +
        '<div class="seating_passenger">' +
        '<h2>Flight Number</h2>' +
        '<h3>' + isreturn.Flight_No + '</h3>' +
        '</div>' +
        '<div class="seating_passenger_dos">' +
        '<h2>Passenger</h2>' +
        '<h3>'+"---"+'</h3>' +
        '</div>' +
        '<div class="seating_seat">' +
        '<h2>Seat</h2>' +
        '<h3>' + '---' + '</h3>' +
        '</div>' +
        '</div>' +
        '<div class="card_details">' +
        '<div class="details_flight">' +
        '<h2>Depart Date</h2>' +
        '<h3> ' + moment(isreturn.Flight_Date).format("YYYY-MM-DD") + '</h3>' +
        '</div>' +
        '<div class="details_date">' +
        '<h2>Depart Time</h2>' +
        '<h3>' + moment(isreturn.Flight_Date).format("HH:mm") + '</h3>' +
        '</div>' +
        '<div class="details_time">' +
        '<h2>Duration</h2>' +
        '<h3 class="countdown">' + isreturn.Flight_Duration + '</h3>' +
        '</div>' +
        '</div>' +
        '<div class="card_details_continued">' +
        '<div class="details_flight">' +
        '<h2>Price</h2>' +
        '<h3>' + isreturn.Price + '$' + ' </h3>' +
        '</div>' +
        '<div class="details_date">' +
        '<h2>Buggage </h2>' +
        '<h3>' + isreturn.Baggage + '</h3>' +
        '</div>' +
        '<div class="details_time">' +
        '<h2>Terminal</h2>' +
        '<h3>' + isreturn.Terminal + '</h3>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'






      ,


      imageWidth: 1200,
      imageHeight: 700,
      customClass: 'swal-wide',
      imageAlt: 'A tall image',
      cancelButtonColor: '#ff2626',
      showCancelButton: true,
      cancelButtonText: 'Cancel!',
      confirmButtonText: 'Confirm Choosen Reservation!',

      reverseButtons: false,
      confirmButtonColor: '#ff8300',
      // confirmButtonColor: '#00D100', //GREEN WALA ORANGEEE ?


    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirmeddd")

        if (localStorage.getItem('AuthenticationState') === "UserAuthenticated") {

          // const User  = localStorage.getItem("UserInfo").Email;
          // console.log(User)
          // console.log(User.Email)
          var Passengers = [];
          for (let i = 1; i < Data.Adults + Data.Children; i++) {
            Passengers[i] = {
              Passenger_NO: i,
              FirstName: "",
              LastName: "",
              PassPort_No: "",
              Email: localStorage.getItem("Email"),
            }
          }

          console.log(Passengers)


          history.push({
            pathname: '/PassengersDetails',
            state: {
              flight1: isdepart,
              flight2: isreturn,
              CabinFrom: Data.CabinDepart,
              CabinTo: Data.CabinReturn,
              Adults: Data.Adults,
              Children: Data.Children,
              Passengers: Passengers,
            }
          });
        }

        else {
          swalWithBootstrapButtons.fire(
            {
              title: 'Please Log In to continue',
              // text: 'Please Log In to continue',
              icon: 'warning',
              confirmButtonText: 'Log In',
              confirmButtonColor: '#ff8300',
              // iconColor:'#ff8300' ,
            })
            .then((res) => {
              if (res.isConfirmed) {
                console.log('confirm');
                window.open("UserLogin", "_self");

              }
            });
        }
      }
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {


      }
    })


  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };




  const [isModalVisible, setIsModalVisible] = useState(false);







    const loginHandler = (e) => {
      
      e.preventDefault(); 
    
      const criteria = {};
      Object.keys(Data99).forEach(key => {
     if (Data99[key]!=="") {
          criteria[key] = Data99[key];
        }
      });
  
      if(Data99.Username!==''&& Data99.Password!==''){
     // prevent reloading the page
      axios.post('http://localhost:8000/userlogin', criteria)
      .then(res => {
        console.log(res.status);
        localStorage.setItem("AuthenticationState", "UserAuthenticated")
        localStorage.setItem("AccessToken", res.data.AccessToken);
        localStorage.setItem("RefreshToken", res.data.RefreshToken);
        localStorage.setItem("UserID", res.data.UserID)
        localStorage.setItem("UserInfo", res.data)
        localStorage.setItem("Username", res.data.Username)
        localStorage.setItem("Email", res.data.Email)
  
  
        console.log(localStorage)
        // console.log(sessionStorage.getItem("AuthenticationState"))
        // console.log(sessionStorage.getItem("Username"))
  
        setState99({
          Username: "",  
          Password: "",
          })
          history.push({
              pathname: '/ReservationHomePage' //Pass to 
            });
  
            success99(Data99.Username);
            setIsModalVisible(false);
         }).catch(err => {
          console.log(err.response.status);
          console.log(err.response)
          var msg = err.response.data
          warning(msg);
          console.log(err)
        })
    }
    else if(Data99.Username=='' ){
      warning1();
    }
    else if(Data99.Password=='' ){
      warning2();
    }
  };

  const LogOutHandler = (e) => {
    var userid = localStorage.getItem('UserID')
    axios.delete('http://localhost:8000/logout', { data: { ID: userid } })
    localStorage.clear()
    history.push({
      pathname: '/UserLogin'
    });
  };

  const warning1 = () => {
    message.warning('"Username" Must be Filled!');
  };
  const warning2 = () => {
    message.warning(' "Password" Must be Filled!');
  };

  const success99 = (e) => {
    message.success('Welcome Back to Fly Nawww '.concat(e));
  }

  const createHandler = (e) => {


    e.preventDefault();
    history.push({
      pathname: '/CreateUserAccount'
    });
  };

  const ReservedFlightsHandler = event => {
    history.push({
      pathname: '/UserManageBooking',
      state: { detail: 'some_value' }
    });
  };







  // if(bothselected){
  return (
    <>

<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
      
      width={600}
      height={100}
      footer={null}
      
     >
        


  

  


 
  <div class="container-PopUp" >
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
          <input class="input100"  name="Username" placeholder="Type your Username" value={Data99.Username} onChange={(e) => changeHander99(e)}></input>
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
          <input class="input100" type="password" name="Password" placeholder="Type your Password" value={Data99.Password} onChange={(e) => changeHander99(e)}></input>
          <span class="focus-input100" ></span>
        </div>
        
        
                  <a  class="button-60 center20" role="button"  onClick={(e) => loginHandler(e)}>Log In</a>
                 
       
        

        <div class="flex-col-c p-t-155">
          

          
        </div>
      </form>
    </div>
  </div>








      </Modal>






      <header >
        <nav>
          <div class="logo"></div>
          <ul>
            {/* <div class="group-icon">
              <svg width="20px" height="20px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
  <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"/>
</svg>   
                </div> */}
      {/* <li><a href="#">Log out</a></li> */}
      <li><a href="#"  onClick={(e) => createHandler(e)}>Sign Up</a></li>
      <li><a href="#" onClick={showModal}>Log In</a></li>
      <li><a href="#" onClick={() => LogOutHandler()}>Log Out</a></li>
    </ul>
  </nav>
  <header>
    <div class="headline">
      <div class="inner">

      <div class="textNext">
          <a class="first">Riyadh To Cairo</a>
        </div>
        {/* <a class="textNext">Hello</a> */}
        
        <div class="textNext2">
          <a class="first">Daily direct flights starting from 199.99$</a>
        </div>
        
        <div>
  {/* <p class="first">My name is <span class="emphasis">(pick a name!)</span>.</p> */}
</div>

              {/* <a class="textNext">Hello</a> */}



              <div>
                {/* <p class="first">My name is <span class="emphasis">(pick a name!)</span>.</p> */}
              </div>




            </div>
          </div>
        </header>


      </header>
      <div class="s011">
        <form>
          <fieldset>

          </fieldset>
          <div class="inner-form">
            <header>

              <div class="travel-type-wrap">

                <button type="button" class="item active">
                  <div class="group-icon">
                    <svg width="70px" height="70px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                      <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)" />
                    </svg>
                  </div>
                  <span>Reserve Flight</span>
                </button>

                <button class="item" type="button" onClick={(e) => ReservedFlightsHandler(e)} >
                  <svg width="50" height="35" viewBox="0 0 32 32" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
                    <defs>

                    </defs>
                    <path class="cls-1" d="M26,6a2,2,0,0,0-2-2H8A2,2,0,0,0,6,6V26a2,2,0,0,0,2,2h8V26H8V6H24v6h2Z" transform="translate(0 0)" />
                    <rect x="10" y="18" width="6" height="2" />
                    <rect x="10" y="14" width="12" height="2" />
                    <path class="cls-1" d="M22,10v2H10V10Z" transform="translate(0 0)" />
                    <path width="40" height="40" class="cls-1" d="M25,23l5,2V23l-5-2.5V18a1,1,0,0,0-2,0v2.5L18,23v2l5-2v3.5L21,28v1l3-1,3,1V28l-2-1.5Z" transform="translate(0 0)" />
                    <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-2" width="32" height="32" />
                  </svg>
                  <div class="group-icon">

                    <span>Manage Flights</span>
                  </div>

                </button>

                <button type="button" class="item" onClick={(e) => EditProfileHendler(e)}>
                  <div class="group-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                    </svg>
                  </div>
                  <span>Edit Profile</span>
                </button>
              </div>
            </header>
          </div>
        </form>
      </div>


      <form>
        <fieldset>

        </fieldset>
        <div class="inner-form">


          {/* SDD    THE MAIN FORM THAT MUST BE REPLACED EACH TIME*/}
          <div class="main-form-search" id="main-form">





            <div class="booking-form2">
              {/* <div class="form-header">
                <h1>Make your reservation</h1>
              </div> */}

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group-stay">
                    <input class="form-control2" type="text" name="From" maxLength="3" placeholder="Select Depart Flight" id="left" value={Data.From} onChange={(e) => changeHander(e)} />
                    <span class="form-label">From</span>
                  </div>
                </div>

                <button type="button" class="submit-btn3" onClick={() => switchText()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"></path>
                  </svg>
                </button>

                <div class="col-md-6">
                  <div class="form-group-stay">
                    <input class="form-control2" type="text" name="To" maxLength="3" placeholder="Select Destination Flight" id="right" value={Data.To} onChange={(e) => changeHander(e)} />
                    <span class="form-label">To</span>
                  
                 
                  </div>
                  </div>
              
              </div>
              
              <div class="row-New">
             
                <button class="submit-btn2" type="button" onClick={(e) => searchHandler(e)}>Search Now</button>
                </div>

                <div class="row-New">
                <button class="learn-more" type="button">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
              </button>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="form-group-hidden">

                    <div class="form-control2" type="text" >
                      <span class="date-form">Depart Date</span>
                      <DatePicker style={{
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        // forcedColorAdjust:"red",
                        // stopColor: "#ccc",
                        // stopColor: "rgb(255, 255, 255)",
                        minWidth: "400px",
                        marginTop: "25px",
                        backgroundColor: "transparent",
                        color: "rgb(255 255 255 / 85%)  !important" ,
                      
                        
                      }} format="DD-MM-YYYY" value={Data.Flight_Date_Depart} format="DD-MM-YYYY"
                        showTime="false" disabledDate={d => d.isBefore(new Date())}
                        name="Depart" onChange={(date) => setState(prevData => {
                          return { ...prevData, Flight_Date_Depart: date }
                        })
                        } />
                    </div>

                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group-hidden">
                    <div class="form-control2" type="text" >
                      <span class="date-form">Return Date</span>
                      <DatePicker style={{
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        minWidth: "400px",
                        marginTop: "25px",
                        backgroundColor: "transparent",
                        Color: "white",

                      }} type="date" format="DD-MM-YYYY" value={Data.Flight_Date_Return} format="DD-MM-YYYY"
                        showTime="false" disabledDate={d => d.isBefore(Data.Flight_Date_Depart)}
                        name="Return" onChange={(date) => setState(prevData => {
                          return { ...prevData, Flight_Date_Return: date }
                        })
                        } />
                    </div>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="form-group-hidden">
                    <select class="form-control2" name="CabinDepart" value={Data.CabinDepart} onChange={(e) => changeHander(e)}>

                      <option  value={"First"}>First</option>
                      <option value={"Business"}>Business</option>
                      <option value={"Economy"}>Economy</option>
                    </select>

                    <span class="select-arrow"></span>
                    <span class="date-form">Depart Cabin</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group-hidden">
                    <select class="form-control2" name="CabinReturn" value={Data.CabinReturn} onChange={(e) => changeHander(e)}>
                      {/* <option value={Data.CabinReturn}  selected hidden>Select Return Cabin</option> */}

                      <option   value={"First"}>First</option>
                      <option value={"Business"}>Business</option>
                      <option value={"Economy"}>Economy</option>
                    </select>
                    <span class="select-arrow"></span>
                    <span class="date-form" >Return Cabin</span>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="form-group-hidden">
                    <div class="form-control2" type="text" >
                      <span class="date-form">Adults</span>
                      <Form.Item >
                        <InputNumber DatePicker style={{
                          borderTopColor: "transparent",
                          borderBottomColor: "transparent",
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          minWidth: "390px",
                          marginTop: "25px",
                          backgroundColor: "transparent",
                          Color: "white",
                          textAlign: "center",
                          color: "#ffffff !important" ,


                        }} type="Number" name="Adults" value={Data.Adults} max={500} min={0} placeholder="No Of Adults" onChange={(number) => setState(prevData => {
                          return { ...prevData, Adults: number }
                        })
                        } />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group-hidden">
                    <div class="form-control2" type="text" >
                      <span class="date-form">Children</span>
                      <Form.Item >
                        <InputNumber DatePicker style={{
                          borderTopColor: "transparent",
                          borderBottomColor: "transparent",
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          minWidth: "390px",
                          marginTop: "25px",
                          backgroundColor: "transparent",
                          Color: "white",
                          textAlign: "center",

                        }} type="Number" name="Children" value={Data.Children} max={500} min={0} placeholder="No Of Children" onChange={(number) => setState(prevData => {
                          return { ...prevData, Children: number }
                        })
                        } />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>


              {/* this button will be hidden until we pressed on expand  */}
              <div class="row-New">
                <button class="submit-btn2-hidden-under" type="button" onClick={(e) => searchHandler(e)}>Search Now</button>
             
            </div>

            <div class="row-New">
            <button class="learn-more" type="button">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrowDown1"></span>
                </span>
              </button>
              </div>
{/* 
              <button class="learn-more" type="button">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrowDown1"></span>
                </span>
              </button>
            </div> */}
           

              
              </div>



       
             
             

           








            {/* <div class="promofamily">
<div class="promo" >
  <div class="image-wrapper"><img src="https://images.unsplash.com/photo-1554620121-59e7f3f6e3a4?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=800&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ"/></div>
  <h6 class="title" data-cta="">Nightlife</h6>
  <h class="title2">Discover the hidden<br></br> island before anyone!!</h>
</div>
<div class="promo" >
  <div class="image-wrapper"><img src="https://images.unsplash.com/photo-1523806762236-1d3a6b7eb3fd?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=800&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ"/></div>
  <h6 class="title" data-cta="">Quiet Time</h6>
  <h class="title2">Discover the hidden<br></br> island before anyone!!</h>
</div>
<div class="promo" >
  <div class="image-wrapper"><img src="https://nypost.com/wp-content/uploads/sites/2/2021/09/travel-maldives-feature.jpg?quality=80&strip=all"/></div>
  <h6 class="title" data-cta="">Maldives</h6>
  <h class="title2">Need A break from boring routine?,<br></br> explore photos taken by Fly Nawww clients </h>

</div>
<div class="promo" >
  <div class="image-wrapper"><img src="https://d3ese01zxankcs.cloudfront.net/Pictures/2000xAny/3/9/4/67394_The-Aurora-Borealis-covers-the-night-sky-of-Greenlands-capital---Nuuk.png"/></div>
  <h6 class="title" >GreenLand </h6>
  <h class="title2">Enjoy the northern lights in Greenland,<br></br> explore photos taken by Fly Nawww clients </h>
</div>
	
	</div> */}




          </div>
        </div>
      </form>




      <div class="box2 d">
        <label class="center">Depart Flight</label>
        <div class="box f">


        {Display1.length === 0 ? 


<div class="img-container-block">

  <header>No Flights Were Found!</header>
  <img  width="350"  height="350" src="https://i.ibb.co/wQyWTh4/no-plane-3262-1.png" alt="John Doe"/>

  {/* https://media.istockphoto.com/vectors/officers-show-prohibition-signs-to-an-airplane-vector-id1252876806?k=20&m=1252876806&s=612x612&w=0&h=q6NhqXVSi07mtapGiwQpvP7E_GormrNR09fo26NL_xs= */}
</div>

            
            :null}


          {Display1.map(flight => {


            return (
              <button type="button" class="flight-card" id={flight._id} onClick={() => departHandler(flight)}>

                <div class="flight-card-content">
                  <div class="flight-row">
                    <div class="flight-from">
                      <span class="from-code">{flight.From}</span>

                    </div>
                    <div class="plane"></div>

                    <div class="plane2">
                      <img src="https://www.svgrepo.com/show/197156/airplane-flight.svg" alt="" />
                    </div>

                    <div class="plane"></div>

                    <div class="flight-to">
                      <span class="to-code">{flight.To}</span>
                    </div>

                  </div>

                  <div class="flight-details-row">
                    <div class="flight-operator">

                      <span class="detail">{moment(flight.Flight_Date).format("YYYY-MM-DD")}<br></br>
                        {moment(flight.Flight_Date).format("HH:mm")}
                      </span>

                    </div>
                    <div class="flight-number">

                      <span class="detail2">{flight.Price}$</span>
                    </div>
                    <div class="flight-class">

                      <span class="detail">{flight.CabinDepart}</span>
                    </div>
                  </div>

                </div>
              </button>)

          })
          }

      


        </div>

        <label class="center">Return Flight</label>
        <div class="box g">

        {Display2.length === 0 ? 


<div class="img-container-block">

  <header>No Flights Were Found!</header>
  <img  width="350"  height="350" src="https://i.ibb.co/wQyWTh4/no-plane-3262-1.png" alt="John Doe"/>
</div>

            
            :null}


          {Display2.map(flight =>
            <button type="button" class="flight-card2" id={flight._id} name={flight._id} onClick={() => returnHandler(flight)}>

              <div class="flight-card-content">
                <div class="flight-row">
                  <div class="flight-from">
                    <span class="from-code">{flight.From}</span>

                  </div>
                  <div class="plane"></div>

                  <div class="plane2">
                    <img src="https://www.svgrepo.com/show/197156/airplane-flight.svg" alt="" />
                  </div>

                  <div class="plane"></div>

                  <div class="flight-to">
                    <span class="to-code">{flight.To}</span>
                  </div>

                </div>

                <div class="flight-details-row">
                  <div class="flight-operator">

                    <span class="detail">{moment(flight.Flight_Date).format("YYYY-MM-DD")}<br></br>
                      {moment(flight.Flight_Date).format("HH:mm")}
                    </span>

                  </div>
                  <div class="flight-number">

                    <span class="detail2">{flight.Price}$</span>
                  </div>
                  <div class="flight-class">





                    <span class="detail">{flight.CabinDepart}</span>
                  </div>
                </div>

              </div>
            </button>

          )}

        </div>


        {/* <a id="yourButtonID" class="link-1" onClick={() => success()}>Reserve Flight </a> */}
        <button id="yourButtonID" class="btn-search3" onClick={() => success()}>Reserve Flights </button>





        < div class="modal-container" id="modal-opened">
          <div class="modal">





          </div>





        </div>
      </div>



      {/* <main class="page-content">
  <div class="card">
    <div class="content">
      <h2 class="title">Mountain View</h2>
      <p class="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>
      <button class="btn">View Trips</button>
    </div>
  </div>
  <div class="card">
    <div class="content">
      <h2 class="title">To The Beach</h2>
      <p class="copy">Plan your next beach trip with these fabulous destinations</p>
      <button class="btn">View Trips</button>
    </div>
  </div>
  <div class="card">
    <div class="content">
      <h2 class="title">Desert Destinations</h2>
      <p class="copy">It's the desert you've always dreamed of</p>
      <button class="btn">Book Now</button>
    </div>
  </div>
  <div class="card">
    <div class="content">
      <h2 class="title">Explore The Galaxy</h2>
      <p class="copy">Seriously, straight up, just blast off into outer space today</p>
      <button class="btn">Book Now</button>
    </div>
  </div>
</main> */}











<div class="inner-form">   
          <div class="main-form-search" id="main-form">
            <div class="booking-form2">
            

             
            <div class="row-Ads">


<figure class="snip1482 ">
  <figcaption>
    <h2>Bali</h2>
    <p>Plan your next beach trip with these fabulous destinations.</p>
    <h3>Book Now to enjoy your vaction!!</h3>
  </figcaption>
  <a href="https://www.booking.com/searchresults.html?dest_id=835;dest_type=region" target="_blank"></a><img src="https://i.pinimg.com/originals/f8/e5/c3/f8e5c39c0a32e6b5c223963797c61d64.jpg"/>
</figure>


<figure class="snip1482">
  <figcaption>
    <h2>Morocco</h2>
    <p>It's the desert you've always dreamed of.</p>
    <h3>Go Book your trip now!</h3>
  </figcaption>
  <a href="https://www.booking.com/country/ma.en-gb.html?aid=356980;label=gog235jc-1DCAIojAFCAm1hSDNYA2hDiAEBmAEJuAEXyAEM2AED6AEBiAIBqAIDuALB3qmOBsACAdICJDkzMTA0ZWU5LWI5YWEtNDgxMi1hYjM2LWZiY2I4ZTZkZDRiM9gCBOACAQ;sid=7a3c3fd6097ab68c44303a91f74f8db3;keep_landing=1&" target="_blank"></a><img src="https://live.staticflickr.com/5541/11188879634_c994f348bd_b.jpg" />
</figure>



<figure class="snip1482">
  <figcaption>
    <h2>North Iceland</h2>
    <p>Explore The Galaxy</p>
    <h3>Book Now! Just blast off into outer space today</h3>
  </figcaption>
  <a href="https://www.booking.com/country/is.en-gb.html" target="_blank"></a><img src="https://daks2k3a4ib2z.cloudfront.net/5889db0fae2c743016d69867/5914785054610e4184cffebf_northernligths.jpg" />
</figure>

</div>
          </div>
          </div>
        </div>

        

{/* 
        <link href='//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet'/>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> */}

            
          




          <div class="main-form-search" >
            <div class="booking-form-footer">


		<footer class="footer-distributed">
{/* 
			<div class="footer-right">

				<a href="#"></a>
				<a href="#"><i class="fa fa-twitter"></i></a>
				<a href="#"><i class="fa fa-linkedin"></i></a>
				<a href="#"><i class="fa fa-github"></i></a>

			</div> */}

<script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<script src="https://kit.fontawesome.com/3181f2ab94.js" crossorigin="anonymous"></script>

			<div class="footer-left">

				<p class="footer-links">
		

					<a onClick={() => AboutUs()}>About Us</a>

					<a onClick={() => Vision()}>Vision</a>

					<a onClick={() => Mission()}>Mission</a>

					<a onClick={() => Values()}>Values</a>

				</p>

				{/* <p>Fly Nawww &copy; 2021</p> */}
			</div>
      <p class="footer-links">
      <ul class="social-icons">
      {/* <h5 >Stay connected</h5> */}
        
      <li><a href="https://www.instagram.com/a7med_farou8/" target="_blank"><i class="fa fa-instagram"></i></a></li>
      <li><a href="https://www.facebook.com/profile.php?id=100076457080325" target="_blank"> <i class="fa fa-facebook"></i></a></li>
      {/* <li><a href="#"><i class="fa fa-linkedin"></i></a></li> */}
      <li><a target="_blank" href="      
            https://www.google.com/maps/place/Cairo+International+Airport/@30.1127196,31.3998542,15z/data=!4m2!3m1!1s0x0:0xe065af2151e21386?sa=X&ved=2ahUKEwjr-sna24X1AhVFhRoKHZ1EClAQ_BJ6BAg9EAU ">
              <i class="fa fa-map-marker"></i></a></li>
      {/* <li><a href="#"><i class="fa fa-whatsapp"></i></a></li> */}
    </ul>
    </p>
    <div class="ChangeColor">
    		<p>Fly Nawww &copy; 2021</p>
        </div>
		</footer>






    

    </div>
          </div>
        



      







    </>


  );



};

{/* <div id="app"></div> 
  ReactDOM.render(<UserManageBooking />, document.querySelector("#app")); */}

export default ReservationHomePage;

