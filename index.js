console.log("Hello Student Developer");


// ------------------------All files ---------------------------------

const express = require('express');
const LoginRoute = require('./Express Routers/routes');
// const bcrypt = require('brcypt');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// -------------------end_here----------------------------------------------


//-------------------------Dotenv Manager --------------------
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;
const db = process.env.DB;


// closing dotenev files 

 



// ----------------------------connecting the Database ----------------------------------

mongoose.connect(db, ()=>
{
    console.log("Database in connected Successfully");
})


// --------------------------closing ----------------------------------------------------------







// ------------------------------------------close------------------------------------------------



// ------------------------------Opening then express server --------------------------


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())




app.use(LoginRoute);
app.listen(port, ()=>
{
    console.log(`Server up and running on port ${port}`);
})


// -------------------------------Closing the server----------------------------------------

