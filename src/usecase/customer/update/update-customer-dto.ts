export interface InputUpdateCustomerDto {
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

export interface OutputUpdateCustomerDto {
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
