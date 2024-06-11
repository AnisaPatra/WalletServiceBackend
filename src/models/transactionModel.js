const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionId:{
        type: String,
        required: true,
        unique: true
    },
    walletId : {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        enum : ["Debit", "Credit"]
    },
    description:{
        type: String
    },
    amount: {
        type: number,
        required: true
    }
},{
    timestamps: true // This will add createdAt and updatedAt fields automatically
})

transactionSchema.index({ walletId: 1, createdAt: -1 });

const transactionModel = mongoose.model('transactionModel',transactionSchema);

export {transactionModel};