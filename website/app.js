/* Global Variables */
//apiKey acquired from the openweathermap website.
const apiKey = "&appid=f993b6e5dddba9198f5aa21b15d9e74f"
//openweathermap's URL.
let myURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
//adding +1 to the date because the index of month starts with 0
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//TODO My data holder.

//Targetting the "generate button" ID to add an EventListener function.
document.getElementById("generate").addEventListener("click", onAction);
/* Posting data to the API through the event listner's function*/
function onAction(){
    //My data holder.
    const zipCode = document.getElementById("zip").value;  //Getting the zipcode at the user's interface.
    const myFeelings = document.getElementById("feelings").value; //Getting the feelings at the user's interface.
        /*Calling the data from the GET weatherapp API through a function*/
    getWeather(myURL, zipCode, apiKey)
        .then(function(apiData){
         // console.log(apiData);  //checking if the data is flowing correctly through logging it.
         //Calling both the UI and WeatherAPI data through the postData function.
            postData('/addData', {date: newDate, temp: apiData.main.temp, content: myFeelings});
            //Calling the updated version of the user's interface through the updateUI function.
            updInterface();
        })    
};

/* GET the API data through a function */
const getWeather = async (myURL, zipCode, apiKey) => {
    const getRes = await fetch (myURL+zipCode+apiKey+"&units=metric"); // Converting temp to celcius.
    try {
        const returnedData = await getRes.json();
        //console.log(returnedData);
        return returnedData;
    } catch (error) {
        console.log("error", error); //Logging an error in case of data fetch failure.
    }
}

/*POST data function.*/

const postData = async (url="", data = {})=> {
//Fetching the route url, method, credentials, headers and the body
    console.log(data);
   const postRes = await fetch(url, {
        method:"POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json",
        },
        // Body's data type must match the Content-Type headers.
        body: JSON.stringify(data),
    });
    try {
       const newData = await postRes.json();
       //console.log (newData);
        return newData;
    } catch (error) {
        //logging an error isn't needed while sending data to the server.
        console.log("error", error);
    }
};

//GET data function from the server to update the user's interface.
const updInterface = async () => {
    const updRequest = await fetch ('/allData');
    try{
        const myData = await updRequest.json();
        document.getElementById('date').innerHTML = "Today's date is:" + myData.date;
        document.getElementById('temp').innerHTML = "The temperature is:" + myData.temp + " C°";
        document.getElementById('content').innerHTML = "You feel:" + myData.feelings;
    } catch (error){
        console.log("error", error);
    }
}