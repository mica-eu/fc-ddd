import { Router, Request, Response } from 'express';
import { DatabaseProductRepository } from '../../product/repository/sequelize/database-product-repository';
import { CreateProductUseCase } from '../../../usecase/product/create/create-product';
import { ListProductUseCase } from '../../../usecase/product/list/list-product';

export const productsRoute = Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const productRepository = new DatabaseProductRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);
  try {
    const product = await createProductUseCase.execute(req.body);
    res.status(201).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
});

productsRoute.get('/', async (req: Request, res: Response) => {
  const productRepository = new DatabaseProductRepository();
  const listProductsUseCase = new ListProductUseCase(productRepository);
  try {
    const products = await listProductsUseCase.execute({});
    res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
});
