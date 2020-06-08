const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./configs");
const routes = require("./routes");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

// for http post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// must before app

app.use("/api", routes);

//mongodb connection status-----
// mongoose.connect(config.mongodb, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.once("open", _ => {
//     console.log("Database conntected", config.mongodb)
// });

// db.on("error", err => {
//     console.error("connection error: ", err);
// })
//----mongodb connection status---end

mongoose.connect(config.mongodb, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("listening on 3000");
        });
    });
