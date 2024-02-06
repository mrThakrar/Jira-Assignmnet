const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import card routes
const cardRoutes = require("./routes/CardRoutes");

//use card routes
app.use(cardRoutes);

//if any unknown routes comes then execute this block
app.use("/*", (req, res) => {
    res.send("404 not API Found");
});
//db connections
mongoose
    .connect(
        process.env.MONGO_URL,
        { useUnifiedTopology: true },
        { useNewUrlParser: true }
    )
    .then((result) => {
        console.log("Server Connected @", process.env.PORT);
        app.listen(process.env.PORT);
    })
    .catch((err) => console.log(err));

