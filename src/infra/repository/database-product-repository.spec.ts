import { randomUUID } from 'crypto';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../db/sequelize/model/product-model';
import { Product } from '../../domain/entity/product';
import { DatabaseProductRepository } from './database-product-repository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('creates a product', async () => {
    const productRepository = new DatabaseProductRepository();
    const product = new Product(randomUUID(), 'Product Name', 25.0);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('updates a product', async () => {
    const productRepository = new DatabaseProductRepository();
    const product = new Product(randomUUID(), 'Product Name', 25.0);
    await productRepository.create(product);
    product.changeName('Other Product Name');
    product.changePrice(42.0);
    await productRepository.update(product);
    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('finds a product', async () => {
    const productRepository = new DatabaseProductRepository();
    const product = new Product(randomUUID(), 'Product Name', 25.0);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    const foundProduct = await productRepository.find(product.id);
    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it('finds many products', async () => {
    const productRepository = new DatabaseProductRepository();
    const products = [
      new Product(randomUUID(), 'Product Name 1', 25.0),
      new Product(randomUUID(), 'Product Name 2', 45.0),
    ];
    for (const product of products) {
      await productRepository.create(product);
    }
    const foundProducts = await productRepository.findAll();
    expect(products).toEqual(foundProducts);
  });
});
