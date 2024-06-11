const express = require("express");
const mongoose = require("mongoose");
const { walletRouter } = require("./routes/walletRoute.js");
const { transactionRouter } = require("./routes/transactionRoute.js");


const app = express();
const port = 3000;

const uri = "mongodb+srv://ani:123@cluster0.vq6cazr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    } finally {
        // Disconnect from MongoDB when done
        await mongoose.disconnect();
    }
}

run().catch(console.dir);

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
