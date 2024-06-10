const express = require ("express");
const walletRouter = require ("./routes/walletRoute.js");
const transactionRouter = require ("./routes/transactionRoute.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/wallet',walletRouter);
app.use('/transaction',transactionRouter);
app.listen(port,(err) => {
    if(err){
        console.log("Error on app startup ", err);
    } else{
        console.log("App started successfully");
    }
})
