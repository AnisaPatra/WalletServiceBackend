const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    walletId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
})

const walletModel = mongoose.model('walletModel', walletSchema);

module.exports =  {walletModel};