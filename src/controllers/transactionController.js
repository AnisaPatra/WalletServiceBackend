const postTransactionById = async(req,res) => {
    try {
        const {walletId} = req.params;
        const { type, desctiption, amount } = req.body;
        const transaction = await transactionService.createTransaction(walletId, type, desctiption, amount);
        res.status(201).json({ 'message': 'Transaction created successfully', transactionId: transaction });
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
        const { walletId, skip, limit } = req.params;
        const transactions = await transactionService.getAlltransactionsByWalletId(walletId, skip, limit);
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