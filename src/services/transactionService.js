const transactionModel = require("../models/transactionModel");

const walletModel = require("../models/walletModel");
const crypto = require("crypto");

const postTransactionById = async(walletId, type, desctiption, amount) => {
    let transactionId = crypto.randomUUID();
    const newTransaction = new transactionModel({transactionId, walletId, type, desctiption, amount});
    await newTransaction.save();
    return newTransaction;
}

const getTransactionById = async(walletId) => {
    const transaction = await transactionModel.findOne({ "transactionId" : transactionId });
    if (!transaction) {
        throw new Error('Transaction not found');
    }
    return transaction;
}

const getAlltransactionsByWalletId = async(walletId) => {
    const transactions = await transactionModel.find({ "walletId": walletId });
    if (!transactions) {
        throw new Error('Transactions not found');
    }
    return transactions;
}

module.exports =  {
    postTransactionById,
    getTransactionById,
    getAlltransactionsByWalletId
}