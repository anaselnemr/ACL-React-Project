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
import '../css/popup.css';
import '../css/main.css';
import '../css/guest.css';
import '../css/SelectSeat.scss';
import '../css/header.css';
import '../css/BoardingPass.scss';
import '../css/pass.scss';
 import '../css/headerfinal.css';
 import '../css/SeatplusBoarding.css';

 import '../css/FinalPopUp.css';
 import $ from "jquery"; 
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
  Switch,
  message,
  Mentions
} from 'antd';


$(document).ready(function() {
    var qrWidth, qrHeight; 
    
    //fluid height of wrapper
    function resizeWrapper(){    
      var wrapper = $('.wrapperNew');
      var wrapperWidth = wrapper.css('width');
      if($.trim($('.wrapperNew').attr('width')) != ''){
      var wrapperheight = parseInt(wrapperWidth.substring(0,wrapperWidth.length-2))/2.5;
      }
      wrapper.css('height', wrapperheight + 'px');
      
      if(!$('.qr').hasClass('expand')){
        qrWidth = $('.qr').css('width');
        qrHeight = $('.qr').css('height');
        if($.trim($('.qr').attr('width')) != ''){
        qrWidth = parseInt(qrWidth.substring(0, qrWidth.length-2));
        }
        if($.trim($('.qr').attr('height')) != ''){
        qrHeight = parseInt(qrHeight.substring(0, qrHeight.length-2));
        }
      }
    }  
    
    function resizeQr(type){
      var qrWrapper = $('.qr-wrapper');
      if(type === 'down'){
       qrWrapper.css('height', (qrHeight * 0.38) + 'px');
       qrWrapper.css('width', (qrWidth * 0.5) + 'px');
      
      }
      else{
        qrWrapper.css('height', (qrHeight * 0.53) + 'px');
       qrWrapper.css('width', (qrWidth * 0.7) + 'px');
     
      }
    }
    
    $(window).resize(function() {
      resizeWrapper();
      resizeQr('down'); 
    });
    resizeWrapper();
    
    //Expand QR
    $('body').on('click', '.qr', function(){//delegated
      console.log("funccccc")
      $(this).toggleClass('expand');
      if($(this).hasClass('expand')){
        console.log("ifff")
        resizeQr('up'); 
        $('.qr a').text('collapse');
      }
      else{
        console.log("elssee")
        resizeQr('down'); 
        $('.qr a').text('expand');
      }
    });
    $('body').on('click', '.seat2', function(){//delegated
      console.log("hereeee")
      console.log("hereeee")
      $('.inner-wrapper').addClass('seat-details');
      $('.inner-wrapper').removeClass('boarding-pass');
    });
    
    $('body').on('click', '.seat-layout .close', function(){//delegated
      $('.inner-wrapper').addClass('boarding-pass');
      $('.inner-wrapper').removeClass('seat-details');
    });
  })
  
  
  var pre="" ;
  var current="" ;
  
    $('body').on('click', '.seat', function(){//delegated
      // $(this).css('background-color', 'red');
      // console.log($(this)) ;
      // const source = document.getElementById("Selected-Seat");
      // const textContentOutput = document.getElementById("gate");
  
      // source.value = textContentOutput.textContent;
  
      
  
      document.getElementById("Selected-Seat").innerText = $(this).attr('id')
      document.getElementById("Selected-Seat2").innerText = $(this).attr('id')
      // var node = document.createElement("LI");
      // var dateSpan = document.createElement('span')
      // node.appendChild(dateSpan);
      // document.getElementById("Selected-Seat").appendChild(node);
  
  
      var dateSpan = document.createElement('span')
  dateSpan.innerHTML = "SEAT";
  // var li = document.createElement('li');
  // li.appendChild(dateSpan);
  document.getElementById("Selected-Seat").appendChild(dateSpan);
  
  var dateSpan2 = document.createElement('span')
  dateSpan2.innerHTML = "SEAT";
  document.getElementById("Selected-Seat2").appendChild(dateSpan2);
  
  
      console.log($(this).attr('id'));
      if(pre==""){
      current =$(this).attr('id')
      document.getElementById(current).style.backgroundColor= 'green'
      pre =$(this).attr('id')
      }
      else {
        pre =current ;
        current=$(this).attr('id') ;
        document.getElementById(current).style.backgroundColor= 'green'
        document.getElementById(pre).style.backgroundColor= 'rgba(0, 0, 0, 0.7)'
      }
      //  document.getElementById("1").style.backgroundColor= 'green';
      //  document.getElementById("1").style.backgroundColor= 'green';
   });
   $('body').on('click', '.button-new', function(){
  
    $('.pop-up').addClass('open');
  });
  
  $('body').on('click', '.close', function(){
  
    $('.pop-up').removeClass('open');
  });
  
  
// $(this).attr('id')


const UserBoarding = () => {

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
            <div class="wrap-login11100 p-l-25 p-r-25 p-t-15 p-b-15">
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-30">
                  Boarding Pass
                </span>

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
      <div class="date"></div>
      <div class="city">
        <div class="from loc">
          <div class="name"></div>
          <div class="weather">
            <div class="icon99">
              <div class="drop1 drop"></div>
              <div class="drop2 drop"></div>
              <div class="drop3 drop"></div>
            </div>
          </div>
        </div>
        <div class="to loc">
          <div class="name"></div>
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
        <div class="gate"><span>Terminal</span></div>
        <div class="seat2" id="Selected-Seat2"><span>seat</span></div>
        <div class="departure"><span>departure</span></div>
      </div>
    </div>
    <div class="seat-layout">
      <div class="contentNew">
        <div class="close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg></div>
        <div class="gate"><span>Terminal</span></div>
        <div class="seat2" id="Selected-Seat"><span>seat</span></div>
        <div class="boarding"><span>boarding</span></div>
        <div class="departure"><span>departure</span></div>
        <div class="flight"><span>flight</span></div>
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




             
                <div class="grid-container">
                <a class="button-60 center20" role="button" onClick={() => LoginHandler()}>Edit</a>
                <a class="button-60 center20" role="button" onClick={(e) => submitHandler(e)}>Delete</a>
                </div>
              
              </form>
            </div>
          </div>
        </div>








      </div>















    </>
  );
};

export default UserBoarding;
