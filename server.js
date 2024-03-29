const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path")

require("dotenv").config();

//connect to database
mongoose
    .connect(process.env.MONGODBURL)
    .then(()=> {
        console.log("data base connected.");
    })
    .catch((err)=> {
        console.log(err);
    });

//middle ware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
    res.send("This is my Express server!");
});

/*
app.get("/users", (req, res) => {
    res.send("This is users page!");
});*/

app.listen(PORT, ()=> console.log("server is ready"));