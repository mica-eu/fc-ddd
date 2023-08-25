import { randomUUID } from 'crypto';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create-customer-dto';
import { Address } from '../../../domain/customer/value-object/address';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {
    this.customerRepository = customerRepository;
  }
  async execute(inputDto: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new Address(
      inputDto.address.zipCode,
      inputDto.address.city,
      inputDto.address.street,
      inputDto.address.number,
      inputDto.address.complement
    );
    const customer = new Customer(randomUUID(), inputDto.name, address);
    await this.customerRepository.create(customer);
    const createdCustomer = await this.customerRepository.find(customer.id);
    return {
      id: createdCustomer.id,
      name: createdCustomer.name,
      address: {
        street: createdCustomer.address.street,
        city: createdCustomer.address.city,
        number: createdCustomer.address.number,
        zipCode: createdCustomer.address.zipCode,
        complement: createdCustomer.address.complement,
      },
    };
  }
}
