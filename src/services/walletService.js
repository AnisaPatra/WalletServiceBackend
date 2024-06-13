const walletModel = require("../models/walletModel");
const transactionModel = require("../models/transactionModel").transaction;
const crypto = require("crypto");

const createWallet = async(data) => {
    if(data.balance && isNaN(data.balance)){
        throw new Error("Invalid balance")
    }
    const balance = data.balance ?parseFloat(data.balance).toFixed(4) : data.balance;
    const name = data.name;
    let walletId = crypto.randomUUID();
    const newWallet = new walletModel.wallet({walletId,name,balance});
    await newWallet.save();
    return newWallet;
}

const updateWalletById = async(walletId, data) => {
    if(data.balance && isNaN(data.balance)){
        throw new Error("Invalid balance")
    }
    let balance = data.balance ?parseFloat(data.balance).toFixed(4) : data.balance;
    balance = parseFloat(balance);
    const name = data.name;
    const wallet = await walletModel.wallet.findOne({"walletId":walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    const updatedWallet = await walletModel.wallet.updateOne({"walletId":walletId},{name,balance});
    return updatedWallet;
}

const deleteWalletById = async(walletId) => {
    const wallet = await walletModel.wallet.findOne({ walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    const transactions = await transactionModel.find({walletId});
    let transactionToDelete = [];
    transactions.map((transaction) => transactionToDelete.push(transaction.transactionId));
    await transactionModel.deleteMany({"transactionId":{$in:transactionToDelete}});
    await walletModel.wallet.deleteOne({"walletId": walletId});
    return;
}

const getWalletById = async(walletId) => {
    const wallet = await walletModel.wallet.findOne({ "walletId": walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    delete wallet._doc._id;
    delete wallet._doc.__v;
    return wallet;
}

const getWallets = async() => {
    let wallet = await walletModel.wallet.find({});
    if (!wallet) {
        throw new Error('Wallet not found');
    } else if(wallet != []){
        wallet.forEach(item => {
            delete item._doc._id;
            delete item._doc.__v;
        })
    }

    return wallet;
}

module.exports =  {
    createWallet,
    updateWalletById,
    deleteWalletById,
    getWalletById,
    getWallets
}