require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  // res.send("server is running")
});

app.post("/",function(req,res){
    // console.log(req.body.cityName);


    const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    // addevent listener callback (jquery)
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      //   these data in array on jason format (more details from lecture section 19)
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      //   this line url from open weather api
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(`<h1>THe temperature in ${req.body.cityName} ` + temp + "°C.</h1>");
      res.write("<p>weather is currently" + weatherDescription + "</p>");
      res.write("<img src=" + imageUrl + ">");

      res.send();
    });
  });

})



app.listen(3000, function () {
  console.log("server running!!");
});
