

import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import axios from 'axios';
import Cookies from "js-cookies";


import "./styles.css";
import { Button } from "react-scroll";

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

var css =".blank {\n  height: 25px;\n  width: 25px;\n}\n\n.loader {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  background: rgba(240, 240, 240, 0.9);\n  z-index: \"2\";\n  justify-content: center;\n  align-items: center;\n}\n\n.seat {\n  background-color: #4FC3F7;\n  height: 50px;\n  width: 50px;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.seat__number {\n  font-size: 15px;\n}\n.seat--north {\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n}\n.seat--south {\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.seat--east {\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n}\n.seat--west {\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.seat--enabled {\n  cursor: pointer;\n}\n.seat--enabled:hover {\n  background-color: #03A9F4;\n}\n.seat--selected {\n  cursor: pointer;\n  background-color: #4CAF50;\n}\n.seat--reserved {\n  cursor: not-allowed;\n  background-color: #E0E0E0;\n}\n\n.seat-content {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto;\n}\n\n.seat-picker {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  width: max-content;\n}\n.seat-picker > *:not(:last-child) {\n  margin-bottom: 5px;\n}\n.seat-picker__row {\n  display: flex;\n  align-items: center;\n  justify-items: center;\n}\n.seat-picker__row > *:not(:last-child) {\n  margin-right: 2px;\n}\n.seat-picker__row__number {\n  font-size: 12px;\n  font-weight: normal;\n  height: 12px;\n  width: 12px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  color: #9E9E9E;\n}\n.seat-picker__row--enabled:hover {\n  background-color: #F5F5F5;\n}\n.seat-picker__row--selected {\n  background-color: #F5F5F5;\n}\n.seat-picker__row--enabled:hover > .seat-picker__row__number {\n  font-weight: 600;\n}\n.seat-picker__row--selected > .seat-picker__row__number {\n  font-weight: 600;\n}";   

___$insertStyle(css);

class SeatMap extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    loading: false,

    flightID:'',

    reserv:'',

    from:'',
    flightAvailableSeats:'',

    choosenseatsID: [],
    choosenseats: [],
    maxSeats: 0,
    };
    this.UpdateAll = this.UpdateAll.bind(this);}

 

  //  changeHander = (e) => {
  //   document.getElementById(e).style.tooltip="yayyyyy";
  //  console.log("yayyyyyyyyyy")
  //  console.log(e)

  // };


  addSeatCallbackContinousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    this.setState(
      {
        loading: true
      },
      async () => {

        if (removeCb) {
          await new Promise(resolve => setTimeout(resolve, 750));
          console.log(
            `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
          );
          removeCb(params.row, params.number);
        }
        await new Promise(resolve => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
       
        var flag = true;
        // if(this.state.from){
        //     if(this.state.choosenseatsID.length==0 && this.state.reserv['SeatsChoosenFromID'].length!==0){
        //       console.log(this.state.reserv['SeatsChoosenFromID']);
        //     this.state.choosenseatsID = this.state.reserv['SeatsChoosenFromID']
        //     this.state.choosenseats = this.state.reserv['SeatsChoosenFrom']

        //     // for(var i=1;i<this.state.choosenseatsID.length;i++){
        //     //   if(id==this.state.choosenseatsID[i])
        //     //     flag = false;
        //     //   const newTooltip = `Seat number `+row+number+' is selected!';
        //     //   var r = this.state.choosenseats[i].substring(0,1);
        //     //   var n = parseInt(this.state.choosenseats[i].substring(1));
        //     //   console.log(r)
        //     //   console.log(n)
        //     //   console.log(this.state.choosenseatsID[i])
        //     //   addCb(r, n, this.state.choosenseatsID[i], newTooltip);
        //     //   // await new Promise(resolve => setTimeout(resolve, 750));
        //     //   // removeCb(this.state.choosenseats[0].substring(0,1), parseInt(this.state.choosenseats[0].substring(1)));
        //     // }


        //   }
        // }
        // else{
        //   if(this.state.choosenseatsID.length==0 && this.state.reserv['SeatsChoosenToID'].length!==0){
        //     console.log(this.state.reserv['SeatsChoosenToID']);
        //   this.state.choosenseatsID = this.state.reserv['SeatsChoosenToID']
        //   this.state.choosenseats = this.state.reserv['SeatsChoosenTo']
        //   for(var i=1;i<this.state.choosenseatsID.length;i++){
        //     if(id==this.state.choosenseatsID[i])
        //       flag = false;
        //     const newTooltip = `Seat number `+row+number+' is selected!';
        //     var r = this.state.choosenseats[i].substring(0,1);
        //     var n = parseInt(this.state.choosenseats[i].substring(1));
        //     addCb(r, n, this.state.choosenseatsID[i], newTooltip);
        //     // await new Promise(resolve => setTimeout(resolve, 750));
        //     // removeCb(this.state.choosenseats[0].substring(0,1), parseInt(this.state.choosenseats[0].substring(1)));
        //   }
        // }
        // }

        if(flag){
        const newTooltip = `Seat number `+row+number+' is selected!';
        addCb(row, number, id, newTooltip);
        var seatName = ''+row+number;
        this.setState(prevState => ({
          choosenseats: [seatName]
        }))
        this.addpeople(id)
        }
      
       
        this.setState({ loading: false });
      }
    );
  };



  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.removePeople(id)
        this.setState({ loading: false });
      }
    );
  };

  removePeople(id) {
    var array = [...this.state.choosenseatsID]; // make a separate copy of the array
    var array2 = [...this.state.choosenseats]; 
    var index = array.indexOf(id)
    
    if (index !== -1) {
      array.splice(index, 1);
      array2.splice(index,1)
      this.setState({choosenseatsID: array});
      this.setState({choosenseats: array2})
    }
     
    
    }

  addpeople(id){
    var array = [this.state.choosenseatsID]; 
    var array2 = [this.state.choosenseats]; 
    // if(array.length>=this.state.maxSeats){
    //   array.splice(0,1)
    //   this.setState({choosenseatsID: array});

    //   array2.splice(0,1)
    //   this.setState({choosenseats: array2});
    // }
    // this.setState(prevState => ({
    //   choosenseatsID: [...prevState.choosenseatsID, id]
    // }))

    this.setState(prevState => ({
      choosenseatsID: [id]
    }))

  }





  UpdateAll(){

   

    console.log(this.state.choosenseatsID.length);
    console.log(this.state.flightAvailableSeats);
    for(var i=0;i<this.state.choosenseatsID.length;i++){
      console.log(this.state.choosenseatsID[i]);
      console.log(this.state.flightAvailableSeats[this.state.choosenseatsID[i]]);
      this.state.flightAvailableSeats[this.state.choosenseatsID[i]]=false;
        }

      // this.state.reserv['Available'] = this.state.Available;
      if(this.state.from){
        this.state.reserv['SeatsChoosenFrom'] = this.state.choosenseats;
        this.state.reserv['SeatsChoosenFromID'] = this.state.choosenseatsID;
      }
      else{
        this.state.reserv['SeatsChoosenTo'] = this.state.choosenseats;
        this.state.reserv['SeatsChoosenToID'] = this.state.choosenseatsID;
      }

      console.log(this.state.reserv)
      console.log(this.state.flightAvailableSeats)


      // if(this.state.maxSeats===this.state.choosenseats.length){
        Cookies.setItem("AccessToken",localStorage.getItem('AccessToken'))
        Cookies.setItem("RefreshToken",localStorage.getItem('RefreshToken'))
        axios.put('http://localhost:8000/updateseats',{data: {var1 : this.state.flightID, var2 : this.state.flightAvailableSeats} 
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
      axios.put('http://localhost:8000/updatereservationseats', {data: {var1:this.state.reserv['_id'], var2:this.state.reserv}
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

    // }

    // console.log(this.state.seats)
    // console.log(this.state.track.length)
    // console.log(this.state.track)

    // if(this.state.maxSeats===this.state.choosenseats.length){

    // const data1=this.props.parentToChild;
    // var n = this.state.seats;
    
    // if(data1){
    //   var id=data1["g"]
    //   var seats=this.state.data;
    //   console.log(seats)
    //   var tracker=this.state.track;
    //   var username=sessionStorage.getItem("Username")
    //   var date=data1["date"]
    //   console.log(seats);
    //   console.log(id);
    // axios.put('http://localhost:8000/updateseats',{data: {var1 : id, var2 : seats} })
    // .then((result)=> {
    //           console.log("Successful")
    
    //     }).catch(error => {
    //     console.log(error); })

    //     if(this.state.from==true){
    //       axios.put('http://localhost:8000/updatereservationseats',{data: {var1 : id, var2 : tracker,var3:username,var4:true,var5:date} })
    //     .then((result)=> {
    //               console.log("Successful")
        
    //         }).catch(error => {
    //         console.log(error); })
    
    //     }
    //     else{
    //       axios.put('http://localhost:8000/updatereservationseats',{data: {var1 : id, var2 : tracker,var3:username,var4:false,var5:date} })
    //       .then((result)=> {
    //                 console.log("Successful")
          
    //           }).catch(error => {
    //           console.log(error); })
      
    //     }
    // }
    // }

    }


  // componentDidMount() {
  //   const data=this.props.parentToChild;
  //   console.log(data);
  //   if(data){
  //    var seats = data["e"] + data["f"]
  //    var id=data["g"]
  //   axios.post('http://localhost:8000/flightmap',{data: {var1 : id} })
  //   .then((result)=> {
  //     console.log(result) 
  //       // const Available = result.data[0].Available_Seats;
  //       // console.log(Available) 
  //       this.setState({ seats: seats,track: []});
  //     })}
  // }



  
  render() {
     
    const data=this.props.parentToChild;

    console.log(data)
    var rows = new Array(26);
    var Available = "";

    if(data){
    // console.log(data['rows']);
    rows = data['rows'];
    this.state.reserv = data['myreserv'];
    this.state.flightID = data['ID'];
    this.state.flightAvailableSeats = data['Available'];
    this.state.maxSeats = data['Adults_No'] + data['Children_No'];
    this.state.from = data['from'];
    console.log(this.state.maxSeats);
    console.log(this.state.choosenseatsID);
    console.log(this.state.choosenseats);

    // if(this.state.from){
    //   this.state.choosenseatsID = this.state.reserv['SeatsChoosenFromID']
    // }
    // else{
    //   this.state.choosenseatsID = this.state.reserv['SeatsChoosenToID']
    // }

    console.log(this.state.choosenseatsID);





    console.log(this.state.reserv);
    
    //  console.log(rows);
    // Available=data['Available'];
    }
  //   console.log(rows);
  
  // console.log(rows)
    const { loading } = this.state;
    return ( 
    <>
    <div>
      </div><div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250vh' }}>
            <SeatPicker
              addSeatCallback={this.addSeatCallbackContinousCase}
              removeSeatCallback={this.removeSeatCallback}
              rows={rows}
              maxReservableSeats={1}
              alpha
              visible
              selectedByDefault
              loading={loading}
              tooltipProps={{ multiline: true }}
              continuous />


          </div>
          <button  type="button" class="button-70" onClick={this.UpdateAll}>Confirm Seats</button>
        </div>
        <br></br>
        <br></br>

        <br></br>
        <br></br>

         
            </>
          
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SeatMap />, rootElement);

export default SeatMap;



