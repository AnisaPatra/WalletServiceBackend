# WalletService
A basic wallet service that features top-up and transactions

### System Design

Functional Requirements

• Setup wallet 

• Credit / Debit transactions

• Fetching transactions on wallet

• Get wallet details


System Requirements

• High Availability 

• High Performance

• High Accuracy 

• Wallet and Transaction Details Storage

• Sort Transactions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### API Endpoints

- Wallet

POST /wallet/setup

Request: 
{
  "name": "Wallet1",
  "balance": 100
}

Response: 
{
  "message": "Wallet created successfully",
  "walletId": "60c72b2f9b1e8c001c8a1234"
}

PUT /wallet/:walletId

Request: 
{
  "balance": 200
}

Response : 
{
  "message": "Wallet updated successfully"
}

DELETE /wallet/:walletId

Response : 
{
  "message": "Wallet deleted successfully"
}

GET /wallet/:walletId

Response : 
{
  "message": "Wallet fetched successfully",
  "walletDetails": {
    "name": "Wallet1",
    "balance": 100,
    "updatedAt": "2021-06-13T12:00:00.000Z"
  }
}

GET /wallet

Response : 
{
  "message": "Wallets fetched successfully",
  "walletDetails": [{
    "name": "Wallet1",
    "balance": 100,
    "updatedAt": "2021-06-13T12:00:00.000Z"
  },{
    "name": "Wallet2",
    "balance": 100,
    "updatedAt": "2021-06-13T12:00:00.000Z"
  }]
}

- Transactions

POST /transaction/:walletId

Request: 
{
  "amount": 50,
  "description":"Transaction Description",
  "type": "CREDIT" // or "DEBIT"
}

Response : 
{
  "message": "Transaction created successfully",
  "transactionId": "60c72b2f9b1e8c001c8a1234"
}

GET /transaction/:transactionId

Response : 
{
  "message": "Transaction fetched successfully",
  "transaction": {
    "amount": 50,
    "type": "CREDIT",
    "createdAt": "2021-06-13T12:00:00.000Z"
  }
}

GET /transaction

Request Parameters (as query parameters):

walletId: ID of the wallet to retrieve transactions for
skip (optional): Number of transactions to skip
limit (optional): Number of transactions to retrieve

Response : 
{
  "message": "Transactions fetched successfully",
  "transactions": [
    {
      "amount": 50,
      "type": "CREDIT",
      "createdAt": "2021-06-13T12:00:00.000Z"
    }
  ]
}


### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Mocha and Chai (for testing)

