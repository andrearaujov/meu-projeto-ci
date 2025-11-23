const request = require('supertest');
const app = require('./index'); 

describe('Testes da API', () => {
  
  it('Deve retornar status 200 e a mensagem correta na rota GET /', async () => {
    const res = await request(app).get('/')
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Pipeline CI/CD funcionando! Teste ao vivo');
  });

});