const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const adminRouter = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(cookieParser());  
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then( ()=>{
    console.log(`Database connected 😎`);
})
.catch(err =>{
    console.log(err);
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/admin", adminRouter);


// serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
})
app.listen(process.env.DB_PORT, () => console.log(`server is listeining on ${process.env.DB_PORT}`));
