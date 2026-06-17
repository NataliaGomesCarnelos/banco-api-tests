const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        })

        it('Deve retornar 201 quando a transferência for criada com sucesso', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 3,
                    valor: 11,
                    token: ""
                })
            console.log(resposta.body);    
            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar 422 quando valor da transferência menor que 10', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 3,
                    valor: 9,
                    token: ""
                })
            expect(resposta.status).to.equal(422);
        })
    })
})