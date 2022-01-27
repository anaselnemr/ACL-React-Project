import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateFlight from './page/CreateFlight.js'
import ViewFlights from './page/ViewFlights.js'
import UpdateFlight from './page/UpdateFlight.js'
import SearchFlight from './page/SearchFlight.js'
import LoginPage from './page/LoginPage.js'
import HomePage from './page/HomePage.js'

import UserLogin from './UserPages/UserLogin.js'
import UserHomePage from './UserPages/UserHomePage.js'
import CreateUserAccount from './UserPages/CreateUserAccount'
import UserSearchFlight from './UserPages/UserSearchFlight'
import UserManageBooking from './UserPages/UserManageBooking'
import UserEditProfile from './UserPages/UserEditProfile'
import ChangePassword from './UserPages/ChangePassword'
import UserEditFlight from './UserPages/UserEditFlight'
import UserConfirmBooking from './UserPages/UserConfirmBooking'
import PassengersDetails from './UserPages/PassengersDetails'
import UserUpdateBooking from './UserPages/UserUpdateBooking'
import UserBoarding from './UserPages/UserBoarding'
import UserSelectSeat from './UserPages/UserSelectSeat'



import ReservationHomePage from './UserPages/ReservationHomePage'




import FlightHome from './page/FlightHome.js'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>

<BrowserRouter>
                <Switch>
                    <Route exact path="/" component={FlightHome} />
                    <Route exact path="/ViewFlights" component={ViewFlights} />
                    <Route exact path="/UpdateFlight" component={UpdateFlight} />
                    <Route exact path="/CreateFlight" component={CreateFlight} />
                    <Route exact path="/SearchFlight" component={SearchFlight} />
                    <Route exact path="/HomePage" component={HomePage} />
                    <Route exact path="/LoginPage" component={LoginPage} />

                    <Route exact path="/UserLogin" component={UserLogin} />
                    <Route exact path="/UserHomePage" component={UserHomePage} />
                    <Route exact path="/CreateUserAccount" component={CreateUserAccount} />
                    <Route exact path="/UserSearchFlight" component={UserSearchFlight} />
                    <Route exact path="/UserManageBooking" component={UserManageBooking} />
                    <Route exact path="/UserConfirmBooking" component={UserConfirmBooking} />
                    <Route exact path="/UserUpdateBooking" component={UserUpdateBooking} />


                    <Route exact path="/UserEditProfile" component={UserEditProfile} />
                    <Route exact path="/ChangePassword" component={ChangePassword} />

                    <Route exact path="/UserEditFlight" component={UserEditFlight} />
                    <Route exact path="/ReservationHomePage" component={ReservationHomePage} />
                    <Route exact path="/PassengersDetails" component={PassengersDetails} />
                    <Route exact path="/UserBoarding" component={UserBoarding} />
                    <Route exact path="/UserSelectSeat" component={UserSelectSeat} />

                    
                </Switch>
            </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





