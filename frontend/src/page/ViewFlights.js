import '../css/App.css';
import { Component, useState, useEffect, useReducer } from 'react';
import axios from 'axios'
import { Route, Redirect } from 'react-router'
import { Link, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookies";
import '../css/App.css';
import '../css/main.css';
import Swal from 'sweetalert2'
import {
  Button,

} from 'antd';

// import {Redirect} from 'react-router-dom';
// import LNSelect from "../LNSelect/LNSelect";
// import Navbar from './navbar';
// import Home from './home';
import { withRouter } from "react-router-dom";
import moment from "moment";

function App() {
  if (localStorage.getItem('AuthenticationState') !== "AdminAuthenticated") {
    window.open("LoginPage", "_self");
  }

  const LogOutHandler = (e) => {
    var userid = localStorage.getItem('UserID')
    axios.delete('http://localhost:8000/logout', { data: { ID: userid } })
    localStorage.clear()
    history.push({
      pathname: '/LoginPage'
    });
  };


const homepage = (e) => {
  history.push({
    pathname: '/homepage'
  });
 };

 //Is their authentication token still valid?
//  else if (Date.now > new Date(localStorage.getItem('AuthenticationExpires'))) {
//        window.open("AccessDenied.html", "_self");
//  }
  const history = useHistory();
  const [flights, Setflights] = useState([]);

  useEffect(() => {

    Cookies.setItem("AccessToken", localStorage.getItem('AccessToken')//,{expires: 1/5760}
    )
    Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken')//,{expires: 1/100060}
    )

    axios.get('http://localhost:8000/viewflights', { withCredentials: true })
      .then((result) => {
        localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
        // document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        console.log(result.data);
        Setflights(result.data);
      })
      .catch(err => {
        if (err.response.status == 403) {
          history.push({
            pathname: '/LoginPage'
          });
        }
        console.log(err)
      })

  }, []);

  const editHandler = (flight) => {
    history.push({
      pathname: '/UpdateFlight',
      state: {
        data: flight
      }
    });
    console.log(flight.Flight_Duration);
    console.log(flight.Flight_Duration.substring(flight.Flight_Duration.indexOf(':') + 1));


  };

    const deleteHandler = (flight) => {
      console.log(flight)
      var del =flight._id;
        del.trim();
       


         Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
         Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
         console.log(localStorage)
          axios.delete('http://localhost:8000/deleteflight', {data: {var1:del}}, {withCredentials: true})
          .then(response => {
            localStorage.setItem("AccessToken",Cookies.getItem("AccessToken"))
            // document.cookie = 'AccessToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            // document.cookie = 'RefreshToken' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';   
            // console.log(localStorage)      
              console.log(response);
               }).catch(error => {
                if(error.response.status==403){
                  console.log(localStorage)
                  console.log(error.response.data)
                  history.push({
                    // pathname: '/LoginPage'
                  });
                }
              console.log(error); //Handle Flight_No exsit 
            })
          //  window.location.reload(false);
        
        };


        const ConfirmDelete = (flight) => { // e will contain the reservation number 
          Swal.fire(
            {
            title: 'Delete Flight: ' + flight.Flight_No,
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
                deleteHandler(flight)
                Swal.fire( {
                  title:'Flight Successfully Deleted!',
                  // text:'You will be Refunded with: $'.concat(RefundedAmount),
                  icon:'success',
                  showConfirmButton: false,
                   } )     
                // setTimeout(() => {
                //   window.location.reload()
                // }, 4000);
              }
            });
        };
  
  // const deleteHandler = (flight) => {
  //   var del = flight._id;
  //   del.trim();
  //   const confirmBox = window.confirm(
  //     "Do you really want to delete this Flight?"
  //   )
  //   if (confirmBox === true) {

  //     Cookies.setItem("AccessToken", localStorage.getItem('AccessToken'))
  //     Cookies.setItem("RefreshToken", localStorage.getItem('RefreshToken'))

  //     axios.delete('http://localhost:8000/deleteflight', { data: { var1: del } }, { withCredentials: true })
  //       .then(response => {
  //         localStorage.setItem("AccessToken", Cookies.getItem("AccessToken"))
  //         document.cookie = 'AccessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //         document.cookie = 'RefreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  //         console.log(response);
  //       }).catch(error => {
  //         if (error.response.status == 403) {
  //           history.push({
  //             pathname: '/LoginPage'
  //           });
  //         }
  //         console.log(error); //Handle Flight_No exsit 
  //       })
  //     window.location.reload(false);
  //   }
  // };


        return (
          <>
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
    
      <li><a >Admin</a></li>
      <li><a onClick={(e) => homepage(e)}>Home Page</a></li>
      <li><a onClick={(e) => LogOutHandler(e)}>Log Out</a></li>
    </ul>
  </nav>
  </header >

<div class="box d2">
  
<label class="center"></label>

  <div class="box f2">
  <span class="login100-form-title p-b-49">
          Admin View Flight
        </span>
             {flights.map(flight =>
        <div>
    {/* //loop will be created here inside the box f2 :D*/}


  <div class="listing-item-admin">
      <figure class="image">
          <img src="https://s3.eu-central-1.amazonaws.com/cmstests3.flynas.com/media/1514/artboard-1.jpg" alt="image"></img>
          <figcaption>
            <div class="caption">
            <h1>Flight Number:{flight.Flight_No}</h1>
              </div>
          </figcaption>
      </figure>
      <div class="listing">
          <h4>From: {flight.From}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; To: {flight.To}</h4>
          <h4>Flight Date: {moment(flight.Flight_Date).format("YYYY-MM-DD  HH:mm")}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Flight Duration: {flight.Flight_Duration}</h4>
          <h4>Flight Terminal:{flight.Terminal}</h4>
          <h4> Economy Seats:{flight.Economy_Seats}   &nbsp;&nbsp; Bussiness Seats:{flight.Business_Seats}   &nbsp;&nbsp; First Seats:{flight.First_Seats} </h4>
          <h4> Economy Baggage:{flight.Economy_Baggage}   &nbsp;&nbsp; Bussiness Baggage:{flight.Business_Baggage}  &nbsp;&nbsp; First Baggage:{flight.First_Baggage} </h4>
          <h4> Economy Price:{flight.Economy_Price}$    &nbsp;&nbsp; Bussiness Price:{flight.Business_Price}$  &nbsp;&nbsp; First Price:{flight.First_Price}$ </h4>

        
          {/* <Link class="button-79" role="button" to="SeatMap"  onClick={() => parentToChild(reserv,true)} smooth={true}>Select Seat</Link>
          <Link class="button-79" role="button" onClick={() => Editdeparthandler(reserv)} smooth={true}>Edit Flight</Link> */}
          <div class="center-button">
 <button class="button-200" role="button" name={flight._id}  onClick={() => editHandler(flight)} >Edit Flight</button>
 <button class="button-70" role="button" name={flight._id}  onClick={() => ConfirmDelete(flight)}>Delete Flight</button>
      </div>
  </div>
  </div>
 
  
  {/* on click will send reservation number + total price refunded */}
 
    
     
     </div>
 
 )}
 
  </div>

  {/* <a class="button-60 center20" role="button" onClick={() => backhandlr()}>Home Page</a> */}
              {/* <a class="button-60 center20" role="button" onClick={(e) => LogOutHandler(e)}>Log Out</a> */}

</div>



























      
      {/* <div class="box d2">
      <div class="limiter">
        <div class="container-login100" >
          <div class="wrap-login199 p-l-55 p-r-55 p-t-65 p-b-54">
            <form class="login100-form validate-form">
              <span class="login100-form-title p-b-49">
                Admin View All Flights
              </span>
      
      
      
              
      
      
      
      
      
      
      
      
      
         
      
      
      
            
               {flights.map(flight =>
                         <>
      
      
      
      
      
      <table class="fl-table">
              <thead>
              <tr>
                  <th>Flight Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Flight Date</th>
                  <th>Duration</th>
                  <th>Terminal</th>
                  <th>Eco Seats</th>
                  <th>Buss Seats</th>
                  <th>First Seats</th>
                  <th>Eco Baggage</th>
                  <th>Buss Baggage</th>
                  <th>First Baggage</th>
                  <th>Eco Price</th>
                  <th>Buss Price</th>
                  <th>Fisrt Price</th>
          
              </tr>
              </thead>
          
              <tr>
                  <td>{flight.Flight_No}</td>
                  <td>{flight.From}</td>
                  <td>{flight.To}</td>
                  <td>{moment(flight.Flight_Date).format("YYYY-MM-DD  HH:mm")}</td>
                  <td>{flight.Flight_Duration}</td>
                  <td>{flight.Terminal}</td>
                  <td> {flight.Economy_Seats}</td>
                  <td>:{flight.Business_Seats}</td>
                  <td> {flight.First_Seats}</td>
                  <td>{flight.Economy_Baggage}</td>
                  <td> {flight.Business_Baggage}</td>
                  <td> {flight.First_Baggage}</td>
                  <td> ${flight.Economy_Price}</td>
                  <td> ${flight.Business_Price}</td>
                  <td> ${flight.First_Price}</td>
                  <td> <a class="button-60 center20" role="button">Back</a> <a class="button-60 center20" role="button">Back</a></td>

              </tr>
             
      
          
          </table>
       
      
      
      
      
      
      </>
      
      
      
      
      
               )}
      
      <>
      
      
      
      
      
        
      
        
      
      
      
      
      
      
      
               
        
               </>
              
      
             
      
          
             
             
      
      
      
                      
      
      
      
      
      
           
             
          
            
      
      
      
            </form>
      
            
            
              <a class="button-60 center20" role="button" onClick={() => history.goBack()}>Back</a>
              <a class="button-60 center20" role="button" onClick={(e) => LogOutHandler(e)}>Log Out </a>
          </div>
        </div>
      </div>
      
      
      
      </div> */}
      
      
      
      
      
            
           
      
          
      
          
          </>
        );
}

export default App;