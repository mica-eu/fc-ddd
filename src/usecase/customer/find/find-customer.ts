import { inject, injectable } from 'tsyringe';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer-dto';
import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';

@injectable()
export class FindCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(inputDto: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(inputDto.id);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        complement: customer.address.complement,
      },
    };
  }
}
