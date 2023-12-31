import { CustomerRepository } from '../../../../domain/customer/repository/customer-repository';
import { Customer } from '../../../../domain/customer/entity/customer';
import { CustomerModel } from './customer-model';
import { Address } from '../../../../domain/customer/value-object/address';

export class DatabaseCustomerRepository implements CustomerRepository {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      active: customer.isActive(),
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      city: customer.address.city,
      zipCode: customer.address.zipCode,
      number: customer.address.number,
      complement: customer.address.complement,
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: customer.id,
        active: customer.isActive(),
        name: customer.name,
        rewardPoints: customer.rewardPoints,
        street: customer.address.street,
        city: customer.address.city,
        zipCode: customer.address.zipCode,
        number: customer.address.number,
        complement: customer.address.complement,
      },
      { where: { id: customer.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel: CustomerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error('Customer not found!');
    }
    const address = new Address(
      customerModel?.zipCode,
      customerModel?.city,
      customerModel?.street,
      customerModel?.number,
      customerModel?.complement
    );
    const customer = new Customer(customerModel?.id, customerModel?.name, address);
    customer.addRewardPoints(customerModel?.rewardPoints);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const foundCustomers = await CustomerModel.findAll();
    return foundCustomers.map((customerModel) => {
      const address = new Address(
        customerModel?.zipCode,
        customerModel?.city,
        customerModel?.street,
        customerModel?.number,
        customerModel?.complement
      );
      const customer = new Customer(customerModel?.id, customerModel?.name, address);
      customer.addRewardPoints(customerModel?.rewardPoints);
      return customer;
    });
  }
}
