import { Router, Request, Response } from 'express';
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create-customer';
import { ListCustomersUseCase } from '../../../usecase/customer/list/list-customers';
import { DatabaseCustomerRepository } from '../../customer/repository/sequelize/database-customer-repository';
import { CustomerPresenter } from '../presenter/customer-presenter';

export const customersRoute = Router();

customersRoute.post('/', async (req: Request, res: Response) => {
  const customerRepository = new DatabaseCustomerRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  try {
    const customer = await createCustomerUseCase.execute(req.body);
    res.status(201).json(customer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
});

customersRoute.get('/', async (_req: Request, res: Response) => {
  const customerRepository = new DatabaseCustomerRepository();
  const listCustomersUseCase = new ListCustomersUseCase(customerRepository);
  try {
    const customers = await listCustomersUseCase.execute();
    res.format({
      json: () => res.status(200).json(customers),
      xml: () => res.status(200).send(CustomerPresenter.toXML(customers)),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
});
