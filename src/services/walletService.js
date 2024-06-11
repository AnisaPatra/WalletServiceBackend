const walletModel = require("../models/walletModel");
const crypto = require("crypto");

const createWallet = async(balance, name) => {
    let walletId = crypto.randomUUID();
    const newWallet = new walletModel({walletId,name,balance});
    await newWallet.save();
    return newWallet;
}

const updateWalletById = async(walletId, balance, name) => {
    const wallet = await walletModel.findOne({ walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    const updatedWallet = new walletModel({walletId,name,balance});
    await updatedWallet.save();
    return updatedWallet;
}

const deleteWalletById = async(walletId) => {
    const wallet = await walletModel.findOne({ walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    const deletedWallet = new walletModel.delete({walletId});
    await deletedWallet
    return deletedWallet;
}

const getWalletById = async(walletId) => {
    const wallet = await walletModel.findOne({ walletId });
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    return wallet;
}

module.exports =  {
    createWallet,
    updateWalletById,
    deleteWalletById,
    getWalletById
}