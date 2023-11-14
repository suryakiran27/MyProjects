const express = require('express');
const dbConnected  = require('./dbconnection/dbConfiguration');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

dbConnected();
app.use(express.json())
app.use("/orders" , require('./routes/orderRoutes'));

app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`);
})