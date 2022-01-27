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
import '../css/main2.css';
import '../css/guest.css';
import '../css/SelectSeat.scss';
import '../css/header.css';
import swal from 'sweetalert2'
import '../css/BoardingPass.scss';
import Cookies from "js-cookies";
import '../css/pass.scss';

import '../css/SeatplusBoarding.css';
import moment from "moment";
import { Modal } from 'antd';
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
import { captureRejectionSymbol } from 'nodemailer/lib/xoauth2';




var SeatsArray = ''
var Cabin = ''
var pre = "";
var current = "";
var Reserv = ""
var From = ""
var DisplayedSeat = "--"
var PassSeat = ""
var PassSeatID = ""
var Terminal = ""
var BoardingTime= ""




const UserSelectSeat = () => {



  $(document).ready(function () {
    var qrWidth, qrHeight;

    //fluid height of wrapper
    function resizeWrapper() {
      var wrapper = $('.wrapperNew');
      var wrapperWidth = wrapper.css('width');
      if ($.trim($('.wrapperNew').attr('width')) != '') {
        var wrapperheight = parseInt(wrapperWidth.substring(0, wrapperWidth.length - 2)) / 2.5;
      }
      wrapper.css('height', wrapperheight + 'px');

      if (!$('.qr').hasClass('expand')) {
        qrWidth = $('.qr').css('width');
        qrHeight = $('.qr').css('height');
        if ($.trim($('.qr').attr('width')) != '') {
          qrWidth = parseInt(qrWidth.substring(0, qrWidth.length - 2));
        }
        if ($.trim($('.qr').attr('height')) != '') {
          qrHeight = parseInt(qrHeight.substring(0, qrHeight.length - 2));
        }
      }
    }

    function resizeQr(type) {
      var qrWrapper = $('.qr-wrapper');
      if (type === 'down') {
        qrWrapper.css('height', (qrHeight * 0.38) + 'px');
        qrWrapper.css('width', (qrWidth * 0.5) + 'px');

      }
      else {
        qrWrapper.css('height', (qrHeight * 0.53) + 'px');
        qrWrapper.css('width', (qrWidth * 0.7) + 'px');

      }
    }

    $(window).resize(function () {
      resizeWrapper();
      resizeQr('down');
    });
    resizeWrapper();

    //Expand QR
    $('body').on('click', '.qr', function () {//delegated
      console.log("funccccc")
      $(this).toggleClass('expand');
      if ($(this).hasClass('expand')) {
        console.log("ifff")
        resizeQr('up');
        $('.qr a').text('collapse');
      }
      else {
        console.log("elssee")
        resizeQr('down');
        $('.qr a').text('expand');
      }
    });

    $('body').on('click', '.seat2', function () {//delegated
      console.log("hereeee")
      $('.inner-wrapper').addClass('seat-details');
      $('.inner-wrapper').removeClass('boarding-pass');
      console.log(Cabin)
      console.log(Cabin !== "First")
      for (let i = 1; i < 21; i++) {
        var x = i + ""
        var elements = document.getElementsByName(x);
        var id = elements[0].getAttribute('id');
        if (Cabin !== "First") {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
        else if (SeatsArray[i] === true) {
          document.getElementById(id).style.backgroundColor = 'rgb(0, 115, 230)'
        }
        else {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
      }

      for (let i = 21; i < 63; i++) {
        var x = i + ""
        var elements = document.getElementsByName(x);
        var id = elements[0].getAttribute('id');
        if (Cabin !== "Business") {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
        else if (SeatsArray[i] === true) {
          document.getElementById(id).style.backgroundColor = 'rgb(0, 115, 230)'
        }
        else {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
      }


      for (let i = 63; i < 141; i++) {
        var x = i + ""
        var elements = document.getElementsByName(x);
        var id = elements[0].getAttribute('id');
        if (Cabin !== "Economy") {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
        else if (SeatsArray[i] === true) {
          document.getElementById(id).style.backgroundColor = 'rgb(0, 115, 230)'
        }
        else {
          document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        }
      }

      if(PassSeatID!==null && PassSeatID!=0){
        var w = PassSeatID+""
        var elements = document.getElementsByName(w);
        var id = elements[0].getAttribute('id');
        document.getElementById(id).style.backgroundColor = 'green'
        pre = id;
        current = id;
      }

    });


    $('body').on('click', '.seat-layout .close', function () {//delegated
      $('.inner-wrapper').addClass('boarding-pass');
      $('.inner-wrapper').removeClass('seat-details');
    });
  })





  $('body').on('click', '.seat', function () {//delegated

    if (Cabin === "First") {
      var check = parseInt($(this).attr('name'))
      if (check >= 1 && check <= 20) {
        if (SeatsArray[check]) {

          DisplayedSeat = $(this).attr('id')

          document.getElementById("Selected-Seat").innerText = DisplayedSeat
          document.getElementById("Selected-Seat2").innerText = DisplayedSeat


          var dateSpan = document.createElement('span')
          dateSpan.innerHTML = "SEAT";
          document.getElementById("Selected-Seat").appendChild(dateSpan);

          var dateSpan2 = document.createElement('span')
          dateSpan2.innerHTML = "SEAT";
          document.getElementById("Selected-Seat2").appendChild(dateSpan2);

          if ($(this).attr('id') !== current) {
            console.log($(this).attr('id'));
            if (pre == "") {
              current = $(this).attr('id')
              document.getElementById(current).style.backgroundColor = 'green'
              pre = $(this).attr('id')
            }
            else {
              pre = current;
              current = $(this).attr('id');
              document.getElementById(current).style.backgroundColor = 'green'

              var element = document.getElementById(pre);
              var id = parseInt(element.getAttribute('name'));
              if (SeatsArray[id]) {
                document.getElementById(pre).style.backgroundColor = 'rgb(0, 115, 230)'
              }
              else {
                document.getElementById(pre).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
              }
            }
          }
        }
      }
    }

   else if (Cabin === "Business") {
      var check = parseInt($(this).attr('name'))
      if (check >= 21 && check <= 62) {
        if (SeatsArray[check]) {

          DisplayedSeat = $(this).attr('id')

          document.getElementById("Selected-Seat").innerText = $(this).attr('id')
          document.getElementById("Selected-Seat2").innerText = $(this).attr('id')


          var dateSpan = document.createElement('span')
          dateSpan.innerHTML = "SEAT";
          document.getElementById("Selected-Seat").appendChild(dateSpan);

          var dateSpan2 = document.createElement('span')
          dateSpan2.innerHTML = "SEAT";
          document.getElementById("Selected-Seat2").appendChild(dateSpan2);

          if ($(this).attr('id') !== current) {
            console.log($(this).attr('id'));
            if (pre == "") {
              current = $(this).attr('id')
              document.getElementById(current).style.backgroundColor = 'green'
              pre = $(this).attr('id')
            }
            else {
              pre = current;
              current = $(this).attr('id');
              document.getElementById(current).style.backgroundColor = 'green'

              var element = document.getElementById(pre);
              var id = parseInt(element.getAttribute('name'));
              if (SeatsArray[id]) {
                document.getElementById(pre).style.backgroundColor = 'rgb(0, 115, 230)'
              }
              else {
                document.getElementById(pre).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
              }

            }
          }

        }
      }
    }

    else if (Cabin === "Economy") {
      var check = parseInt($(this).attr('name'))
      if (check >= 63 && check <= 140) {
        if (SeatsArray[check]) {

          DisplayedSeat = $(this).attr('id')

          document.getElementById("Selected-Seat").innerText = $(this).attr('id')
          document.getElementById("Selected-Seat2").innerText = $(this).attr('id')


          var dateSpan = document.createElement('span')
          dateSpan.innerHTML = "SEAT";
          document.getElementById("Selected-Seat").appendChild(dateSpan);

          var dateSpan2 = document.createElement('span')
          dateSpan2.innerHTML = "SEAT";
          document.getElementById("Selected-Seat2").appendChild(dateSpan2);

          if ($(this).attr('id') !== current) {
            console.log($(this).attr('id'));
            if (pre == "") {
              current = $(this).attr('id')
              document.getElementById(current).style.backgroundColor = 'green'
              pre = $(this).attr('id')
            }
            else {
              pre = current;
              current = $(this).attr('id');
              document.getElementById(current).style.backgroundColor = 'green'

              var element = document.getElementById(pre);
              var id = parseInt(element.getAttribute('name'));
              if (SeatsArray[id]) {
                document.getElementById(pre).style.backgroundColor = 'rgb(0, 115, 230)'
              }
              else {
                document.getElementById(pre).style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
              }

            }
          }

        }
      }
    }


    //  document.getElementById("1").style.backgroundColor= 'green';
    //  document.getElementById("1").style.backgroundColor= 'green';
  });






  $('body').on('click', '.button-new', function () {

    $('.pop-up').addClass('open');
  });

  $('body').on('click', '.close', function () {

    $('.pop-up').removeClass('open');
  });



  if (localStorage.getItem('AuthenticationState') !== "UserAuthenticated") {
    window.open("UserLogin", "_self");
  }

  const history = useHistory();
  const [isLoading, setLoading] = useState(true);

  const criteria = {};
  const [Guard, setGuard] = useState(true);
  const [Data2, setData2] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  criteria["Username"] = localStorage.getItem("Username");
  const reservation = history.location.state?.reservation
  const from = history.location.state?.from
  var flightid = ''


  if (from == true) {
    criteria["word"] = "Flight_IDFrom";
    criteria["Flight_IDFrom"] = reservation.Flight_IDFrom;
    flightid = reservation.Flight_IDFrom;
  }
  else {
    criteria["word"] = "Flight_IDTo";
    criteria["Flight_IDTo"] = reservation.Flight_IDTo;
    flightid = reservation.Flight_IDTo;
  }
  // criteria["ReservationOwner"] = true; 
  const criteria1 = {};
  const [Reservations, setallReservation] = useState();
  const [mapped, setmapped] = useState(false);
  // const [Available, setAvailable] = useState();
  const [reserv, setreserv] = useState();
  const [data1, setData] = useState();


  const [flight1, setflight1] = useState();
  const [flight2, setflight2] = useState();


  // const [allReservation, setReservation] = useState({
  //   FirstName:"",
  //   LastName: userinfo.LastName,  
  //   Email: userinfo.Email,
  //   Date_of_Birth: userinfo.Date_of_Birth, // Data type date
  //   PassPort_No: userinfo.PassPort_No,
  //   Username: userinfo.Username,
  //   Password: userinfo.Password,
  // });

  useEffect(() => {

    // if(Guard === true){
    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))
    console.log(Cookies)
    axios.post('http://localhost:8000/reservationinfoforpass', criteria, { withCredentials: true }).then((result) => {
      localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
      // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // console.log("ssss")
      setallReservation(result.data);
      //  console.log(result.data);
    }).catch((error) => {
      if (error.response.status == 403) {
        console.log(error.response.data)
        history.push({
          pathname: '/UserLogin'
        });
      }
    })

  }, []);



  useEffect(() => {

    if (Data2) {
      SeatsArray = Data2;
      console.log(Data2.length)
      console.log(Data2[1])
      setIsModalVisible(true);
    }

  }, [Data2]);


  useEffect(() => {

    if (isModalVisible) {
      document.getElementById("Selected-Seat").innerText = DisplayedSeat
      document.getElementById("Selected-Seat2").innerText = DisplayedSeat


      var dateSpan = document.createElement('span')
      dateSpan.innerHTML = "SEAT";
      document.getElementById("Selected-Seat").appendChild(dateSpan);

      var dateSpan2 = document.createElement('span')
      dateSpan2.innerHTML = "SEAT";
      document.getElementById("Selected-Seat2").appendChild(dateSpan2);
    }

  }, [isModalVisible]);


  useEffect(() => {

    if (data1) {
      console.log(data1)
      setmapped(true);

    }
  }, [data1]);



  // const flightmapHandler = (id) => {
  //   console.log("your id")
  //   console.log(flightid)
  //   Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
  //   Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))

  //   axios.post('http://localhost:8000/flightmap', { data: { var1: flightid } }, { withCredentials: true }).then((result) => {
  //     localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
  //     console.log(flightid)
  //     //  document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //     //  document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //     // setData2(result.data[0].Available_Seats);
  //   })
  //     .catch((error) => {
  //       if (error.response.status == 403) {
  //         console.log(error.response.data)
  //         history.push({
  //           pathname: '/UserLogin'
  //         });
  //       }
  //     })

  // };

  const Editdeparthandler = (res) => {
    history.push({
      pathname: '/UserEditFlight',
      state: {
        reservation: res,
        depart: true,
        return: false,
        from: res.Flight_From,
        to: res.Flight_To,
        cabin: res.CabinFrom,
        date: res.Flight_DateFrom
      }
    });
  }

  const Editreturnhandler = (res) => {

    history.push({
      pathname: '/UserEditFlight',
      state: {
        reservation: res,
        depart: false,
        return: true,
        from: res.Flight_To,
        to: res.Flight_From,
        cabin: res.CabinTo,
        date: res.Flight_DateTo
      }
    });
  }


  const AboutUs = () => { // e will contain the reservation number 
    Swal.fire({
      title: 'Fly Nawww is a Saudi Arabian leading low-cost carrier with a fleet of 34 aircrafts, operating more than 1500 weekly flights to 35 domestic and international destinations.',
      confirmButtonText: 'Hmm.. Ok',
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
      confirmButtonText: 'Hmm.. Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animateanimated animatefadeInDown'
      },
      hideClass: {
        popup: 'animateanimated animatefadeOutUp'
      }
    })
  };
  const ContactUs = () => { // e will contain the reservation number 
    Swal.fire({
      title: 'Call:011414656668',
      confirmButtonText: 'Hmm.. Ok',
      confirmButtonColor: '#ff8300',
      showClass: {
        popup: 'animateanimated animatefadeInDown'
      },
      hideClass: {
        popup: 'animateanimated animatefadeOutUp'
      }
    })
  };


  const LogOutHandler = () => {
    var userid = localStorage.getItem('UserID')
    axios.delete('http://localhost:8000/logout', { data: { ID: userid } })
    localStorage.clear()
    window.open("UserLogin", "_self");

  };

  const ConfirmDelete = (Reservationid, RefundedAmount, Useremail, reservation) => { // e will contain the reservation number 
    Reserv = reservation
    Swal.fire(
      {
        title: 'Delete Reservation',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#ff8300',
        confirmButtonText: 'Yes, delete it!'
        // iconColor:'#ff8300' ,
      })
      .then((res) => {
        if (res.isConfirmed) {
          var del = Reservationid;
          console.log(del)
          del.trim();
          console.log(del)
          Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
          Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))

          axios.delete('http://localhost:8000/deletereservation',{withCredentials: true  , data: { var1: del }})
            .then(response => {
              localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
              // document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              // document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;

            }).catch(error => {
              console.log(error.response.data)
              if (error.response.status == 403) {
                history.push({
                  pathname: '/UserLogin'
                });
              }
              console.log(error); //Handle Flight_No excite 
            })


            var flightid = ""
            var Seatid = ""
            if(From){
              Seatid = Reserv.SeatsChoosenFromID 
              flightid = Reserv.Flight_IDFrom
            }
            else{
              Seatid = Reserv.SeatsChoosenToID 
              flightid = Reserv.Flight_IDTo
        
            }
            
            console.log(Seatid)
            if(Seatid!=null || Seatid!=0){
              console.log(Seatid)
              console.log(SeatsArray[Seatid])
               SeatsArray[Seatid] = true;
               console.log(SeatsArray[Seatid])
            }


            Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
            Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
            axios.put('http://localhost:8000/updateseats',{data: {var1 : flightid, var2 : SeatsArray} 
          },{withCredentials: true}).then((result)=>
          {    
            localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
            // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          })
          .catch((error) => {
            if(error.response.status==403){
              window.open("UserLogin", "_self");
            }
          })


          Swal.fire(
            {
              title: 'Reservation Successfully Deleted!',
              text: 'You will be Refunded with: $'.concat(RefundedAmount),
              icon: 'success',
              showConfirmButton: false,
            }

          )
          setTimeout(() => {
            window.location.reload()
          }, 2000);

          var Refund = RefundedAmount;
          var mail = "anasnemr25@gmail.com";
          var reservation2 = reservation


          // Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
          // Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))
          // axios.post("http://localhost:8000/sendmail", { data: { var1: Refund, var2: mail, var3: reservation2 } }, { withCredentials: true }).then(response => {
          //   localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
          //   // document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          //   // document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          // }).catch(error => {
          //   if (error.response.status == 403) {
          //     history.push({
          //       pathname: '/UserLogin'
          //     });
          //   }
          // })


        }
      });
  };
  const warning1 = () => {
    message.warning('Please enter departure city');
  };
  const warning2 = () => {
    message.warning('Please enter a destination.');
  };
  const warning3 = () => {
    message.warning('Please enter departure date.');
  };
  const warning4 = () => {
    message.warning('Please enter return date.');
  };
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


  const showModal = () => {

    console.log("your id")
    console.log(flightid)
    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))

    axios.post('http://localhost:8000/flightmap', { data: { var1: flightid } }, { withCredentials: true }).then((result) => {
      localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
      // console.log(result.data[0])
      //  document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      //  document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      Terminal = result.data[0].Terminal
      console.log(result.data[0])
      var realTime = moment(result.data[0].Flight_Date)
      var duration = moment.duration({hours: 0, minutes: 30})
      var sub = realTime.subtract(30, 'minutes').format("HH:mm");
      console.log(realTime)
      console.log(duration)
      console.log(sub)
      BoardingTime = sub;
      if(PassSeatID!=null){
      result.data[0].Available_Seats[PassSeatID] = true;
      }

      setData2(result.data[0].Available_Seats);
    })
      .catch((error) => {
        // if (error.response.state == 403) {
          console.log(error)
          // history.push({
          //   pathname: '/UserLogin'
          // });
        // }
      })


  };

  const handleOk = () => {
    // setIsModalVisible(false);
  };

  const handleCancel = () => {

    if(current!==""){
    var element = document.getElementById(current);
    var id = parseInt(element.getAttribute('name'));
    var flightid = ""
    if(From){
      Reserv.SeatsChoosenFrom = current
      Reserv.SeatsChoosenFromID = id
      flightid = Reserv.Flight_IDFrom
    }
    else{
      Reserv.SeatsChoosenTo = current
      Reserv.SeatsChoosenToID = id
      flightid = Reserv.Flight_IDTo

    }
    SeatsArray[id] = false;
    console.log(current)
    console.log(id)
    console.log(Reserv)
    console.log(From)

    
    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.put('http://localhost:8000/updatereservationseats', {data: {var1:Reserv['_id'], var2:Reserv}
    },{withCredentials: true}).then((result)=>
    {    
      localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
      // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    })
    .catch((error) => {
      if(error.response.status==403){
      window.open("UserLogin", "_self");
      }
    })


    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.put('http://localhost:8000/updateseats',{data: {var1 : flightid, var2 : SeatsArray} 
  },{withCredentials: true}).then((result)=>
  {    
    localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
    // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  })
  .catch((error) => {
    if(error.response.status==403){
      window.open("UserLogin", "_self");
    }
  })

    }


    $('.inner-wrapper').addClass('boarding-pass');
    $('.inner-wrapper').removeClass('seat-details');
    pre = ""
    current = ""



    setIsModalVisible(false);
  };





  const parentToChild = (res, from) => {

    if (from == true) {
      Cabin = res.CabinFrom
      PassSeat = res.SeatsChoosenFrom
      PassSeatID = res.SeatsChoosenFromID
      if(res.SeatsChoosenFromID!==null)
          DisplayedSeat = res.SeatsChoosenFrom
      else
           DisplayedSeat = "--"
    } 
    else {
      Cabin = res.CabinTo
      PassSeat = res.SeatsChoosenTo
      PassSeatID = res.SeatsChoosenToID
      if(res.SeatsChoosenToID!==null)
      DisplayedSeat = res.SeatsChoosenTo
      else
       DisplayedSeat = "--"
    }
    console.log(DisplayedSeat)
    console.log(Cabin)
    Reserv = res
    From = from
    
    
    showModal();


    // setIsModalVisible(true);



  }

  const swalWithBootstrapButtons = Swal.mixin({
    // customClass: {
    //   confirmButton: 'btn btn-success',
    //   cancelButton: 'btn btn-danger'
    // },
    // buttonsStyling: false
  })





  const Showboarding = (DateFrom, DateTo, From, To, CabinFrom, CabinTo, reservation) => {


    var Refund = reservation.TotalPrice;
    var mail = "anasnemr25@gmail.com";
    var reservation2 = reservation
    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))
    axios.post("http://localhost:8000/sendmailconfirm", { data: { var1: Refund, var2: mail, var3: reservation2 } }, { withCredentials: true }).then(response => {
      localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
      // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }).catch(error => {
      if (error.response.status == 403) {
        history.push({
          pathname: '/UserLogin'
        });
      }
    })

    swalWithBootstrapButtons.fire({

      html:

        '<div class="wrapper">' +
        '<div class="qr">' +
        '<div class="title">boarding pass</div>' +
        '<div class="qr-wrapper">' +
        '<div class="qr-image"></div>' +
        '</div>' +
        '<a>expand</a>' +
        '</div>' +
        '<div class="inner-wrapper">' +
        '<div class="details">' +
        '<div class="date"> ' + moment(DateFrom).format("YYYY-MM-DD") + '</div>' +
        '<div class="city">' +
        '<div class="from loc">' +
        '<div class="name">' + From + '</div>' +
        '<div class="weather">' +
        '<div class="icon">' +
        '<div class="drop1 drop"></div>' +
        '<div class="drop2 drop"></div>' +
        '<div class="drop3 drop"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="to loc">' +
        '<div class="name">' + To + '</div>' +
        '<div class="weather">' +
        '<div class="icon">' +
        '<div class="sunrays ray1"></div>' +
        '<div class="sunrays ray2"></div>' +
        '<div class="sunrays ray3"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="plane"></div>' +
        '<div class="content">' +
        '<div class="gate">' + CabinFrom + ' <span>Cabin</span></div>' +
        '<div class="gate"></div>' +
        '<div class="gate">' + moment(DateFrom).format("HH:mm") + ' <span>departure</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="seat-layout">' +
        '<div class="content">' +
        '<div class="close"><i class="fa fa-remove fa-2x"></i></div>' +
        '<div class="gate">2B <span>gate</span></div>' +
        '<div class="seat">16B <span>seat</span></div>' +
        '<div class="boarding">12:20PM <span>boarding</span></div>' +
        '<div class="departure">12:50PM <span>departure</span></div>' +
        '<div class="flight">GO181 <span>flight</span></div>' +
        '</div>' +


        '</div>' +
        '</div>' +
        '</div>'
        +
        '<div class="wrapper">' +
        '<div class="qr">' +
        '<div class="title">boarding pass</div>' +
        '<div class="qr-wrapper">' +
        '<div class="qr-image"></div>' +
        '</div>' +
        '<a>expand</a>' +
        '</div>' +
        '<div class="inner-wrapper">' +
        '<div class="details">' +
        '<div class="date"> ' + moment(DateTo).format("YYYY-MM-DD") + '</div>' +
        '<div class="city">' +
        '<div class="from loc">' +
        '<div class="name">' + To + ' <span>pune</span></div>' +
        '<div class="weather">' +
        '<div class="icon">' +
        '<div class="drop1 drop"></div>' +
        '<div class="drop2 drop"></div>' +
        '<div class="drop3 drop"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="to loc">' +
        '<div class="name">' + From + ' <span>delhi</span></div>' +
        '<div class="weather">' +
        '<div class="icon">' +
        '<div class="sunrays ray1"></div>' +
        '<div class="sunrays ray2"></div>' +
        '<div class="sunrays ray3"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="plane"></div>' +
        '<div class="content">' +
        '<div class="gate">' + CabinTo + ' <span>Cabin</span></div>' +
        '<div class="gate"></div>' +
        '<div class="gate">' + moment(DateTo).format("HH:mm") + ' <span>departure</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="seat-layout">' +
        '<div class="content">' +
        '<div class="close"><i class="fa fa-remove fa-2x"></i></div>' +
        '<div class="gate">2B <span>gate</span></div>' +
        '<div class="seat">16B <span>seat</span></div>' +
        '<div class="boarding">12:20PM <span>boarding</span></div>' +
        '<div class="departure">12:50PM <span>departure</span></div>' +
        '<div class="flight">GO181 <span>flight</span></div>' +
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
    }).then((result) => {
      // if (result.isConfirmed) {

      //   if (sessionStorage.getItem('AuthenticationState') === "UserAuthenticated") {
      //               history.push({
      //                 pathname: '/UserConfirmBooking',
      //               state: {
      //                 flight1: isdepart,
      //                 flight2: isreturn,
      //                 CabinFrom: Data.CabinDepart,
      //                 CabinTo: Data.CabinDepart,
      //                 Adults: Data.Adults,
      //                 Children: Data.Children,
      //               }
      //               });
      //            }

      // else{
      //     swalWithBootstrapButtons.fire(
      //       {
      //       title: 'Please Log In to continue',
      //       // text: 'Please Log In to continue',
      //       icon: 'warning',
      //       confirmButtonText: 'Log In',
      //       confirmButtonColor: '#ff8300',
      //       // iconColor:'#ff8300' ,
      //     })
      //       .then((res) => {
      //            if(res.isConfirmed){
      //               console.log('confirm');
      //               window.open("UserLogin", "_self");

      //           }    
      //       });
      //     }
      //   } 
      // else if (
      //   /* Read more about handling dismissals below */
      //   result.dismiss === Swal.DismissReason.cancel
      // ) {

      // }
    })


  };

















  if (Reservations) {

    if (from) {
      return (
        <>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}

            width={800}
            height={100}
            footer={null}

          >

            <div class="wrapper">
              <div class="qr">
                <div class="title99">boarding pass</div>
                <div class="qr-wrapper">
                  <div class="qr-image"></div>
                </div>
                <a href="#">expand</a>
              </div>
              <div class="inner-wrapper">
                <div class="details">
                  <div class="date">{moment(Reserv.Flight_DateFrom).format("DD-MM-YYYY")}</div>
                  <div class="city">
                    <div class="from loc">
                      <div class="name">{Reserv.Flight_From}</div>
                      <div class="weather">
                        <div class="icon99">
                          <div class="drop1 drop"></div>
                          <div class="drop2 drop"></div>
                          <div class="drop3 drop"></div>
                        </div>
                      </div>
                    </div>
                    <div class="to loc">
                      <div class="name">{Reserv.Flight_To}</div>
                      <div class="weather">
                        <div class="icon99">
                          <div class="sunrays ray1"></div>
                          <div class="sunrays ray2"></div>
                          <div class="sunrays ray3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="planeNew"></div>
                  <div class="contentNew">
                    <div class="gate">{Terminal}<span>Terminal</span></div>
                    <div class="seat2" id="Selected-Seat2">{DisplayedSeat}<span>seat</span></div>
                    <div class="departure">{moment(Reserv.Flight_DateFrom).format("HH:mm")}<span>departure</span></div>
                  </div>
                </div>
                <div class="seat-layout">
                  <div class="contentNew">
                    <div class="close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></div>
                    <div class="gate">{Terminal}<span>Terminal</span></div>
                    <div class="seat2" id="Selected-Seat">{DisplayedSeat}<span>seat</span></div>
                    <div class="boarding">{BoardingTime}<span>boarding</span></div>
                    <div class="departure">{moment(Reserv.Flight_DateFrom).format("HH:mm")}<span>departure</span></div>
                    <div class="flight">{Reserv.Flight_NoFrom}<span>flight</span></div>
                  </div>





                  <div class="layout">
                    <div class="grid">
                      <div class="front-lav"></div>



                      <div class="business">

                        <div class="rowB row0">
                          <div class="col col1B">
                            <div class="rowname2">A</div>
                            <div class="rowname2">B</div>
                          </div>
                          <div class="col col2B">
                            <div class="rowname2">C</div>
                            <div class="rowname2">D</div>
                          </div>
                        </div>

                        <div class="row row0">
                          <div class="rownumber">1</div>
                          <div class="col col1">
                            <div class="seat " name="1" id="A1"></div>
                            <div class="seat " name="2" id="B1"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="3" id="C1"></div>
                            <div class="seat " name="4" id="D1"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">2</div>
                          <div class="col col1">
                            <div class="seat " name="5" id="A2"></div>
                            <div class="seat " name="6" id="B2"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="7" id="C2"></div>
                            <div class="seat " name="8" id="D2"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">3</div>
                          <div class="col col1">
                            <div class="seat " name="9" id="A3"></div>
                            <div class="seat " name="10" id="B3"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="11" id="C3"></div>
                            <div class="seat " name="12" id="D3"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">4</div>
                          <div class="col col1">
                            <div class="seat " name="13" id="A4"></div>
                            <div class="seat " name="14" id="B4"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="15" id="C4"></div>
                            <div class="seat " name="16" id="D4"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">5</div>
                          <div class="col col1">
                            <div class="seat " name="17" id="A5"></div>
                            <div class="seat " name="18" id="B5"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="19" id="C5"></div>
                            <div class="seat " name="20" id="D5"></div>
                          </div>
                        </div>




                      </div>


                      <div class="eco">
                        <div class="rowL row0">
                          <div class="col col1L">
                            <div class="rowname">A</div>
                            <div class="rowname">B</div>
                            <div class="rowname">C</div>
                          </div>
                          <div class="col col2L">
                            <div class="rowname">D</div>
                            <div class="rowname">E</div>
                            <div class="rowname">F</div>
                          </div>
                        </div>
                        <div class="row row1">
                          <div class="rownumber">6</div>
                          <div class="col col1">
                            <div class="seat " name="21" id="A6"></div>
                            <div class="seat " name="22" id="B6"></div>
                            <div class="seat " name="23" id="C6"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="24" id="D6"></div>
                            <div class="seat " name="25" id="E6"></div>
                            <div class="seat " name="26" id="F6"></div>
                          </div>
                        </div>
                        <div class="row row2">
                          <div class="rownumber">7</div>
                          <div class="col col1">
                            <div class="seat " name="27" id="A7"></div>
                            <div class="seat " name="28" id="B7"></div>
                            <div class="seat " name="29" id="C7"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="30" id="D7"></div>
                            <div class="seat " name="31" id="E7"></div>
                            <div class="seat " name="32" id="F7"></div>
                          </div>
                        </div>
                        <div class="row row3">
                          <div class="rownumber">8</div>
                          <div class="col col1">
                            <div class="seat " name="33" id="A8"></div>
                            <div class="seat " name="34" id="B8"></div>
                            <div class="seat " name="35" id="C8"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="36" id="D8"></div>
                            <div class="seat " name="37" id="E8"></div>
                            <div class="seat " name="38" id="F8"></div>
                          </div>
                        </div>
                        <div class="row row4">
                          <div class="rownumber">9</div>
                          <div class="col col1">
                            <div class="seat " name="39" id="A9"></div>
                            <div class="seat " name="40" id="B9"></div>
                            <div class="seat " name="41" id="C9"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="42" id="D9"></div>
                            <div class="seat " name="43" id="E9"></div>
                            <div class="seat " name="44" id="F9"></div>
                          </div>
                        </div>
                        <div class="row row5">
                          <div class="rownumber">10</div>
                          <div class="col col1">
                            <div class="seat " name="45" id="A10"></div>
                            <div class="seat " name="46" id="B10"></div>
                            <div class="seat " name="47" id="C10"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="48" id="D10"></div>
                            <div class="seat " name="49" id="E10"></div>
                            <div class="seat " name="50" id="F10"></div>
                          </div>
                        </div>

                        <div class="row row6">
                          <div class="rownumber">11</div>
                          <div class="col col1">
                            <div class="seat " name="51" id="A11"></div>
                            <div class="seat " name="52" id="B11"></div>
                            <div class="seat " name="53" id="C11"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="54" id="D11"></div>
                            <div class="seat " name="55" id="E11"></div>
                            <div class="seat " name="56" id="F11"></div>
                          </div>
                        </div>


                        <div class="row row7">
                          <div class="rownumber">12</div>
                          <div class="col col1">
                            <div class="seat " name="57" id="A12"></div>
                            <div class="seat " name="58" id="B12"></div>
                            <div class="seat " name="59" id="C12"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="60" id="D12"></div>
                            <div class="seat " name="61" id="E12"></div>
                            <div class="seat " name="62" id="F12"></div>
                          </div>
                        </div>
                        <div class="row row8">
                          <div class="rownumber">13</div>
                          <div class="col col1">
                            <div class="seat " name="63" id="A13"></div>
                            <div class="seat " name="64" id="B13"></div>
                            <div class="seat " name="65" id="C13"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="66" id="D13"></div>
                            <div class="seat " name="67" id="E13"></div>
                            <div class="seat " name="68" id="F13"></div>
                          </div>
                        </div>
                        <div class="row row9">
                          <div class="rownumber">14</div>
                          <div class="col col1">
                            <div class="seat " name="69" id="A14"></div>
                            <div class="seat " name="70" id="B14"></div>
                            <div class="seat " name="71" id="C14"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="72" id="D14"></div>
                            <div class="seat " name="73" id="E14"></div>
                            <div class="seat " name="74" id="F14"></div>
                          </div>
                        </div>
                        <div class="row row10">
                          <div class="rownumber">15</div>
                          <div class="col col1">
                            <div class="seat " name="75" id="A15"></div>
                            <div class="seat " name="76" id="B15"></div>
                            <div class="seat " name="77" id="C15"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="78" id="D15"></div>
                            <div class="seat " name="79" id="E15"></div>
                            <div class="seat " name="80" id="F15"></div>
                          </div>
                        </div>
                        <div class="row row11">
                          <div class="rownumber">16</div>
                          <div class="col col1">
                            <div class="seat " name="81" id="A16"></div>
                            <div class="seat " name="82" id="B16"></div>
                            <div class="seat " name="83" id="C16"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="84" id="D16"></div>
                            <div class="seat " name="85" id="E16"></div>
                            <div class="seat " name="86" id="F16"></div>
                          </div>
                        </div>
                        <div class="row row12">
                          <div class="rownumber">17</div>
                          <div class="col col1">
                            <div class="seat " name="87" id="A17"></div>
                            <div class="seat " name="88" id="B17"></div>
                            <div class="seat " name="89" id="C17"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="90" id="D17"></div>
                            <div class="seat " name="91" id="E17"></div>
                            <div class="seat " name="92" id="F17"></div>
                          </div>
                        </div>
                        <div class="row row13">
                          <div class="rownumber">18</div>
                          <div class="col col1">
                            <div class="seat " name="93" id="A18"></div>
                            <div class="seat " name="94" id="B18"></div>
                            <div class="seat " name="95" id="C18"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="96" id="D18"></div>
                            <div class="seat " name="97" id="E18"></div>
                            <div class="seat " name="98" id="F18"></div>
                          </div>
                        </div>
                        <div class="row row14">
                          <div class="rownumber">19</div>
                          <div class="col col1">
                            <div class="seat " name="99" id="A19"></div>
                            <div class="seat " name="100" id="B19"></div>
                            <div class="seat " name="101" id="C19"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="102" id="D19"></div>
                            <div class="seat " name="103" id="E19"></div>
                            <div class="seat " name="104" id="F19"></div>
                          </div>
                        </div>
                        <div class="row row15">
                          <div class="rownumber">20</div>
                          <div class="col col1">
                            <div class="seat " name="105" id="A20"></div>
                            <div class="seat " name="106" id="B20"></div>
                            <div class="seat " name="107" id="C20"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="108" id="D20"></div>
                            <div class="seat " name="109" id="E20"></div>
                            <div class="seat " name="110" id="F20"></div>
                          </div>
                        </div>
                        <div class="row row16">
                          <div class="rownumber">21</div>
                          <div class="col col1">
                            <div class="seat " name="111" id="A21" ></div>
                            <div class="seat " name="112" id="B21"></div>
                            <div class="seat " name="113" id="C21"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="114" id="D21"></div>
                            <div class="seat " name="115" id="E21"></div>
                            <div class="seat " name="116" id="F21"></div>
                          </div>
                        </div>
                        <div class="row row17">
                          <div class="rownumber">22</div>
                          <div class="col col1">
                            <div class="seat " name="117" id="A22"></div>
                            <div class="seat " name="118" id="B22"></div>
                            <div class="seat " name="119" id="C22"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="120" id="D22"></div>
                            <div class="seat " name="121" id="E22"></div>
                            <div class="seat " name="122" id="F22"></div>
                          </div>
                        </div>
                        <div class="row row18">
                          <div class="rownumber">23</div>
                          <div class="col col1">
                            <div class="seat " name="123" id="A23"></div>
                            <div class="seat " name="124" id="B23"></div>
                            <div class="seat " name="125" id="C23"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="126" id="D23"></div>
                            <div class="seat " name="127" id="E23"></div>
                            <div class="seat " name="128" id="F23"></div>
                          </div>
                        </div>


                        <div class="row row19">
                          <div class="rownumber">24</div>
                          <div class="col col1">
                            <div class="seat " name="129" id="A24"></div>
                            <div class="seat " name="130" id="B24"></div>
                            <div class="seat " name="131" id="C24"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="132" id="D24"></div>
                            <div class="seat " name="133" id="E24"></div>
                            <div class="seat " name="134" id="F24"></div>
                          </div>
                        </div>

                        <div class="row row20">
                          <div class="rownumber">25</div>
                          <div class="col col1">
                            <div class="seat " name="135" id="A25"></div>
                            <div class="seat " name="136" id="B25"></div>
                            <div class="seat " name="137" id="C25"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="138" id="D25"></div>
                            <div class="seat " name="139" id="E25"></div>
                            <div class="seat " name="140" id="F25"></div>
                          </div>
                        </div>



                      </div>
                      <div class="rear-lav"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


          </Modal>

          <div class="site-mobile-menu">
            <div class="site-mobile-menu-header">
              <div class="site-mobile-menu-close mt-3">
                <span class="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div class="site-mobile-menu-body"></div>
          </div>

          <header class="site-navbar" role="banner">

            <div class="container">
              <div class=" align-items-center row">

                <div class="col-11 col-xl-2">
                  <img src='https://i.ibb.co/0q5z6Jv/e0f7973e78414b2bb23ad01e5f3a88bb-removebg-preview.png' alt='Visit Computer Hope'></img>
                  {/* <h1 class="mb-0 site-logo"><a href="index.html" class="text-white mb-0">Brand</a></h1> */}
                </div>
                <div class="col-12 col-md-10 d-none d-xl-block">
                  <nav class="site-navigation position-relative text-right" role="navigation">

                    <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li ><a onClick={(e) => SearchFlightHandler(e)}><span>Home Page</span></a></li>


                      <li><a onClick={(e) => AboutUs()}><span>About Us</span></a></li>
                      <li><a onClick={(e) => Vision()}><span>Our Vision</span></a></li>
                      <li><a onClick={(e) => ContactUs()}><span>Contact Us</span></a></li>
                      <li><a onClick={() => LogOutHandler()} ><span>Log Out</span></a></li>

                    </ul>
                  </nav>
                </div>


                <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" ><a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a></div>

              </div>

            </div>

          </header>

          <div class="s022">
            <form>
              <fieldset>

              </fieldset>
              <div class="inner-form">
                <header>
                  <label class="center2">Manage Flights</label>
                  <div class="travel-type-wrap">

                    <button type="button" class="item " onClick={(e) => SearchFlightHandler(e)}>
                      <div class="group-icon">
                        <svg width="70px" height="70px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                          <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)" />
                        </svg>
                      </div>
                      <span>Reserve Flight</span>
                    </button>

                    <button class="item active" type="button" >
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

                {/* SDD    LINE 1666 IN MAIN.CSS*/}





                <div class="box d2">
                  <label class="center">BoardingPass for All Passengers</label>

                  <div class="box f2">

                    {Reservations.map(reserv =>
                      <div>
                        {/* //loop will be created here inside the box f2 :D*/}


                        <div class="listing-item1111">
                          <figure class="image">
                            <img src="https://i.ibb.co/310TmM6/white-desert-national-park.jpg" alt="image"></img>
                            <figcaption>
                              <div class="caption">
                                <h12>{reserv.FirstName} {reserv.LastName}</h12>
                                <p>Flight Number:{reserv.Flight_NoFrom}</p>
                              </div>
                            </figcaption>
                          </figure>
                          <div class="listing">
                            {/* <h4>First Name: {reserv.FirstName} </h4>
                            <h4>Last Name: {reserv.LastName}</h4> */}
                            <h4>Flight Date: {moment(reserv.Flight_DateFrom).format("DD-MM-YYYY")}</h4>
                            <h4>Depart Time: {moment(reserv.Flight_DateFrom).format("HH:mm")}</h4>
                            <h4>Cabin: {reserv.CabinFrom}</h4>
                            <h4>Seat: {reserv.SeatsChoosenFrom}</h4>
                            {/* <a class="pricing-button" name={flight._id}  onClick={() => departHandler(flight)} >BOOK NOW!</a> */}
                            {/* <a  class="button-111" role="button" onClick={scrollToBottom} >SELECT SEAT</a> */}
                            <Link class="button-111" role="button" to="SeatMap" onClick={() => parentToChild(reserv, true)} smooth={true}>Select Seat</Link>
                            <Link class="button-111" role="button" onClick={() => Editdeparthandler(reserv)} smooth={true}>Edit Flight</Link>
                            <Link class="button-11122" role="button"  onClick={() => ConfirmDelete(reserv._id, reserv.FromPrice, reserv.Email, reserv)}  smooth={true}>Cancel Reservation</Link>


                          </div>
                        </div>


                      </div>

                    )}

                  </div>






                </div>


              </div>
            </form>
          </div>


          {/* <script src="js/extention/choices.js"></script>    */}

          {/* < div class="modal-container" id="modal-opened">
   <div class="modal"> */}

          <script src="js/extention/choices.js"></script>






          {/* </div>
</div> */}





        </>
      );

    }
    else {
      return (
        <>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}

            width={800}
            height={100}
            footer={null}

          >
              <div class="wrapper">
              <div class="qr">
                <div class="title99">boarding pass</div>
                <div class="qr-wrapper">
                  <div class="qr-image"></div>
                </div>
                <a href="#">expand</a>
              </div>
              <div class="inner-wrapper">
                <div class="details">
                  <div class="date">{moment(Reserv.Flight_DateTo).format("DD-MM-YYYY")}</div>
                  <div class="city">
                    <div class="from loc">
                      <div class="name">{Reserv.Flight_To}</div>
                      <div class="weather">
                        <div class="icon99">
                          <div class="drop1 drop"></div>
                          <div class="drop2 drop"></div>
                          <div class="drop3 drop"></div>
                        </div>
                      </div>
                    </div>
                    <div class="to loc">
                      <div class="name">{Reserv.Flight_From}</div>
                      <div class="weather">
                        <div class="icon99">
                          <div class="sunrays ray1"></div>
                          <div class="sunrays ray2"></div>
                          <div class="sunrays ray3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="planeNew"></div>
                  <div class="contentNew">
                    <div class="gate">{Terminal}<span>Terminal</span></div>
                    <div class="seat2" id="Selected-Seat2">{DisplayedSeat}<span>seat</span></div>
                    <div class="departure">{moment(Reserv.Flight_DateTo).format("HH:mm")}<span>departure</span></div>
                  </div>
                </div>
                <div class="seat-layout">
                  <div class="contentNew">
                    <div class="close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></div>
                    <div class="gate">{Terminal}<span>Terminal</span></div>
                    <div class="seat2" id="Selected-Seat">{DisplayedSeat}<span>seat</span></div>
                    <div class="boarding">{BoardingTime}<span>boarding</span></div>
                    <div class="departure">{moment(Reserv.Flight_DateTo).format("HH:mm")}<span>departure</span></div>
                    <div class="flight">{Reserv.Flight_NoTo}<span>flight</span></div>
                  </div>



                  <div class="layout">
                    <div class="grid">
                      <div class="front-lav"></div>



                      <div class="business">

                        <div class="rowB row0">
                          <div class="col col1B">
                            <div class="rowname2">A</div>
                            <div class="rowname2">B</div>
                          </div>
                          <div class="col col2B">
                            <div class="rowname2">C</div>
                            <div class="rowname2">D</div>
                          </div>
                        </div>

                        <div class="row row0">
                          <div class="rownumber">1</div>
                          <div class="col col1">
                            <div class="seat " name="1" id="A1"></div>
                            <div class="seat " name="2" id="B1"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="3" id="C1"></div>
                            <div class="seat " name="4" id="D1"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">2</div>
                          <div class="col col1">
                            <div class="seat " name="5" id="A2"></div>
                            <div class="seat " name="6" id="B2"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="7" id="C2"></div>
                            <div class="seat " name="8" id="D2"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">3</div>
                          <div class="col col1">
                            <div class="seat " name="9" id="A3"></div>
                            <div class="seat " name="10" id="B3"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="11" id="C3"></div>
                            <div class="seat " name="12" id="D3"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">4</div>
                          <div class="col col1">
                            <div class="seat " name="13" id="A4"></div>
                            <div class="seat " name="14" id="B4"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="15" id="C4"></div>
                            <div class="seat " name="16" id="D4"></div>
                          </div>
                        </div>


                        <div class="row row0">
                          <div class="rownumber">5</div>
                          <div class="col col1">
                            <div class="seat " name="17" id="A5"></div>
                            <div class="seat " name="18" id="B5"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="19" id="C5"></div>
                            <div class="seat " name="20" id="D5"></div>
                          </div>
                        </div>




                      </div>


                      <div class="eco">
                        <div class="rowL row0">
                          <div class="col col1L">
                            <div class="rowname">A</div>
                            <div class="rowname">B</div>
                            <div class="rowname">C</div>
                          </div>
                          <div class="col col2L">
                            <div class="rowname">D</div>
                            <div class="rowname">E</div>
                            <div class="rowname">F</div>
                          </div>
                        </div>
                        <div class="row row1">
                          <div class="rownumber">6</div>
                          <div class="col col1">
                            <div class="seat " name="21" id="A6"></div>
                            <div class="seat " name="22" id="B6"></div>
                            <div class="seat " name="23" id="C6"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="24" id="D6"></div>
                            <div class="seat " name="25" id="E6"></div>
                            <div class="seat " name="26" id="F6"></div>
                          </div>
                        </div>
                        <div class="row row2">
                          <div class="rownumber">7</div>
                          <div class="col col1">
                            <div class="seat " name="27" id="A7"></div>
                            <div class="seat " name="28" id="B7"></div>
                            <div class="seat " name="29" id="C7"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="30" id="D7"></div>
                            <div class="seat " name="31" id="E7"></div>
                            <div class="seat " name="32" id="F7"></div>
                          </div>
                        </div>
                        <div class="row row3">
                          <div class="rownumber">8</div>
                          <div class="col col1">
                            <div class="seat " name="33" id="A8"></div>
                            <div class="seat " name="34" id="B8"></div>
                            <div class="seat " name="35" id="C8"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="36" id="D8"></div>
                            <div class="seat " name="37" id="E8"></div>
                            <div class="seat " name="38" id="F8"></div>
                          </div>
                        </div>
                        <div class="row row4">
                          <div class="rownumber">9</div>
                          <div class="col col1">
                            <div class="seat " name="39" id="A9"></div>
                            <div class="seat " name="40" id="B9"></div>
                            <div class="seat " name="41" id="C9"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="42" id="D9"></div>
                            <div class="seat " name="43" id="E9"></div>
                            <div class="seat " name="44" id="F9"></div>
                          </div>
                        </div>
                        <div class="row row10">
                          <div class="rownumber">10</div>
                          <div class="col col1">
                            <div class="seat " name="45" id="A10"></div>
                            <div class="seat " name="46" id="B10"></div>
                            <div class="seat " name="47" id="C10"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="48" id="D10"></div>
                            <div class="seat " name="49" id="E10"></div>
                            <div class="seat " name="50" id="F10"></div>
                          </div>
                        </div>
                        <div class="row row6">
                          <div class="rownumber">11</div>
                          <div class="col col1">
                            <div class="seat " name="51" id="A11"></div>
                            <div class="seat " name="52" id="B11"></div>
                            <div class="seat " name="53" id="C11"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="54" id="D11"></div>
                            <div class="seat " name="55" id="E11"></div>
                            <div class="seat " name="56" id="F11"></div>
                          </div>
                        </div>
                        <div class="row row7">
                          <div class="rownumber">12</div>
                          <div class="col col1">
                            <div class="seat " name="57" id="A12"></div>
                            <div class="seat " name="58" id="B12"></div>
                            <div class="seat " name="59" id="C12"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="60" id="D12"></div>
                            <div class="seat " name="61" id="E12"></div>
                            <div class="seat " name="62" id="F12"></div>
                          </div>
                        </div>
                        <div class="row row8">
                          <div class="rownumber">13</div>
                          <div class="col col1">
                            <div class="seat " name="63" id="A13"></div>
                            <div class="seat " name="64" id="B13"></div>
                            <div class="seat " name="65" id="C13"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="66" id="D13"></div>
                            <div class="seat " name="67" id="E13"></div>
                            <div class="seat " name="68" id="F13"></div>
                          </div>
                        </div>
                        <div class="row row9">
                          <div class="rownumber">14</div>
                          <div class="col col1">
                            <div class="seat " name="69" id="A14"></div>
                            <div class="seat " name="70" id="B14"></div>
                            <div class="seat " name="71" id="C14"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="72" id="D14"></div>
                            <div class="seat " name="73" id="E14"></div>
                            <div class="seat " name="74" id="F14"></div>
                          </div>
                        </div>
                        <div class="row row10">
                          <div class="rownumber">15</div>
                          <div class="col col1">
                            <div class="seat " name="75" id="A15"></div>
                            <div class="seat " name="76" id="B15"></div>
                            <div class="seat " name="77" id="C15"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="78" id="D15"></div>
                            <div class="seat " name="79" id="E15"></div>
                            <div class="seat " name="80" id="F15"></div>
                          </div>
                        </div>
                        <div class="row row11">
                          <div class="rownumber">16</div>
                          <div class="col col1">
                            <div class="seat " name="81" id="A16"></div>
                            <div class="seat " name="82" id="B16"></div>
                            <div class="seat " name="83" id="C16"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="84" id="D16"></div>
                            <div class="seat " name="85" id="E16"></div>
                            <div class="seat " name="86" id="F16"></div>
                          </div>
                        </div>
                        <div class="row row12">
                          <div class="rownumber">17</div>
                          <div class="col col1">
                            <div class="seat " name="87" id="A17"></div>
                            <div class="seat " name="88" id="B17"></div>
                            <div class="seat " name="89" id="C17"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="90" id="D17"></div>
                            <div class="seat " name="91" id="E17"></div>
                            <div class="seat " name="92" id="F17"></div>
                          </div>
                        </div>
                        <div class="row row13">
                          <div class="rownumber">18</div>
                          <div class="col col1">
                            <div class="seat " name="93" id="A18"></div>
                            <div class="seat " name="94" id="B18"></div>
                            <div class="seat " name="95" id="C18"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="96" id="D18"></div>
                            <div class="seat " name="97" id="E18"></div>
                            <div class="seat " name="98" id="F18"></div>
                          </div>
                        </div>
                        <div class="row row14">
                          <div class="rownumber">19</div>
                          <div class="col col1">
                            <div class="seat " name="99" id="A19"></div>
                            <div class="seat " name="100" id="B19"></div>
                            <div class="seat " name="101" id="C19"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="102" id="D19"></div>
                            <div class="seat " name="103" id="E19"></div>
                            <div class="seat " name="104" id="F19"></div>
                          </div>
                        </div>
                        <div class="row row15">
                          <div class="rownumber">20</div>
                          <div class="col col1">
                            <div class="seat " name="105" id="A20"></div>
                            <div class="seat " name="106" id="B20"></div>
                            <div class="seat " name="107" id="C20"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="108" id="D20"></div>
                            <div class="seat " name="109" id="E20"></div>
                            <div class="seat " name="110" id="F20"></div>
                          </div>
                        </div>
                        <div class="row row16">
                          <div class="rownumber">21</div>
                          <div class="col col1">
                            <div class="seat " name="111" id="A21" ></div>
                            <div class="seat " name="112" id="B21"></div>
                            <div class="seat " name="113" id="C21"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="114" id="D21"></div>
                            <div class="seat " name="115" id="E21"></div>
                            <div class="seat " name="116" id="F21"></div>
                          </div>
                        </div>
                        <div class="row row17">
                          <div class="rownumber">22</div>
                          <div class="col col1">
                            <div class="seat " name="117" id="A22"></div>
                            <div class="seat " name="118" id="B22"></div>
                            <div class="seat " name="119" id="C22"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="120" id="D22"></div>
                            <div class="seat " name="121" id="E22"></div>
                            <div class="seat " name="122" id="F22"></div>
                          </div>
                        </div>
                        <div class="row row18">
                          <div class="rownumber">23</div>
                          <div class="col col1">
                            <div class="seat " name="123" id="A23"></div>
                            <div class="seat " name="124" id="B23"></div>
                            <div class="seat " name="125" id="C23"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="126" id="D23"></div>
                            <div class="seat " name="127" id="E23"></div>
                            <div class="seat " name="128" id="F23"></div>
                          </div>
                        </div>


                        <div class="row row19">
                          <div class="rownumber">24</div>
                          <div class="col col1">
                            <div class="seat " name="129" id="A24"></div>
                            <div class="seat " name="130" id="B24"></div>
                            <div class="seat " name="131" id="C24"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="132" id="D24"></div>
                            <div class="seat " name="133" id="E24"></div>
                            <div class="seat " name="134" id="F24"></div>
                          </div>
                        </div>

                        <div class="row row20">
                          <div class="rownumber">25</div>
                          <div class="col col1">
                            <div class="seat " name="135" id="A25"></div>
                            <div class="seat " name="136" id="B25"></div>
                            <div class="seat " name="137" id="C25"></div>
                          </div>
                          <div class="col col2">
                            <div class="seat " name="138" id="D25"></div>
                            <div class="seat " name="139" id="E25"></div>
                            <div class="seat " name="140" id="F25"></div>
                          </div>
                        </div>



                      </div>
                      <div class="rear-lav"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>



          </Modal>

          <div class="site-mobile-menu">
            <div class="site-mobile-menu-header">
              <div class="site-mobile-menu-close mt-3">
                <span class="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div class="site-mobile-menu-body"></div>
          </div>

          <header class="site-navbar" role="banner">

            <div class="container">
              <div class=" align-items-center row">

                <div class="col-11 col-xl-2">
                  <img src='https://i.ibb.co/0q5z6Jv/e0f7973e78414b2bb23ad01e5f3a88bb-removebg-preview.png' alt='Visit Computer Hope'></img>
                  {/* <h1 class="mb-0 site-logo"><a href="index.html" class="text-white mb-0">Brand</a></h1> */}
                </div>
                <div class="col-12 col-md-10 d-none d-xl-block">
                  <nav class="site-navigation position-relative text-right" role="navigation">

                    <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li ><a onClick={(e) => SearchFlightHandler(e)}><span>Home Page</span></a></li>


                      <li><a onClick={(e) => AboutUs()}><span>About Us</span></a></li>
                      <li><a onClick={(e) => Vision()}><span>Our Vision</span></a></li>
                      <li><a onClick={(e) => ContactUs()}><span>Contact Us</span></a></li>
                      <li><a onClick={() => LogOutHandler()} ><span>Log Out</span></a></li>

                    </ul>
                  </nav>
                </div>


                <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" ><a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a></div>

              </div>

            </div>

          </header>

          <div class="s022">
            <form>
              <fieldset>

              </fieldset>
              <div class="inner-form">
                <header>
                  <label class="center2">Manage Flights</label>
                  <div class="travel-type-wrap">

                    <button type="button" class="item " onClick={(e) => SearchFlightHandler(e)}>
                      <div class="group-icon">
                        <svg width="70px" height="70px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                          <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)" />
                        </svg>
                      </div>
                      <span>Reserve Flight</span>
                    </button>

                    <button class="item active" type="button" >
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

                {/* SDD    LINE 1666 IN MAIN.CSS*/}





                <div class="box d2">
                  <label class="center">BoardingPass for All Passengers</label>

                  <div class="box f2">

                    {Reservations.map(reserv =>
                      <div>
                        {/* //loop will be created here inside the box f2 :D*/}


                        <div class="listing-item1111">
                          <figure class="image">
                            <img src="https://i.ibb.co/310TmM6/white-desert-national-park.jpg" alt="image"></img>
                            <figcaption>
                              <div class="caption">
                                <h12>{reserv.FirstName} {reserv.LastName}</h12>
                                <p>Flight Number:{reserv.Flight_NoTo}</p>
                              </div>
                            </figcaption>
                          </figure>
                          <div class="listing">
                            <h4>Flight Date: {moment(reserv.Flight_DateTo).format("DD-MM-YYYY")}</h4>
                            <h4>Depart Time: {moment(reserv.Flight_DateTo).format("HH:mm")}</h4>
                            <h4>Cabin: {reserv.CabinTo}</h4>
                            <h4>Seat: {reserv.SeatsChoosenTo}</h4>
                            {/* <a class="pricing-button" name={flight._id}  onClick={() => departHandler(flight)} >BOOK NOW!</a> */}
                            {/* <a href="#modal-opened" class="link-1" id="modal-closed">Reserve Flight</a> */}
                            {/* <a  class="button-111" role="button"  >SELECT SEAT</a> */}
                            {/* <button  class="button-111" role="button" onClick={scrollToBottom}>SELECT SEAT</button> */}
                            {/* spy={true} */}
                            <Link class="button-111" role="button" to="SeatMap" onClick={() => parentToChild(reserv, false)} smooth={true}>Select Seat</Link>
                            <Link class="button-111" role="button" onClick={() => Editreturnhandler(reserv)} smooth={true}>Edit Flight</Link>
                            <Link class="button-11122" role="button"  onClick={() => ConfirmDelete(reserv._id, reserv.ToPrice, reserv.Email, reserv)} smooth={true}>Cancel Reservation</Link>


                          </div>
                        </div>


                        {/* on click will send reservation number + total price refunded
                        <div class="listing-item99">
                          <button type="button" onClick={() => ConfirmDelete(reserv._id, reserv.TotalPrice, reserv.Email, reserv)} class="button-70" >
                            <div class="center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                              </svg>
                            </div>
                            Cancel Reservation
                          </button>



                        </div>
                        <div class="listing-item99">
                          <button type="button" onClick={() => Showboarding(reserv.Flight_DateFrom, reserv.Flight_DateTo, reserv.Flight_From, reserv.Flight_To, reserv.CabinFrom, reserv.CabinTo, reserv)} class="button-100" >
                            <div class="center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-ticket-detailed-fill" viewBox="0 0 16 16">
                                <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z" />
                              </svg>
                            </div>
                            Show Boardingpass
                          </button>



                        </div> */}


                      </div>

                    )}

                  </div>






                </div>


              </div>
            </form>
          </div>


          {/* <script src="js/extention/choices.js"></script>    */}

          {/* < div class="modal-container" id="modal-opened">
   <div class="modal"> */}

          <script src="js/extention/choices.js"></script>






          {/* </div>
</div> */}





        </>
      );
    }

  }


  return (<h1></h1>)





};

{/* <div id="app"></div> 
  ReactDOM.render(<UserManageBooking />, document.querySelector("#app")); */}

export default UserSelectSeat;

