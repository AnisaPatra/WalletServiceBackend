const { expect } = require ("chai");
const request = require  ('supertest');
const app = require  ('../app.js');

describe('Wallet API', () => {
    let walletId;

    describe('Setup Wallet', () => {
        it('should create a wallet with balance and name', async () => {
            const res = await request(app)
                .post('/wallet/setup')
                .send({ balance: 100, name: "Wallet1" })
                .expect(201);
            
            expect(res.body.walletId).to.not.be.null;
            expect(res.body.walletId).to.be.a('string');
            walletId = res.body.walletId;
        });

        it('should create a wallet with only name', async () => {
            const res = await request(app)
                .post('/wallet/setup')
                .send({ name: "Wallet2" })
                .expect(201);
            
            expect(res.body.walletId).to.not.be.null;
            expect(res.body.walletId).to.be.a('string');
        });

        it('should return an error for invalid balance', async () => {
            await request(app)
                .post('/wallet/setup')
                .send({ name: "Wallet2", balance: "str" })
                .expect(400);
        });
    });

    describe('Update Wallet', () => {
        it('should update the wallet with a valid body', async () => {
            const setupRes = await request(app)
                .post('/wallet/setup')
                .send({ balance: 1000, name: "Wallet1" })
                .expect(201);
            
            const updateRes = await request(app)
                .put(`/wallet/${setupRes.body.walletId}`)
                .send({ balance: 2000 })
                .expect(200);

            expect(updateRes.body.message).to.equal('Wallet updated successfully');
        });

        it('should return an error for invalid update request', async () => {
            const setupRes = await request(app)
                .post('/wallet/setup')
                .send({ balance: 1000, name: "Wallet1" })
                .expect(201);

            await request(app)
                .put(`/wallet/${setupRes.body.walletId}`)
                .send({ name: "Wallet1", balance: "str" })
                .expect(400);
        });
    });

    describe('Get Wallet Details', () => {
        it('should fetch wallet details for a valid wallet', async () => {
            const setupRes = await request(app)
                .post('/wallet/setup')
                .send({ balance: 1000, name: "Wallet1" })
                .expect(201);
            
            const getRes = await request(app)
                .get(`/wallet/${setupRes.body.walletId}`)
                .expect(200);

            expect(getRes.body.walletDetails.balance).to.equal(1000);
            expect(getRes.body.walletDetails.name).to.equal("Wallet1");
        });

        it('should return an error for a non-existing wallet', async () => {
            await request(app)
                .get(`/wallet/non_existing_wallet_id`)
                .expect(404);
        });
    });
});
