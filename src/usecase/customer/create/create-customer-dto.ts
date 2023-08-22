export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    city: string;
    number: string;
    zipCode: string;
    complement: string;
  };
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: string;
    zipCode: string;
    complement: string;
  };
}
