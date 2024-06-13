const transactionService = require("../services/transactionService");

const postTransactionById = async(req,res) => {
    try {
        const {walletId} = req.params;
        const transaction = await transactionService.createTransaction(walletId, req.body);
        res.status(201).json({ 'message': 'Transaction created successfully', transactionId: transaction.transactionId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTransactionById = async(req,res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await transactionService.getTransactionById(transactionId);
        res.status(200).json({ 'message': 'Transaction fetched successfully', transaction });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAlltransactionsByWalletId = async(req,res) => {
    try {
        const { walletId, skip, limit, sortBy, sortOrder } = req.query;
        const transactions = await transactionService.getAlltransactionsByWalletId(walletId, skip, limit, sortBy, sortOrder);
        res.status(200).json({ 'message': 'Transactions fetched successfully', transactions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    postTransactionById,
    getTransactionById,
    getAlltransactionsByWalletId
}