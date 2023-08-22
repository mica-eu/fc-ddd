import { DatabaseCustomerRepository } from '../../../infra/customer/repository/sequelize/database-customer-repository';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer-dto';

export class FindCustomerUseCase {
  constructor(private readonly customerRepository: DatabaseCustomerRepository) {
    this.customerRepository = customerRepository;
  }

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
