import request from 'supertest';
import { app, sequelize } from '../express';

describe('/customers', () => {
  beforeEach(async () => {
    await sequelize.drop();
    await sequelize.sync({ force: true });
  });

  it('creates a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main Street',
          number: 10,
          city: 'Sao Paulo',
          zipCode: '12345678',
        },
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: 'Main Street',
        number: '10',
        city: 'Sao Paulo',
        zipCode: '12345678',
        complement: null,
      },
    });
  });

  it('returns status code 500 if customer is invalid', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
    });
    expect(response.status).toBe(500);
  });

  it('returns a customer list', async () => {
    await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main Street',
          number: 10,
          city: 'Sao Paulo',
          zipCode: '12345678',
        },
      });
    const response = await request(app).get('/customers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      customers: [
        {
          id: expect.any(String),
          name: 'John Doe',
          address: {
            street: 'Main Street',
            number: '10',
            city: 'Sao Paulo',
            zipCode: '12345678',
            complement: null,
          },
        },
      ],
    });
  });
});
