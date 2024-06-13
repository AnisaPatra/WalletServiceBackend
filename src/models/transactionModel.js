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
        type: Number,
        required: true
    }
},{
    timestamps: true // This will add createdAt and updatedAt fields automatically
})

transactionSchema.index({ walletId: 1, createdAt: -1 });

const transaction = mongoose.model('transaction',transactionSchema);

module.exports = {transaction};