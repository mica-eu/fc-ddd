import { toXML } from 'jstoxml';
import { OutputListCustomersDto } from '../../../usecase/customer/list/list-customers-dto';

export class CustomerPresenter {
  static toXML(data: OutputListCustomersDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    };
    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              zipCode: customer.address.zipCode,
            },
          })),
        },
      },
      xmlOptions
    );
  }
}
