import { expect } from "chai";
import request from 'supertest';
import app from '../app.js';

describe('When a user hits /wallet/setup', () => {
    it('given a user sends balance and name, he should be able to create a wallet', () =>{
        request(app)
        .post('/wallet/setup')
        .send({balance:100, name:"Wallet1"})
        .expect(201)
        .end((err,res) => {
            if(err) console.log(err);
            expect(res.body.walletId).to.not.be.null
            expect(res.body.walletId).to.be.a('string');
        })
    })

    it('given a user sends only name, he should be able to create a wallet', () => {
        request(app)
        .post('/wallet/setup')
        .send({name:"Wallet2"})
        .expect(201)
        .end((err,res) => {
            if(err) console.log(err);
            expect(res.body.walletId).to.not.be.null
            expect(res.body.walletId).to.be.a('string');
        })
    })

    it('given a user sends invalid request, he should get a error on create', () => {
        request(app)
        .post('/wallet/setup')
        .send({name:"Wallet2", balance: "str"})
        .expect(400)
    })

    it('given a user sends valid body, he should be able to update a wallet', () => {
        request(app)
        .post('/wallet/setup')
        .send({balance:1000, name:"Wallet1"})
        .expect(200)
    })

    it('given a user sends invalid request, he should get a error on update', () => {
        request(app)
        .post('/wallet/setup')
        .send({name:"Wallet1", balance: "str"})
        .expect(400)
    })



})