import { randomUUID } from 'crypto';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer-model';
import { Address } from '../../domain/customer/value-object/address';
import { DatabaseCustomerRepository } from './database-customer-repository';
import { Customer } from '../../domain/customer/entity/customer';

describe('CustomerRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('creates a customer', async () => {
    const customerRepository = new DatabaseCustomerRepository();
    const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
    const customer = new Customer(randomUUID(), 'John Doe', address);
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });
    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      active: customer.isActive(),
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
      street: customer.address.street,
      number: customer.address.number,
      complement: customer.address.complement,
    });
  });

  it('updates a customer', async () => {
    const customerRepository = new DatabaseCustomerRepository();
    const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
    const customer = new Customer(randomUUID(), 'John Doe', address);
    await customerRepository.create(customer);
    customer.changeName('Sara Connor');
    customer.addRewardPoints(5);
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });
    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      active: customer.isActive(),
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
      street: customer.address.street,
      number: customer.address.number,
      complement: customer.address.complement,
    });
  });

  it('finds a customer', async () => {
    const customerRepository = new DatabaseCustomerRepository();
    const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
    const customer = new Customer(randomUUID(), 'John Doe', address);
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });
    const foundCustomer = await customerRepository.find(customer.id);
    expect(customerModel?.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      active: foundCustomer.isActive(),
      name: foundCustomer.name,
      rewardPoints: foundCustomer.rewardPoints,
      zipcode: foundCustomer.address.zipcode,
      city: foundCustomer.address.city,
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      complement: foundCustomer.address.complement,
    });
  });

  it('throws an erro if customer not found', () => {
    const customerRepository = new DatabaseCustomerRepository();
    expect(() => customerRepository.find(randomUUID())).rejects.toThrowError('Customer not found!');
  });

  it('finds many customers', async () => {
    const customerRepository = new DatabaseCustomerRepository();
    const address = new Address('5855566', 'City Name', 'Street Name', '100', 'Apto 101');
    const customers = [
      new Customer(randomUUID(), 'John Doe', address),
      new Customer(randomUUID(), 'Sara Connor', address),
    ];
    for (const customer of customers) {
      await customerRepository.create(customer);
    }
    const foundCustomers = await customerRepository.findAll();
    expect(customers).toEqual(foundCustomers);
  });
});
