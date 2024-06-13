const transactionModel = require("../models/transactionModel").transaction;
const walletService = require("./walletService");
const crypto = require("crypto");

const createTransaction = async (walletId, data) => {
    let type = data.type;
    let description = data.description;
    let transactionId = crypto.randomUUID();
    if(data.amount && isNaN(data.amount)){
        throw new Error("Invalid amount")
    }
    let amount = data.amount ? parseFloat(data.amount).toFixed(4) : data.amount;
    amount = parseFloat(amount);
    let walletDetails = await walletService.getWalletById(walletId);
    const newTransaction = new transactionModel({ transactionId, walletId, type, description, amount });
    if (type == "Credit") {
        updateBalance = walletDetails._doc.balance + amount;
        walletService.updateWalletById(walletId, { balance: updateBalance });
    } else if (type == "Debit") {
        if (amount < walletDetails.balance) {
            updateBalance = walletDetails.balance - amount;
            walletService.updateWalletById(walletId, { balance: updateBalance });
        } else {
            throw new Error("Insufficient Balance");
        }
    } else {
        throw new Error("Invalid transaction type");
    }
    await newTransaction.save();
    return newTransaction;
}

const getTransactionById = async (transactionId) => {
    const transaction = await transactionModel.findOne({ "transactionId": transactionId });
    if (!transaction) {
        throw new Error('Transaction not found');
    }
    delete transaction._doc._id;
    delete transaction._doc.__v;
    return transaction;
}

const getAlltransactionsByWalletId = async (walletId, skip, limit, sortBy, sortOrder) => {
    const transactions = await transactionModel.find({ "walletId": walletId }).skip(skip).limit(limit).sort([[sortBy,sortOrder]]);
    if (!transactions) {
        throw new Error('Transactions not found');
    }
    transactions.forEach(transaction => {
        delete transaction._doc._id;
        delete transaction._doc.__v;
    });
    return transactions;
}

module.exports = {
    createTransaction,
    getTransactionById,
    getAlltransactionsByWalletId
}