const express = require ("express");

const transactionRouter =  express.Router();
const transactionController = require('../controllers/transactionController');

transactionRouter.post('/:walletId',transactionController.postTransactionById);
transactionRouter.put('/:id',transactionController.updateTransactionById);
transactionRouter.get('/:id',transactionController.getTransactionById);
transactionRouter.get('/:walletId',transactionController.getAlltransactionsByWalletId);

module.exports = transactionRouter;