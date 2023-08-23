type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: string;
    zipCode: string;
    complement: string;
  };
};

export interface InputListCustomersDto {
  limit?: number;
  offset?: number;
}

export interface OutputListCustomersDto {
  customers: Customer[];
}
