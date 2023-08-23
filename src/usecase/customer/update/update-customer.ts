import { CustomerRepository } from '../../../domain/customer/repository/customer-repository';
import { Address } from '../../../domain/customer/value-object/address';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer-dto';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.zipCode,
        input.address.city,
        input.address.street,
        input.address.number,
        input.address.complement
      )
    );
    await this.customerRepository.update(customer);
    const output: OutputUpdateCustomerDto = {
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
    return output;
  }
}
