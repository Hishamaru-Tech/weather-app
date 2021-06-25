// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Requiring Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
            /* Dependencies */
            /* Middleware*/
//Requiring body-parser
const bodyParser = require ("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requiring Cors for cross origin allowance
const cors = require('cors');
// Connecting project dependencies(Packages). --> /*Connecting cors to express*/
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const myPort = 8000;
const server = app.listen(myPort, listening);
function listening () {
//Calling back to debug
    console.log("server running");
    console.log(`running on localhost: ${myPort}`)};

    //---could also be like this---
 /*
const server = app.listen(myPort, function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
});
*/
// Or like this.
/*
const server = app.listen(myPort, ()=>{console.log(`Server is running on localhost port: ${myPort}`)});
*/

// Initializing routes.

          /*Get Route*/
app.get ('/allData', serverData);
function serverData(req, res){ //Get route callback function
    res.send(projectData);
}

         /*Post Route*/
app.post ('/addData', clientData);
function clientData (req, res){
//Logging client side's body.
// console.log (req.body);
    myData = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.content
    };
projectData ={...myData}; //Assigning myData to the proejctData using the Spread operator.
    //projectData = Object.assign(myData); /*Assigning myData to the projectData Object using Object.assign method*/
    //projectData.push(myData); /*In case of our projectData is an array*/
}
        /*Post Route through Adding Object Properties*/

/*
app.post ('/addData', (req, res) => {
//function clientData (req, res){
    projectData['date'] = req.body.date,
    projectData['temp'] = req.body.temp,
    projectData['feelings'] = req.body.content
    res.send(projectData);
});
 */
