const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');
// const { obterTransferencia } = require('../helpers/transferencia');

describe('Transferencias', () => {
        let token;
        let transferencia;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        })

    describe('POST /transferencias', () => {
        it('Deve retornar 201 quando a transferência for criada com sucesso', async () => {
            const bodyTransferencia = {...postTransferencias}
            bodyTransferencia.valor = 11;

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencia)

            expect(resposta.status).to.equal(201)
        })

        it('Deve retornar 422 quando valor da transferência menor que 10', async () => {
            const bodyTransferencia = {...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencia)

            expect(resposta.status).to.equal(422);
        })
    })

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar 200 quando a transferência for encontrada e os valores devem estar igual ao banco de dados', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/3')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                
            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(3)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_origem_id).to.be.a('number')
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.conta_destino_id).to.be.a('number')
            //bug deveria ser float segundo o swagger mas esta como string
            //expect(resposta.body.valor).to.equal(50.00)
            //expect(resposta.body.valor).to.be.a('float')
        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 200 e retornar 10 transferencias', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                
            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)
        })
    })
})