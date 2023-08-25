import { inject, injectable } from 'tsyringe';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { InputListCustomersDto, OutputListCustomersDto } from './list-customers-dto';

@injectable()
export class ListCustomersUseCase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(inputDto?: InputListCustomersDto): Promise<OutputListCustomersDto> {
    const customers = await this.customerRepository.findAll(inputDto?.limit, inputDto?.offset);
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zipCode: customer.address.zipCode,
          complement: customer.address.complement,
        },
      })),
    };
  }
}
