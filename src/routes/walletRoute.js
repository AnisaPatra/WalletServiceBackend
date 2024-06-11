const express = require ("express");

const walletRouter = express.Router();
const walletController = require('../controllers/walletController');

walletRouter.post('/setup',walletController.setupWallet);
walletRouter.put('/:walletId',walletController.updateWalletById);
walletRouter.delete('/:walletId',walletController.deleteWalletById);
walletRouter.get('/:walletId',walletController.getWalletById);

module.exports = {walletRouter};

