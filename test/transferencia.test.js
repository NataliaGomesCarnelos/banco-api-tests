const request = require('supertest');
const { expect } = require('chai');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar 201 quando a transferência for criada com sucesso', async () => {
            
            const respostaLogin = await request('http://localhost:3000')
                            .post('/login')
                            .set('Content-Type', 'application/json')
                            .send({
                                'username': 'julio.lima',
                                'senha': '123456'
                            })
            expect(respostaLogin.status).to.equal(200);
            const token = respostaLogin.body.token;

            const resposta = await request('http://localhost:3000')
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
            
            const respostaLogin = await request('http://localhost:3000')
                            .post('/login')
                            .set('Content-Type', 'application/json')
                            .send({
                                'username': 'julio.lima',
                                'senha': '123456'
                            })
            expect(respostaLogin.status).to.equal(200);
            const token = respostaLogin.body.token;

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 3,
                    valor: 9,
                    token: ""
                })
        console.log(resposta.body);    
            expect(resposta.status).to.equal(422);
        })
    })
})