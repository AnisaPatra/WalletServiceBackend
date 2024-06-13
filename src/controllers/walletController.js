const walletService = require("../services/walletService");

const setupWallet = async (req, res) => {
    try {
        const wallet = await walletService.createWallet(req.body);
        res.status(201).json({ 'message': 'Wallet created successfully', walletId: wallet.walletId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getWallets = async(req,res) => {
    try {
        let wallet = await walletService.getWallets();
        if(wallet == []){
            res.status(404).json({ 'message': 'No Wallet Found', wallets : wallet });
        } else{
            res.status(200).json({ 'message': 'Wallet fetched successfully', wallets : wallet });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateWalletById = async (req, res) => {
    try {
        const { walletId } = req.params;
        await walletService.updateWalletById(walletId, req.body);
        res.status(200).json({ 'message': 'Wallet updated successfully'});
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
        res.status(200).json({ 'message': 'Wallet fetched successfully', walletDetails : wallet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports =  {
    setupWallet,
    updateWalletById,
    deleteWalletById,
    getWalletById,
    getWallets
}