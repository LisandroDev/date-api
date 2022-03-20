const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
    res.json(req.params.date)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App running on port: " + listener.address().port);
});


