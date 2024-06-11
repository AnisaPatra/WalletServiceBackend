const walletService = require("../services/walletService");

const setupWallet = async (req, res) => {
    try {
        const { balance, name } = req.body;
        const wallet = await walletService.createWallet(balance, name);
        res.status(201).json({ 'message': 'Wallet created successfully', walletId: wallet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const updateWalletById = async (req, res) => {
    try {
        const { balance, name } = req.body;
        const { walletId } = req.params;
        const wallet = await walletService.updateWalletById(walletId, balance, name);
        res.status(200).json({ 'message': 'Wallet updated successfully', walletId: wallet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteWalletById = async (req, res) => {
    try {
        const { walletId } = req.params;
        await walletService.deleteWalletById(walletId);
        res.status(200).json({ 'message': 'Wallet deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getWalletById = async (req, res) => {
    try {
        const { walletId } = req.params;
        const wallet = await walletService.getWalletById(walletId);
        res.status(200).json({ 'message': 'Wallet fetched successfully', wallet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports =  {
    setupWallet,
    updateWalletById,
    deleteWalletById,
    getWalletById
}