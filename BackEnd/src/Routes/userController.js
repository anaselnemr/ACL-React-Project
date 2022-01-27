// #Task route solution
const Flights = require('../models/Flights');
const Admins = require('../models/Admins');
const Users = require('../models/User');
const RefreshTokens = require('../Models/RefreshTokens.js');
const Reservations = require('../models/Reservation');
const moment = require('moment');
const nodemailer = require('nodemailer');
const today = moment().startOf('day');
// const App = require('../src/App.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



// let refreshTokens = []



exports.createflight = (req, res) => {
  console.log(req.body);

  const flight = new Flights(req.body)
  flight.save()
    .then(result => {
      res.send(result);
      console.log("added");
    })
    .catch(err => {
      res.status(400).send();
      console.log(err);
    });
};




exports.createnewReservation = (req, res) => {
  console.log(req.body);

  const Reservation = new Reservations(req.body)
  Reservation.save()
    .then(result => {
      res.send(result);
      console.log("added");
    })
    .catch(err => {
      res.status(400).send();
      console.log(err);
    });
};


exports.createuseraccount = async (req, res) => {
  console.log(req.body);

  var user = req.body; 
    const takenUsername =await Users.findOne({Username: user.Username.toLowerCase()});
    const takenEmail = await Users.findOne({Email: user.Email.toLowerCase()});
    if (takenUsername){
      res.status(401).send("Username has already been taken!");  //res.json({message:"Username or email has already been taken"})
    }
    else if(takenEmail){
      res.status(403).send("Email already exist, Login!");
    }
    else{ 
      user.Password = await bcrypt.hash(req.body.Password, 10) 
      console.log(user.Password)
      user.Username = user.Username.toLowerCase()
      user.Email = user.Email.toLowerCase()
      const Data = new Users(user)
      Data.save()
    .then(result => {
      res.status(200).send(result); //res.json({message: "Success"}) 
      console.log("added");
    })
    .catch(err => {
      res.status(400).send();
      console.log(err);
    });
    }
  // const User = new Users(req.body)
  // User.save()
  //   .then(result => {
  //     res.send(result);
  //     console.log("added");
  //   })
  //   .catch(err => {
  //     res.status(400).send();
  //     console.log(err);
  //   });
};


exports.GetUserInfo = (req, res) => {
  if(Object.keys(req.body).length === 0){   
    console.log(req.body) 
    return res.status(400).send();
  }
       const search ={};

  Object.keys(req.body).forEach(key => {
  if (req.body[key]!==null) {
      search[key] = {$regex: '^' + req.body[key]};
    }
  });
  console.log(search)

Users.find(search)
.then(result => { 
    if(result.length != 0){
      console.log(result)
     res.send(result);
    }
     else 
     res.status(400).send();
    //  console.log(result)
    })
   .catch(err => {
    console.log(err);
   });
};




exports.userinfo = (req,res)=>
{    var ID = req.body.data.var1;
  Users.find({'_id':ID}).exec().then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
};



exports.viewflights = (req,res)=>
{
  Flights.find().then((result)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));
    });
};





exports.deleteflight = (req,res)=>{
  var del = req.body.var1;
  del.trim();
 Flights.findOneAndDelete({'_id':del}).exec().then(result =>{
     res.status(200).send("Flight Deleted ");
     console.log('The Flight is Deleted successfully !');
 }).catch(err => {
     console.log(err);
   });

};

exports.deletereservation = (req,res)=>{
  var del = req.body.var1;
  del.trim();
 Reservations.findOneAndDelete({'_id':del}).exec().then(result =>{
     console.log('The Reservation is Deleted successfully !');
 }).catch(err => {
     console.log(err);
   });

};

exports.flightmap = (req,res)=>{
  var ID = req.body.data.var1;
  console.log(ID)

Flights.find({'_id':ID}).exec().then(result =>{
  res.send(result)
}).catch(err => {
    console.log(err);
  });

};

exports.searchflightid = (req,res)=>{
  var ID = req.body.data.var1;
Flights.find({'_id':ID}).exec().then(result =>{
  res.send(result)
}).catch(err => {
    console.log(err);
  });

};
exports.updateflight = (req,res)=>{
  var id = req.body.data.var1;
  Flights.findOneAndUpdate({'_id':id},req.body.data.var2).exec().then(result =>{
      res.status(200).send("Flight Updated ");
      console.log('The Flight is Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

};

exports.updateeditflight = (req,res)=>{
  var id = req.body.data.var1;
  console.log("afdsfsafsafasfdasdfasdf")
  console.log(id)
  console.log(req.body.data.var2)
  console.log("afdsfsafsafasfdasdfasdf")
  Reservations.findOneAndUpdate({'_id':id},req.body.data.var2).exec().then(result =>{
      res.status(200).send("Reservation Updated ");
      console.log('The Reservation is Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

};

exports.updateseats = (req,res)=>{
  var id = req.body.data.var1;
  var seats =req.body.data.var2;
  console.log(seats)
  Flights.findOneAndUpdate({'_id':id},{$set:{Available_Seats:seats}}).exec().then(result =>{
      res.status(200).send("Flight Seats Updated ");
      console.log(result)
      console.log('The Flight Seats are Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

};

exports.updatereservationseats = (req,res)=>{
  var id = req.body.data.var1;
  Reservations.findOneAndUpdate({'_id':id},req.body.data.var2).exec().then(result =>{
      res.status(200).send("Reservations Updated ");
      console.log(result)
      console.log('The Reservations is Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

};

exports.updateuser = (req,res)=>{

  var username = req.body.data.var1;
  var mail =req.body.data.var3;
  console.log(username)
  console.log(mail)

  if(username===req.body.data.var2.Username && mail===req.body.data.var2.Email){
  Users.findOneAndUpdate({'Username':username},req.body.data.var2).exec().then(result =>{
      res.status(200).send("User updated ");
      console.log('The User is Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

}
else{
  Users.findOneAndUpdate({'Username':username},req.body.data.var2).exec().then(result =>{
    res.status(200).send("User updated ");
    console.log('The User is Updated successfully !');
}).catch(err => {
    console.log(err);
  });
  Reservations.findOneAndUpdate({'Username':username},req.body.data.var2).exec().then(result =>{
    res.status(200).send("User updated ");
    console.log('The Reservation data is Updated successfully !');
}).catch(err => {
    console.log("You don't have Reservations ");
  });
}};

exports.updatepassword =async (req,res)=>{

  var oldP = req.body.data.var1;
  var newP2 =req.body.data.var2;
  const newP  = await bcrypt.hash(newP2, 10) 
  var realP = req.body.data.var3;
  var ID = req.body.data.var4;
console.log(oldP)
console.log(newP)
console.log(realP)
console.log(ID)


  bcrypt.compare(oldP, realP) 
  .then(isCorrect => {
    if (isCorrect) {
      Users.findOneAndUpdate({'_id':ID},{$set:{Password:newP}}).exec().then(result =>{
        res.status(200).send("User updated ");
        console.log('The User is Updated successfully !');
    }).catch(err => {
        console.log(err);
      });

  }
  else{console.log("WRONG OLD PASSWORD")}
})
};

exports.searchflight = (req, res) => {

 const search ={};
 var dd;
 var ss;
  Object.keys(req.body).forEach(key => {

   if (req.body[key]!==null) {
     if(key=='Flight_Date'){
        dd = (req.body[key]);
        var start = moment(dd).startOf('day');
        var end = moment(dd).endOf('day'); 
        //  console.log(search["Flight_Date"])
          search[key] = { '$gte': start,"$lt": end};
        }
      else if(key=='Economy_Seats' || key=='Business_Seats' || key=='First_Seats'
       || key=='Economy_Baggage' || key=='Business_Baggage' || key=='First_Baggage'
       || key=='Economy_Price ' || key=='Business_Price' || key=='First_Price'){
        ss = (req.body[key]); 
        search[key] = ss;
      }
      else{
      search[key] = {$regex: '^' + req.body[key],     $options: 'ix'};
      }
    }
    
  });

  console.log(search);

Flights.find(search)
.then(result => {
      res.send(result);
      // console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};



exports.usersearchflight = (req, res) => {

  const search ={};
  var dd;
  var ss;
   Object.keys(req.body).forEach(key => {
 
    if (req.body[key]!==null) {
      if(key=='Flight_Date'){
         dd = (req.body[key]);
         var start = moment(dd).startOf('day');
         var end = moment(dd).endOf('day'); 
         //  console.log(search["Flight_Date"])
           search[key] = { '$gte': start,"$lt": end};
         }
       else if(key=='Economy_Seats' || key=='Business_Seats' || key=='First_Seats'
        || key=='Economy_Baggage' || key=='Business_Baggage' || key=='First_Baggage'
        || key=='Economy_Price ' || key=='Business_Price' || key=='First_Price'){
         ss = (req.body[key]); 
         search[key] = ss;
       }
       else{
       search[key] = {$regex: '^' + req.body[key],     $options: 'ix'};
       }
     }
     
   });
 
   console.log(search);
 
 Flights.find(search)
 .then(result => {
       res.send(result);
       // console.log(result);
     })
     .catch(err => {
       console.log(err);
     });
 };
 


// const search ={};

// Object.keys(req.body).forEach(key => {
//  if (req.body[key]!==null) {
//     search[key] = {$regex: '^' + req.body[key],     $options: 'ix'};
//   }
//   else {
//    search[key] = {$regex: '' +"    "};
//   }
// });



// exports.loginpage =  (req, res) => {
//   // const authHeader = req.headers['authorization']
//   // console.log(authHeader);

//     if(Object.keys(req.body).length === 0){    
//       return res.status(400).send();
//     }
//          const search ={};

//     Object.keys(req.body).forEach(key => {
//     if (req.body[key]!==null) {
//         search[key] = {$regex: '^' + req.body[key]};
//       }
//     });
//   Admins.find(search)
//  .then(result => { 
//       if(result.length != 0){
//        res.send(result);
//        console.log(result);
//       }
//        else 
//        res.status(400).send();
//       })
//      .catch(err => {
//       console.log(err);
//      });

    
//  };




//  exports.userlogin = (req, res) => {

//   console.log(req.body);
//   if(Object.keys(req.body).length === 0){    
//     return res.status(400).send();
//   }
//        const search ={};

//   Object.keys(req.body).forEach(key => {
//   if (req.body[key]!==null) {
//       search[key] = {$regex: '^' + req.body[key]};
//     }
//   });

// Users.find(search)
// .then(result => { 
//     if(result.length != 0){
//       console.log("YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
//       console.log(result)
//      res.send(result);
//     }
//      else 
//      res.status(400).send();
//     })
//    .catch(err => {
//     console.log(err);
//    });
// };

exports.reservationinfo = (req,res)=>{
  const key2="Username"
  const key3="ReservationOwner"
  const search ={};
 search[key2]= {$regex: '^' + req.body[key2],$options: 'ix'};
 search[key3]= true;
  Reservations.find(search).then(result =>{
      // console.log(result);
      res.send(result);
  }).catch(err => {
      console.log(err);
    });

}



exports.reservationinfoforpass = (req,res)=>{
  // console.log(req.body[1])
  const key2="Username"
  const key3= req.body["word"]
  const keyid = req.body[key3]
  const search ={};
 search[key2]= {$regex: '^' + req.body[key2],$options: 'ix'};
 search[key3]= {$regex: '^' + keyid,$options: 'ix'};
//  search[key3]= req.body["word"]
  Reservations.find(search).then(result =>{
      // console.log(result);
      res.send(result);
  }).catch(err => {
      console.log(err);
    });

}



