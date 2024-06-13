const express = require ("express");

const transactionRouter =  express.Router();
const transactionController = require('../controllers/transactionController');

transactionRouter.post('/:walletId',transactionController.postTransactionById);
transactionRouter.get('/:transactionId',transactionController.getTransactionById);
transactionRouter.get('/',transactionController.getAlltransactionsByWalletId);

module.exports = {transactionRouter};