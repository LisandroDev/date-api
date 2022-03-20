const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { create } = require("tar");

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.use(bodyParser.json());

const isValid = (date) => {
  const utcObj = new Date(date);
  const unixObj = new Date(date * 1000);
  if (isNaN(utcObj.getTime()) == true && isNaN(unixObj.getTime()) == true){
    return false
  }
  return true
};

const createResponse = (date) => {
  let dateObj;
  if(Number.isInteger(Number(date))){
    const num = +date
    dateObj = new Date(num)
  }
  else{
    dateObj = new Date(date)
  }
  return { unix: dateObj.getTime(), utc: dateObj.toUTCString() };
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const input = req.params.date;
  if(!isValid(input)){
    res.json({error: 'Invalid Date'});
    return
  }
  res.json(createResponse(input));
});

const listener = app.listen(process.env.PORT || 3109, () => {
  console.log("App running on port: " + listener.address().port);
});
