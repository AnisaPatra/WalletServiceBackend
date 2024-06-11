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
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const walletModel = mongoose.model('walletModel', walletSchema);

export {walletModel};