import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port,(err) => {
    if(err){
        console.log("Error on app startup ", err);
    } else{
        console.log("App started successfully");
    }
})

export default app;