
// External variables
const express = require("express");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const userController = require('./Routes/userController');
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config();
const Admins = require('../src/Models/Admins.js');
const Users = require('../src/Models/User.js');
const RefreshTokens = require('../src/Models/RefreshTokens.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
var Cookies = require('cookies')

const stripe = require("stripe")("sk_test_REDACTED_BY_GITHUB_PUSH_PROTECTION");
const uuid = require("uuid").v4;

// import {cookie} from "cookie"





// // app.js
// const connectDB = require('./config/db');
// // Connect Database
// connectDB();

// let refreshTokens = []


//App variables
const app = express();
const port = process.env.PORT || "8000";
// #Importing the userController
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
const MongoURI = 
'mongodb+srv://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@cluster0.nvdj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
;
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));



var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user:"user62kk@gmail.com", 
      pass:"192837192837"
  }
});

var mailoptions={
to: 'ahmed.eltawel35@gmail.com',
subject: "Reservation Cancellation",
text: "Email Test Has Passed"
}

var mailoptions2={
  to: 'ahmed.eltawel35@gmail.com',
  subject: "Reservation Confirmation",
  text: "Email Test Has Passed"
  }
  app.post("/payment", (req, res) => {
    const { product, token } = req.body;
    // console.log("PRODUCT ", product);
    // console.log("PRICE ", product.price);
    // console.log(token);
    // const idempontency_Key = uuid();

    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description:' purchase of ${product.name}'
          }
        );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log("err"));
  });

 

// transporter.sendMail(mailoptions, function (error, info, callback){
// if(error){
//   console.log(error);
// }else{
//   console.log('Message sent: ' + info.response);
// }
// });

app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

  app.post("/sendmail", (req, res) => {
    console.log("we have reached hereeee")
    mailoptions.to=req.body.data.var2
  const reserv= req.body.data.var3;
  console.log(reserv)
    mailoptions.html= '<html>' +
    '<body>'+

  '<h2>  Reservation Info  </h2>' +

   ' <ul>'+
      '<li>UserName: ' + reserv.Username +'</li>'+
    ' <li>First Name: '+ reserv.FirstName +'</li>'+
    ' <li>Last Name: '+ reserv.LastName +'</li>'+
    ' <li> Round Trip Flight From: ' + reserv.Flight_From +'  To: ' + reserv.Flight_To +'</li>'+
     ' <li>Depart Flight Number: ' + reserv.Flight_NoFrom +'</li>'+
      '<li>Return Flight Number: ' + reserv.Flight_NoTo +'</li>'+
      '<li>Depart Flight Date: ' + reserv.Flight_DateFrom +'</li>'+
      '<li>Return Flight Date: ' + reserv.Flight_DateTo +'</li>'+
     ' <li>Reservation ID: ' + reserv._id  +'</li>'+

    '</ul>' +
    '<h3>Your personal reservation has been cancelled and you will be refunded $'+reserv.TotalPrice+'</h3>'
  '  </body>' +
   ' </html>'

    transporter.sendMail(mailoptions, function (error, info, callback){
      if(error){
        console.log(error);
      }else{
        console.log('Message sent: ' + info.response);
      }
      });

  });

  




  app.post("/sendmailconfirm", (req, res) => {
    console.log("we have reached hereeee")
    mailoptions2.to=req.body.data.var2
  const reserv= req.body.data.var3;
  console.log(reserv)
  mailoptions2.html= '<html>' +
    '<body>'+

  '<h2>  Reservation Info  </h2>' +

   ' <ul>'+
      '<li>UserName: ' + reserv.Username +'</li>'+
    ' <li>First Name: '+ reserv.FirstName +'</li>'+
    ' <li>Last Name: '+ reserv.LastName +'</li>'+
    ' <li> Round Trip Flight From: ' + reserv.Flight_From +'  To: ' + reserv.Flight_To +'</li>'+
     ' <li>Depart Flight Number: ' + reserv.Flight_NoFrom +'</li>'+
      '<li>Return Flight Number: ' + reserv.Flight_NoTo +'</li>'+
      '<li>Depart Flight Date: ' + reserv.Flight_DateFrom +'</li>'+
      '<li>Return Flight Date: ' + reserv.Flight_DateTo +'</li>'+
      ' <li>Depart Flight Seat: ' + reserv.SeatsChoosenFrom  +'</li>'+
      ' <li>Return Flight Seat: ' + reserv.SeatsChoosenTo  +'</li>'+
      ' <li>Reservation ID: ' + reserv._id  +'</li>'+

    '</ul>' +
    '<h3>Your personal reservation has been confirmed and paid with an amount of $'+reserv.TotalPrice+'</h3>'
  '  </body>' +
   ' </html>'

    transporter.sendMail(mailoptions2, function (error, info, callback){
      if(error){
        console.log(error);
      }else{
        console.log('Message sent: ' + info.response);
      }
      });

  });


//Flight and admin
app.post('/createflight',authenticateToken ,userController.createflight)
app.get('/viewflights' ,authenticateToken ,userController.viewflights )
app.delete('/deleteflight',authenticateToken ,userController.deleteflight)
app.put('/updateflight' ,authenticateToken ,userController.updateflight)
app.post('/searchflight' ,authenticateToken ,userController.searchflight)
// (req, res) => { 
//   console.log("rtyuio")
//   console.log(res.data.RefreshToken)
//   refreshTokens.push(res.data.RefreshToken)
// })

//User
app.post('/createuseraccount',userController.createuseraccount)
// app.post('/userlogin',userController.userlogin)
app.post('/createnewReservation',authenticateToken ,userController.createnewReservation)
app.post('/GetUserInfo',authenticateToken ,userController.GetUserInfo)
app.post('/userinfo',authenticateToken ,userController.userinfo)
app.put('/updateuser',authenticateToken ,userController.updateuser)
app.put('/updatepassword',authenticateToken ,userController.updatepassword)
app.post('/reservationinfo',authenticateToken ,userController.reservationinfo)
app.post('/reservationinfoforpass',authenticateToken ,userController.reservationinfoforpass)
app.post('/flightmap' ,authenticateToken,userController.flightmap)
app.put('/updateseats' ,authenticateToken,userController.updateseats)
app.put('/updatereservationseats' ,authenticateToken,userController.updatereservationseats)
app.delete('/deletereservation' ,authenticateToken,userController.deletereservation)
app.post('/usersearchflight' ,userController.usersearchflight)
app.post('/searchflightid',authenticateToken,userController.searchflightid)
app.put('/updateeditflight',authenticateToken,userController.updateeditflight)






app.post('/userlogin' ,  async (req, res) => {
  console.log(req.body.Username)
  Users.findOne({Username: req.body.Username.toLowerCase()}) 
  .then(dbUser => { 
    if (!dbUser) { 
      console.log(dbUser)
      return res.status(401).send("Username does not Exist!");
      //  res.json({ 
      //   message: "Invalid Username or Password" 
      // }) 
   }
  bcrypt.compare(req.body.Password, dbUser.Password) 
  .then(isCorrect => {
    if (isCorrect) {
       const payload = { 
         id: dbUser._id, 
         username: dbUser.Username, 
    } 
   const AccessToken =  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: (10)*60}) //15 mins
    jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET, {expiresIn: (12)*60*60},
        (err, token) => { 
          if (err) return res.json({message: err}) 
        //  refreshTokens.push(token)
        //  console.log(refreshTokens)
        
        var userid = dbUser._id.toString()
        var Refresh = {}
        Refresh['UserID'] = userid
        Refresh['RefreshToken'] = token
        const RefreshToken = new RefreshTokens(Refresh)
        // console.log(RefreshToken)

        RefreshTokens.findOne({UserID: userid}) 
        .then(dbUser => { 
          if (!dbUser) { 
                console.log("NOT FOUND!!")
                RefreshToken.save()
                .then(result => {
                })
                .catch(err => {
                  console.log(err);
                })
          }
          else{
            console.log("FOUND!!")
            RefreshTokens.findOneAndUpdate({'UserID':userid},Refresh).exec().then(result =>{
          }).catch(err => {
              console.log(err);
            });
          }
        })

          return res.json({ message: "Success",
           AccessToken: "Bearer " + AccessToken,
          RefreshToken: token,
          UserID: userid
         }) 

      })
     } else{
      return res.status(403).send("Incorrect Password!");
             }
         })
         .catch(err => {
          res.status(500).send('Internal server error');
      })
      })
  })
// 



app.post('/loginpage' ,  async (req, res) => {
  Admins.findOne({Username: req.body.Username}) 
  .then(dbUser => { 
    if (!dbUser) { 
      console.log(dbUser)
      return res.status(401).send("Username does not Exist!");
      //  res.json({ 
      //   message: "Invalid Username or Password" 
      // }) 
   }
  bcrypt.compare(req.body.Password, dbUser.Password) 
  .then(isCorrect => {
    if (isCorrect) {
       const payload = { 
         id: dbUser._id, 
         username: dbUser.Username, 
    } 
   const AccessToken =  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: (10)*60}) //15 mins
    jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET, {expiresIn: (12)*60*60},
        (err, token) => { 
          if (err) return res.json({message: err}) 
        //  refreshTokens.push(token)
        //  console.log(refreshTokens)
        
        var userid = dbUser._id.toString()
        var Refresh = {}
        Refresh['UserID'] = userid
        Refresh['RefreshToken'] = token
        const RefreshToken = new RefreshTokens(Refresh)
        // console.log(RefreshToken)

        RefreshTokens.findOne({UserID: userid}) 
        .then(dbUser => { 
          if (!dbUser) { 
                console.log("NOT FOUND!!")
                RefreshToken.save()
                .then(result => {
                })
                .catch(err => {
                  console.log(err);
                })
          }
          else{
            console.log("FOUND!!")
            RefreshTokens.findOneAndUpdate({'UserID':userid},Refresh).exec().then(result =>{
          }).catch(err => {
              console.log(err);
            });
          }
        })

          return res.json({ message: "Success",
           AccessToken: "Bearer " + AccessToken,
          RefreshToken: token,
          UserID: userid
         }) 

      })
     } else{
      return res.status(403).send("Incorrect Password!");
             }
         })
         .catch(err => {
          res.status(500).send('Internal server error');
      })
      })
  })






  app.delete('/logout', (req, res) => {
    var del = req.body.ID
    RefreshTokens.findOneAndDelete({'UserID':del}).exec().then(result =>{
      res.status(204).send("RefreshToken Deleted");
  }).catch(err => {
      console.log(err);
    });
  })



  // app.get('/viewflights', (req, res) => {
  //   console.log(req.cookies) 

  //   // res.cookie("Accessss","aoaoaoaoaoa",{
  //   //   path: "/",
  //   //   httpOnly: false,
  //   // })
    
  //   // res.cookie("ghjghj","aoaoaoaoaopppa")
  //   res.header("Content-Type",'application/json');
  //   res.send("Dataaaa")
  // })


  



function authenticateToken(req, res, next) {

  // console.log(req.cookies) 
 
   var AccessToken = req.cookies.AccessToken
   const RefreshToken = req.cookies.RefreshToken

   console.log(AccessToken)
   const token = AccessToken && AccessToken.split(' ')[1]
   console.log(AccessToken)
   if (token == null) return  res.status(403).send("Access Token Not Found!")
 else{
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
     if(!err){
            console.log("AccessToken Usedddddddd")
           return next() 
     }
     if (err) {
      console.log("AccessToken Expireddddd")
      //  return res.sendStatus(403)
      if (RefreshToken == null) return res.sendStatus(403)
      RefreshTokens.findOne({'RefreshToken':RefreshToken}) 
      .then(Token => { 
        if (!Token) { 
          console.log("refreshtokennnnnn not in active sessionnnn")
          return res.status(403).send("Refresh Token Not in DB!");
        }
        else{
          console.log("refreshToken Founddd in DBBB")
        jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET ,(err, user) => {
         
        if (err) { 
          console.log("Refresh Token Expireddddd!")
          return res.status(403).send("Refresh Token Expired 'LogIn Again' !"); //res.sendStatus(407); //res.sendStatus(403)
        }
        else{
          console.log("Refresh Token Useddd!")
        const payload = { 
          id: user.id, 
          username: user.username, 
     } 
    //  console.log(payload)
     AccessToken =  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3000}) //15 mins
     console.log("Access Token Updated!")
    //  console.log(AccessToken)
     res.cookie("AccessToken","Bearer " + AccessToken,{
      path: "/",
      httpOnly: false,
      // maxAge: (1000) * 15
    })
     return next() ;
        }
      })
        }

      })
     }
    
   })
  }
 }




// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
