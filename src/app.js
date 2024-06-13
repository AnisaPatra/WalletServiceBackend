const express = require("express");
const env = require('dotenv');
const cors = require("cors");
const mongoose = require("mongoose");
const { walletRouter } = require("./routes/walletRoute.js");
const { transactionRouter } = require("./routes/transactionRoute.js");

env.config();
const app = express();
const port = process.env.PORT;

const uri = process.env.MONGO_URL;
console.log(uri)
async function run() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Use the connection (e.g., define models, make queries, etc.)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
run().catch(console.dir);

app.use(cors());
app.use(express.json());
app.use('/wallet', walletRouter);
app.use('/transaction', transactionRouter);
app.listen(port, (err) => {
    if (err) {
        console.log("Error on app startup ", err);
    } else {
        console.log("App started successfully");
    }
})
