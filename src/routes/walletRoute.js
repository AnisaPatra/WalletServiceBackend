const express = require ("express");

const walletRouter = express.Router();
const walletController = require('../controllers/walletController');

walletRouter.post('/setup',walletController.setupWallet);
walletRouter.put('/:id',walletController.updateWalletById);
walletRouter.delete('/:id',walletController.deleteWalletById);
walletRouter.get('/:id',walletController.getWalletById);

module.exports = {walletRouter};

