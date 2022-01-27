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
import '../css/newSearch.css';

import '../css/header.css';

import '../css/FooterFinal.css';


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



const EditFlight = () => {

 const LogOutHandler = (e) => {
  var userid = localStorage.getItem('UserID')
 axios.delete('http://localhost:8000/logout',{data: {ID: userid}})
 localStorage.clear()
 history.push({
   pathname: '/LoginPage'
 });
};

 const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [componentSize, setComponentSize] = useState('default');
  const format = 'HH:mm';
  const [Result, setResult] = useState();
  const [Result2, setResult2] = useState();
  const [Dest, setDest] =useState({
    From: "",  
    To: "",
    Flight_Date: "", // Data type date
    Cabin: "",
  });

  const [isFlight, setFlight] = useState();


  const [isFlightbooked, setFlightbooked] = useState();

  const [Data, setState] = useState({
    From: "",  
    To: "",
    Flight_Date: "", // Data type date
    Cabin: "",
  });
  
  const reserv = history.location.state?.reservation;
  console.log(reserv)
  const isDepart = history.location.state?.depart;
  const isReturn = history.location.state?.return;

  useEffect(() => {
    // Your code here
  if(isFlightbooked){
    console.log(isFlightbooked)
  }
  if(isDepart){
 setDest({
    From: history.location.state?.from,
    To: history.location.state?.to,
    Flight_Date:Dest.Flight_Date,
    Cabin:Dest.Cabin

  });
}
  if(isReturn){
    setDest({
      From: history.location.state?.from,
      To: history.location.state?.to,
      Flight_Date:Dest.Flight_Date,
      Cabin:Dest.Cabin

    });}
}, [isFlightbooked]);

console.log(Dest)

console.log(reserv)
console.log(isDepart)
console.log(isReturn)

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };



  const changeHander = (e) => {


    console.log(moment(Dest.Flight_Date));

    setDest( prevData => {
     return {...prevData ,[e.target.name]: e.target.value}})
  };



  const searchHandler = (e) => {
    // olddate= moment(Dest.Flight_Date)
    e.preventDefault(); 
    if(isDepart){
        Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
        axios.post('http://localhost:8000/flightmap',{data: {var1 : reserv.Flight_IDTo} }, {withCredentials: true})
    .then((result)=> {
        localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          setFlightbooked(result.data[0])
          console.log(isFlightbooked)
        }).catch(error => {
            if(error.response.status==403){
                history.push({
                  pathname: '/UserLogin'
                });}
            console.log(error);
          })
        }
    else{
        Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
        Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/flightmap',{data: {var1 : reserv.Flight_IDFrom} }, {withCredentials: true})
    .then((result)=> {
        localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
         setFlightbooked(result.data[0]);
         }).catch(error => {
            if(error.response.status==403){
                history.push({
                  pathname: '/UserLogin'
                });}
           console.log(error);
          })
         }
    const criteria = {};
    var dd;

    Object.keys(Dest).forEach(key => {
   if (Dest[key]!=="") {

    if(key=='Flight_DHour'){
      criteria['Flight_Duration'] = Dest.Flight_DHour + ':';
    }
    else if(key=='Flight_DMin'){
      criteria['Flight_Duration'] += Dest.Flight_DMin +'';
     }
     else if(key!=='Flight_Duration')
     criteria[key] = Dest[key];
  
      }
    });


     criteria["Adults"] = reserv.Adults
     criteria["Children"] = reserv.Children

    console.log(criteria);
    console.log(isFlightbooked);
    console.log(Result);

    Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
    Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
    axios.post('http://localhost:8000/usersearchflight', criteria, {withCredentials: true})
    .then(response => {
        localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setResult(response.data);
       console.log(Result);
       setLoading(false);

       }).catch(error => {
        console.log(error.response.status)
        console.log(error.response.data)

        if(error.response.status==403){
            history.push({
              pathname: '/UserLogin'
            });
          }
      console.log(error);
    })


  };

  const ReservedFlightsHandler = event => {
    history.push({
       // pathname: '/UserSearchFlight',
        state: { detail: 'some_value' }
    });
 };

const EditProfileHendler = event => {
  history.push({
      pathname: '/UserEditProfile',
      state: { detail: 'some_value' }
  });
};

const FlightHandler = (flight) => {

    setFlight( flight )

}
const swalWithBootstrapButtons = Swal.mixin({
    // customClass: {
    //   confirmButton: 'btn btn-success',
    //   cancelButton: 'btn btn-danger'
    // },
    // buttonsStyling: false
  })
  const warning = () => {
    message.warning('Depart Date can not be after Return Date'+ isFlightbooked.Flight_Date);
  };
  const warning1 = () => {
    message.warning1('Return Date can not be before Depart Date'+ isFlightbooked.Flight_Date);
  };
const success = () => {



  if(isDepart){
    swalWithBootstrapButtons.fire({
    
          html:
            '<div class="card aa-theme">'+
          '<div class="card_heading">'+
                        '<div class="card_logo">'+
                            '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>'+
                        '</div>'+
                        '<img src="https://static.onecms.io/wp-content/uploads/sites/28/2021/09/14/berlin-germany-aerial-lead-BERLINTG0921.jpg" />'+
                        '<div class="card_divider">'+
                '<div class="divider_left divider_hole">'+
                '</div>'+
                '<div class="divider">'+
                '</div>'+
                '<div class="divider_right divider_hole">'+
                '</div>'+
            '</div>'+
                        '<h2>Departure Flight</h2>'+
              '<div class="inner"></div>'+
            '</div>'+
            '<div class="card_trip">'+
                '<div class="trip_from">'+
                    '<h1>'+ isFlight.From+'</h1>'+       
                '</div>'+
                '<div class="trip_icon">'+
                    '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />'+
                '</div>'+
                '<div class="trip_to">'+
                    '<h1>'+isFlight.To+'</h1>'+
                '</div>'+
            '</div>'+
            '<div class="card_divider">'+
                '<div class="divider_left divider_hole">'+
                '</div>'+
                '<div class="divider">'+
                '</div>'+
                '<div class="divider_right divider_hole">'+
                '</div>'+
            '</div>'+
          '<div class="card_flight_details">'+
            '<div class="card_seating">'+
                '<div class="seating_passenger">'+
                    '<h2>Flight Number</h2>'+
                    '<h3>'+isFlight.Flight_No+'</h3>'+
                '</div>'+
                '<div class="seating_passenger_dos">'+
                    '<h2>Passenger</h2>'+
                    '<h3>Leonardo Restrepo</h3>'+
                '</div>'+
                '<div class="seating_seat">'+
                    '<h2>Seat</h2>'+
                    '<h3>'+'---'+'</h3>'+
                '</div>'+
            '</div>'+
            '<div class="card_details">'+
                '<div class="details_flight">'+
                    '<h2>Depart Date</h2>'+
                    '<h3> '+moment(isFlight.Flight_Date).format("YYYY-MM-DD")+'</h3>'+
                '</div>'+
                '<div class="details_date">'+
                    '<h2>Depart Time</h2>'+
                    '<h3>'+moment(isFlight.Flight_Date).format("HH:mm")+'</h3>'+
                '</div>'+
                '<div class="details_time">'+
                     '<h2>Duration</h2>'+
                     '<h3 class="countdown">'+isFlight.Flight_Duration +'</h3>'+
                 '</div>'+
            '</div>'+
            '<div class="card_details_continued">'+
                  '<div class="details_flight">'+
                      '<h2>Price</h2>'+
                      '<h3>'+isFlight[Dest.Cabin + "_Price"]+'$'+' </h3>'+
                  '</div>'+
                  '<div class="details_date">'+
                      '<h2>Baggage </h2>'+
                      '<h3>'+isFlight[Dest.Cabin + "_Baggage"]+'</h3>'+
                  '</div>'+
                  '<div class="details_time">'+
                      '<h2>Terminal</h2>'+
                      '<h3>'+isFlight.Terminal+'</h3>'+
                  '</div>'+
              '</div>'+
          '</div>'+
        '</div>'+
        '<div class="card qr-theme">'+
        '<div class="card_heading">'+
            '<div class="card_logo">'+
              '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>'+
            '</div>'+
            '<img src="https://www.planetware.com/wpimages/2020/11/united-arab-emirates-abu-dhabi-to-dubai-best-ways-to-get-there-by-car.jpg" />'+
            '<div class="card_divider">'+
              '<div class="divider_left divider_hole">'+
              '</div>'+
              '<div class="divider">'+
              '</div>'+
              '<div class="divider_right divider_hole">'+
              '</div>'+
          '</div>'+
    

            '<h2>Return Flight</h2>'+
            '<div class="inner"></div>'+
          '</div>'+     
          '<div class="card_trip">'+
              '<div class="trip_from">'+
                  '<h1>'+ isFlightbooked.From+'</h1>'+       
              '</div>'+
              '<div class="trip_icon">'+
                  '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />'+
              '</div>'+
              '<div class="trip_to">'+
                  '<h1>'+isFlightbooked.To+'</h1>'+
               
              '</div>'+
          '</div>'+
          '<div class="card_divider">'+
              '<div class="divider_left divider_hole">'+
              '</div>'+
              '<div class="divider">'+
              '</div>'+
              '<div class="divider_right divider_hole">'+
              '</div>'+
          '</div>'+
        '<div class="card_flight_details">'+
          '<div class="card_seating">'+
              '<div class="seating_passenger">'+
                  '<h2>Flight Number</h2>'+
                  '<h3>'+isFlightbooked.Flight_No+'</h3>'+
              '</div>'+
              '<div class="seating_passenger_dos">'+
                  '<h2>Passenger</h2>'+
                  '<h3>Leonardo Restrepo</h3>'+
              '</div>'+
              '<div class="seating_seat">'+
                  '<h2>Seat</h2>'+
                  '<h3>'+'---'+'</h3>'+
              '</div>'+
          '</div>'+
          '<div class="card_details">'+
              '<div class="details_flight">'+
                  '<h2>Depart Date</h2>'+
                  '<h3> '+moment(isFlightbooked.Flight_Date).format("YYYY-MM-DD")+'</h3>'+
              '</div>'+
              '<div class="details_date">'+
                  '<h2>Depart Time</h2>'+
                  '<h3>'+moment(isFlightbooked.Flight_Date).format("HH:mm")+'</h3>'+
              '</div>'+
              '<div class="details_time">'+
                   '<h2>Duration</h2>'+
                   '<h3 class="countdown">'+isFlightbooked.Flight_Duration +'</h3>'+
               '</div>'+
          '</div>'+
          '<div class="card_details_continued">'+
                '<div class="details_flight">'+
                    '<h2>Price</h2>'+
                    '<h3>'+isFlightbooked[reserv.CabinTo + "_Price"] +'$'+' </h3>'+
                '</div>'+
                '<div class="details_date">'+
                    '<h2>Baggage </h2>'+
                    '<h3>'+isFlightbooked[reserv.CabinTo + "_Baggage"]+'</h3>'+
                '</div>'+
                '<div class="details_time">'+
                    '<h2>Terminal</h2>'+
                    '<h3>'+isFlightbooked.Terminal+'</h3>'+
                '</div>'+
            '</div>'+
        '</div>'+
      '</div>'	
      
    

    
    
    ,
    
    
            imageWidth: 1200,
            imageHeight: 700,
            customClass: 'swal-wide',
            imageAlt: 'A tall image',
             cancelButtonColor:'#ff2626' ,
            showCancelButton: true,
            cancelButtonText: 'Cancel!',
            confirmButtonText: 'Confirm Choosen Reservation!',
      
      reverseButtons: false,
      confirmButtonColor: '#ff8300',
      // confirmButtonColor: '#00D100', //GREEN WALA ORANGEEE ?
    
    
        
             
    
            // confirmButtonText: 'Log In',
            // iconColor:'#ff8300' ,
    
      // title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      // icon: 'warning',
      // showCancelButton: true,
      // confirmButtonText: 'Log In!',
      // cancelButtonText: 'Cancel!',
      // reverseButtons: true
    
    
    
    }).then((result) => {
      if (result.isConfirmed) {
    //    setState(Dest)
        if (localStorage.getItem('AuthenticationState') === "UserAuthenticated") {
            if(moment(isFlight.Flight_Date).isSameOrAfter(moment(isFlightbooked.Flight_Date)))
               warning()
                    history.push({
                      pathname: '/UserUpdateBooking',
                    state: {
                      flight1: isFlight,
                      flight2: isFlightbooked,
                      CabinFrom: Dest.Cabin,
                      CabinTo: reserv.CabinTo,
                      SeatsFrom:"",
                      SeatsFromID:"",
                      SeatsTo: reserv.SeatsChoosenTo,
                      SeatsToID: reserv.SeatsChoosenToID,
                      Adults: reserv.Adults,
                      Children: reserv.Children,
                      reserv: reserv
                    }
                    });
                 }
            
    else{
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
               if(res.isConfirmed){
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
    
    
  } else{
    swalWithBootstrapButtons.fire({
    
        html:
          '<div class="card aa-theme">'+
        '<div class="card_heading">'+
                      '<div class="card_logo">'+
                          '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>'+
                      '</div>'+
                      '<img src="https://static.onecms.io/wp-content/uploads/sites/28/2021/09/14/berlin-germany-aerial-lead-BERLINTG0921.jpg" />'+
                      '<div class="card_divider">'+
              '<div class="divider_left divider_hole">'+
              '</div>'+
              '<div class="divider">'+
              '</div>'+
              '<div class="divider_right divider_hole">'+
              '</div>'+
          '</div>'+
                      '<h2>Departure Flight</h2>'+
            '<div class="inner"></div>'+
          '</div>'+
          '<div class="card_trip">'+
              '<div class="trip_from">'+
                  '<h1>'+ isFlightbooked.From+'</h1>'+       
              '</div>'+
              '<div class="trip_icon">'+
                  '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />'+
              '</div>'+
              '<div class="trip_to">'+
                  '<h1>'+isFlightbooked.To+'</h1>'+
              '</div>'+
          '</div>'+
          '<div class="card_divider">'+
              '<div class="divider_left divider_hole">'+
              '</div>'+
              '<div class="divider">'+
              '</div>'+
              '<div class="divider_right divider_hole">'+
              '</div>'+
          '</div>'+
        '<div class="card_flight_details">'+
          '<div class="card_seating">'+
              '<div class="seating_passenger">'+
                  '<h2>Flight Number</h2>'+
                  '<h3>'+isFlightbooked.Flight_No+'</h3>'+
              '</div>'+
              '<div class="seating_passenger_dos">'+
                  '<h2>Passenger</h2>'+
                  '<h3>Leonardo Restrepo</h3>'+
              '</div>'+
              '<div class="seating_seat">'+
                  '<h2>Seat</h2>'+
                  '<h3>'+'---'+'</h3>'+
              '</div>'+
          '</div>'+
          '<div class="card_details">'+
              '<div class="details_flight">'+
                  '<h2>Depart Date</h2>'+
                  '<h3> '+moment(isFlightbooked.Flight_Date).format("YYYY-MM-DD")+'</h3>'+
              '</div>'+
              '<div class="details_date">'+
                  '<h2>Depart Time</h2>'+
                  '<h3>'+moment(isFlightbooked.Flight_Date).format("HH:mm")+'</h3>'+
              '</div>'+
              '<div class="details_time">'+
                   '<h2>Duration</h2>'+
                   '<h3 class="countdown">'+isFlightbooked.Flight_Duration +'</h3>'+
               '</div>'+
          '</div>'+
          '<div class="card_details_continued">'+
                '<div class="details_flight">'+
                    '<h2>Price</h2>'+
                    '<h3>'+isFlightbooked[reserv.CabinFrom + "_Price"]+'$'+' </h3>'+
                '</div>'+
                '<div class="details_date">'+
                    '<h2>Baggage </h2>'+
                    '<h3>'+isFlightbooked[reserv.CabinFrom + "_Baggage"]+'</h3>'+
                '</div>'+
                '<div class="details_time">'+
                    '<h2>Terminal</h2>'+
                    '<h3>'+isFlightbooked.Terminal+'</h3>'+
                '</div>'+
            '</div>'+
        '</div>'+
      '</div>'+
      '<div class="card qr-theme">'+
      '<div class="card_heading">'+
          '<div class="card_logo">'+
            '<img src="https://i.ibb.co/d5rQGGf/streached-removebg-preview.png" class="qatar"></img>'+
          '</div>'+
          '<img src="https://www.planetware.com/wpimages/2020/11/united-arab-emirates-abu-dhabi-to-dubai-best-ways-to-get-there-by-car.jpg" />'+
          '<div class="card_divider">'+
            '<div class="divider_left divider_hole">'+
            '</div>'+
            '<div class="divider">'+
            '</div>'+
            '<div class="divider_right divider_hole">'+
            '</div>'+
        '</div>'+
  
  
  
  
          '<h2>Return Flight</h2>'+
          '<div class="inner"></div>'+
        '</div>'+     
        '<div class="card_trip">'+
            '<div class="trip_from">'+
                '<h1>'+ isFlight.From+'</h1>'+       
            '</div>'+
            '<div class="trip_icon">'+
                '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" />'+
            '</div>'+
            '<div class="trip_to">'+
                '<h1>'+isFlight.To+'</h1>'+
             
            '</div>'+
        '</div>'+
        '<div class="card_divider">'+
            '<div class="divider_left divider_hole">'+
            '</div>'+
            '<div class="divider">'+
            '</div>'+
            '<div class="divider_right divider_hole">'+
            '</div>'+
        '</div>'+
      '<div class="card_flight_details">'+
        '<div class="card_seating">'+
            '<div class="seating_passenger">'+
                '<h2>Flight Number</h2>'+
                '<h3>'+isFlight.Flight_No+'</h3>'+
            '</div>'+
            '<div class="seating_passenger_dos">'+
                '<h2>Passenger</h2>'+
                '<h3>Leonardo Restrepo</h3>'+
            '</div>'+
            '<div class="seating_seat">'+
                '<h2>Seat</h2>'+
                '<h3>'+'---'+'</h3>'+
            '</div>'+
        '</div>'+
        '<div class="card_details">'+
            '<div class="details_flight">'+
                '<h2>Depart Date</h2>'+
                '<h3> '+moment(isFlight.Flight_Date).format("YYYY-MM-DD")+'</h3>'+
            '</div>'+
            '<div class="details_date">'+
                '<h2>Depart Time</h2>'+
                '<h3>'+moment(isFlight.Flight_Date).format("HH:mm")+'</h3>'+
            '</div>'+
            '<div class="details_time">'+
                 '<h2>Duration</h2>'+
                 '<h3 class="countdown">'+isFlight.Flight_Duration +'</h3>'+
             '</div>'+
        '</div>'+
        '<div class="card_details_continued">'+
              '<div class="details_flight">'+
                  '<h2>Price</h2>'+
                  '<h3>'+isFlight[Dest.Cabin + "_Price"]+'$'+' </h3>'+
              '</div>'+
              '<div class="details_date">'+
                  '<h2>Baggage </h2>'+
                  '<h3>'+isFlight[Dest.Cabin + "_Baggage"]+'</h3>'+
              '</div>'+
              '<div class="details_time">'+
                  '<h2>Terminal</h2>'+
                  '<h3>'+isFlight.Terminal+'</h3>'+
              '</div>'+
          '</div>'+
      '</div>'+
    '</div>'
    
  

  
  
  ,
  
  
          imageWidth: 1200,
          imageHeight: 700,
          customClass: 'swal-wide',
          imageAlt: 'A tall image',
           cancelButtonColor:'#ff2626' ,
          showCancelButton: true,
          cancelButtonText: 'Cancel!',
          confirmButtonText: 'Confirm Choosen Reservation!',
    
    reverseButtons: false,
    confirmButtonColor: '#ff8300',
  
  
  }).then((result) => {
    if (result.isConfirmed) {
  
      if (localStorage.getItem('AuthenticationState') === "UserAuthenticated") {
        if(moment(isFlight.Flight_Date).isSameOrBefore(moment(isFlightbooked.Flight_Date)))
        warning1()
        history.push({
              pathname: '/UserUpdateBooking',
            state: {
                flight1: isFlightbooked,
                flight2: isFlight,
                CabinFrom: reserv.CabinFrom,
                CabinTo: Dest.Cabin,
                SeatsFrom:reserv.SeatsChoosenFrom,
                SeatsFromID:reserv.SeatsChoosenFromID,
                SeatsTo: "",
                SeatsToID: "",
                Adults: reserv.Adults,
                Children: reserv.Children,
                reserv: reserv
            }
            });
               }
          
  else{
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
             if(res.isConfirmed){
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
  












  }  };


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


  if (isLoading) {
  

    return (
      <>
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
              {/* <li ><a onClick={(e) => SearchFlightHandler(e)}><span>Home Page</span></a></li>
              
         
              <li><a onClick={(e) => AboutUs()}><span>About Us</span></a></li>
              <li><a onClick={(e) => Vision()}><span>Our Vision</span></a></li>
              <li><a onClick={(e) => ContactUs()}><span>Contact Us</span></a></li> */}
              <li><a onClick={() => LogOutHandler()}><span>Log Out</span></a></li>
  
            </ul>
          </nav>
        </div>
  
  
        <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" ><a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a></div>
  
        </div>
  
      </div>
  
    </header>
  
  
      
  <div class="s011">
      <form>
        <fieldset>
        
        </fieldset>
        <div class="inner-form">
          <header>
          <label class="center2">Edit Flight</label>
          <div class="travel-type-wrap">
             
             <button type="button" class="item active"  >
             <div class="group-icon">
             <svg width="70px" height="70px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
  <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"/>
  </svg>
               </div>
               <span>Reserve Flight</span>
             </button>
  
             <button type="button"class="item" onClick={(e) => ReservedFlightsHandler(e)}>
             <svg  width="50" height="35"viewBox="0 0 32 32" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
  <defs>
   
  </defs>
  <path class="cls-1" d="M26,6a2,2,0,0,0-2-2H8A2,2,0,0,0,6,6V26a2,2,0,0,0,2,2h8V26H8V6H24v6h2Z" transform="translate(0 0)"/>
  <rect x="10" y="18" width="6" height="2"/>
  <rect x="10" y="14" width="12" height="2"/>
  <path class="cls-1" d="M22,10v2H10V10Z" transform="translate(0 0)"/>
  <path width="40" height="40" class="cls-1" d="M25,23l5,2V23l-5-2.5V18a1,1,0,0,0-2,0v2.5L18,23v2l5-2v3.5L21,28v1l3-1,3,1V28l-2-1.5Z" transform="translate(0 0)"/>
  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-2" width="32" height="32"/>
  </svg>
               <div class="group-icon">
  
               <span>Manage Flights</span>
               </div>
             
             </button>
  
  
             <button type="button" class="item"  onClick={(e) => EditProfileHendler(e)}>
               <div class="group-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
  </svg>
               </div>
               <span>Edit Profile</span>
             </button>
  
  
            
  
  
           </div>
          </header>
  
          {/* SDD    THE MAIN FORM THAT MUST BE REPLACED EACH TIME*/}
          <div class="main-form-search" id="main-form">     
        
      
      
          
              
                      <div class="booking-form">
                          <div class="form-header">
                              <h1>Make your reservation</h1>
                          </div>
                          <form>
                          
  
                <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <input class="form-control" type="text" name="From" maxLength="3" readonly="readonly" value={Dest.From} onChange={(e) => changeHander(e)} />
                                          <span class="form-label">From</span>
                                      </div>
                                  </div>
                  <div class="col-md-6">
                                      <div class="form-group">
                                          <input class="form-control" type="text" name="To" maxLength="3" readonly="readonly" value={Dest.To} onChange={(e) => changeHander(e)}/>
                                          <span class="form-label">To</span>
                                      </div>
                                  </div>
                              </div>
          
  
                <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                      <div class="form-control" type="text" required>
                      <span class="date-form"> Date</span>
                    <DatePicker  style={{ 
                      borderTopColor:"transparent",
                      borderBottomColor:"transparent",
                      borderLeftColor:"transparent",
                      borderRightColor:"transparent",
                      // forcedColorAdjust:"red",
                      // stopColor: "#ccc",
                      // stopColor: "rgb(255, 255, 255)",
                  minWidth:"290px",
                  imageWidth:"250px",
              marginTop: "25px", 
              backgroundColor:"transparent",
              Color:"white",    
            }} format="DD-MM-YYYY" format="DD-MM-YYYY"
            showTime="false"  disabledDate={d => d.isBefore(new Date())} 
               name="Depart" onChange={(date) => setDest(prevData => {
                  return {...prevData ,Flight_Date: date}}) 
        }/>
      </div>
                                  
                                      </div>
                                  </div>

                                  <div class="col-md-4">
                                      <div class="form-group">
                                          <select class="form-control" required  name="Cabin"  value={Dest.Cabin}  onChange={(e) => changeHander(e)}>
                     
                                              <option  value={"First"}  >First</option>
                                              <option value={"Business"}>Business</option>
                                              <option value={"Economy"}>Economy</option>
                                          </select>
      
                                          <span class="select-arrow"></span>
                                          <span class="date-form">Cabin</span>
                                      </div>
                                  </div>
                                
                                  
                              </div>
  

                          </form>
                  
              
              
      </div>
    <div class="form-btn">
    {/* <button  class="submit-btn" onClick={(e) => searchHandler(e)}>Search Now</button> */}
                    <button onClick={(e) => searchHandler(e)}  class="btn-search" type="button">Search</button>
                              </div>
          
      <script src="js/jquery.min.js"></script>

          </div>
        </div>
      </form>
    </div>
    <script src="js/extention/choices.js"></script>   

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
    
  
}

  return (
    <>
    
  
  
      {/* {isdepart ? <p>Length is 1</p>:null} */}
   {/* adasdas */}
   <div class="s011">
      <form>
        <fieldset>
        
        </fieldset>
        <div class="inner-form">
          <header>
          <label class="center2">Edit Flight</label>
          <div class="travel-type-wrap">
             
             <button type="button" class="item active"  >
             <div class="group-icon">
             <svg width="70px" height="70px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
  <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)"/>
  </svg>
               </div>
               <span>Reserve Flight</span>
             </button>
  
             <button type="button"class="item" onClick={(e) => ReservedFlightsHandler(e)}>
             <svg  width="50" height="35"viewBox="0 0 32 32" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
  <defs>
   
  </defs>
  <path class="cls-1" d="M26,6a2,2,0,0,0-2-2H8A2,2,0,0,0,6,6V26a2,2,0,0,0,2,2h8V26H8V6H24v6h2Z" transform="translate(0 0)"/>
  <rect x="10" y="18" width="6" height="2"/>
  <rect x="10" y="14" width="12" height="2"/>
  <path class="cls-1" d="M22,10v2H10V10Z" transform="translate(0 0)"/>
  <path width="40" height="40" class="cls-1" d="M25,23l5,2V23l-5-2.5V18a1,1,0,0,0-2,0v2.5L18,23v2l5-2v3.5L21,28v1l3-1,3,1V28l-2-1.5Z" transform="translate(0 0)"/>
  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-2" width="32" height="32"/>
  </svg>
               <div class="group-icon">
  
               <span>Manage Flights</span>
               </div>
             
             </button>
  
  
             <button type="button" class="item"  onClick={(e) => EditProfileHendler(e)}>
               <div class="group-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
  </svg>
               </div>
               <span>Edit Profile</span>
             </button>
  
  
            
  
  
           </div>
          </header>
  
          {/* SDD    THE MAIN FORM THAT MUST BE REPLACED EACH TIME*/}
          <div class="main-form-search" id="main-form">     
        
      
      
          
              
        <div class="booking-form">
          <div class="form-header">
            <h1>Make your reservation</h1>
          </div>
          <form>
          
  
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input class="form-control" type="text" name="From" maxLength="3" readonly="readonly" value={Dest.From} onChange={(e) => changeHander(e)} />
                  <span class="form-label">From</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <input class="form-control" type="text" name="To" maxLength="3" readonly="readonly" value={Dest.To} onChange={(e) => changeHander(e)}/>
                  <span class="form-label">To</span>
                </div>
              </div>
            </div>
  
  
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="form-control" type="text" required>
                  <span class="date-form"> Date</span>
                <DatePicker  style={{ 
                  borderTopColor:"transparent",
                  borderBottomColor:"transparent",
                  borderLeftColor:"transparent",
                  borderRightColor:"transparent",
                  // forcedColorAdjust:"red",
                  // stopColor: "#ccc",
                  // stopColor: "rgb(255, 255, 255)",
              minWidth:"290px",
              imageWidth:"250px",
          marginTop: "25px", 
          backgroundColor:"transparent",
          Color:"white",    
        }} format="DD-MM-YYYY"  format="DD-MM-YYYY"
        showTime="false"  disabledDate={d => d.isBefore(new Date())} 
           name="Depart" onChange={(date) => setDest(prevData => {
              return {...prevData ,Flight_Date: date}}) 
    }/>
  </div>
              
                </div>
              </div>
           
              <div class="col-md-4">
                <div class="form-group">
                  <select class="form-control" name="Cabin" required  value={Dest.Cabin} onChange={(e) => changeHander(e)} >
                 
                  <option  value={"First"}>First</option>
                  <option value={"Business"}>Business</option>
                  <option value={"Economy"}>Economy</option>
                  </select>
                  <span class="select-arrow"></span>
                  <span class="date-form"> Cabin</span>
                </div>
              </div> 
              
            </div>
  

          </form>
      
    
          
  </div>
  <div class="form-btn">
  {/* <button  class="submit-btn" onClick={(e) => searchHandler(e)}>Search Now</button> */}
                <button onClick={(e) => searchHandler(e)}  class="btn-search" type="button">Search</button>
            </div>
  
  <script src="js/jquery.min.js"></script>
  {/* <script>
  $('.form-control').each(function () {
    floatedLabel($(this));
  });
  
  $('.form-control').on('input', function () {
    floatedLabel($(this));
  });
  
  function floatedLabel(input) {
    var $field = input.closest('.form-group');
    if (input.val()) {
      $field.addClass('input-not-empty');
    } else {
      $field.removeClass('input-not-empty');
    }
  }
  </script> */}
  
  
     
      </div>
        </div>
      </form>
    </div>
    <script src="js/extention/choices.js"></script>   
  
    {/* asdasdas */}
          
  
          
  
  
         
  
         
  
        
        
    
   
  
  <div class="box d">
  <label class="center">Flight</label>
    <div class="box f">
  
  
    {Result.map(flight =>
    <div class="listing-item">
        <figure class="image">
            <img src="https://s3.eu-central-1.amazonaws.com/cmstests3.flynas.com/media/1514/artboard-1.jpg" alt="image"></img>
            <figcaption>
              <div class="caption">
                <h1>${flight[Dest.Cabin + "_Price"]}</h1>
                <p>{flight.To }</p>
                </div>
            </figcaption>
        </figure>
        <div class="listing">
            <h4>From: {flight.From}</h4>
            <h4>To:{flight.To}</h4>
            <h4>Flight Date:{moment(flight.Flight_Date).format("YYYY-MM-DD")}</h4>
            <h4>Flight time:{moment(flight.Flight_Date).format("HH:mm")}</h4>
           
            {/* <a class="pricing-button" name={flight._id}  onClick={() => departHandler(flight)} >BOOK NOW!</a> */}
            <button class="button-79" role="button" name={flight._id} onClick={() =>  FlightHandler(flight)}>BOOK NOW!</button>
        </div>
    </div>
   
    
  
  
          )}
  
    </div>


  
   
  
      
   
  
  
  
  
  </div>
  <div class="box d20">
  <button id="yourButtonID" class="btn-search2" onClick={() => success()}>Reserve Flight </button>
  
  </div>
    
          
    {/* <button  class="pricing-button"  id="yourButtonID" onClick={() => BookHendler()} >BOOK NOW!</button> */}
  
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
  
    
  
  
  
  
  
    
   
    
    {/* <button class='active'>Active</button>
  <button class='focus'>Focus</button>
  <a href='#target1' id='target1' class='target'>Target 1</a>
  <a href='#target2' id='target2' class='target'>Target 2</a>
  <a href='#target3' id='target3' class='target'>Target 3</a> */}
     
  
  
  
  
  {/* <button   class="pricing-button" id="yourButtonID"  >Confirm NOW !</button> */}
  
  
  {/* <body onload = "startTimer()">
         <img id="img" src="startpicture.jpg"/>
        
         <button type="button" onclick={() =>displayPreviousImage()}>Previous</button>
         <button type="button" onclick={() =>displayNextImage()}>Next</button>
     </body> */}
        
        {/* <div id="image_container"></div>
        <br/>
  <div onClick={() =>changeImage()}>CLICK ME!</div> */}
  
  
  
  
    <script src="js/extention/choices.js"> </script>
    
  
      
    </>
  );
};
export default EditFlight;
