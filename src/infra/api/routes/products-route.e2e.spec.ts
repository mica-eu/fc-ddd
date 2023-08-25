import request from 'supertest';
import { app, sequelize } from '../express';

describe('/products', () => {
  beforeEach(async () => {
    await sequelize.drop();
    await sequelize.sync({ force: true });
  });

  it('creates a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product Name',
      price: 200,
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Product Name',
      price: 200,
    });
  });

  it('returns status code 500 if product is invalid', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product Name',
    });
    expect(response.status).toBe(500);
  });

  it('returns a product list', async () => {
    await request(app).post('/products').send({
      name: 'Product Name',
      price: 150,
    });
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      products: [
        {
          id: expect.any(String),
          name: 'Product Name',
          price: 150,
        },
      ],
    });
  });
});
