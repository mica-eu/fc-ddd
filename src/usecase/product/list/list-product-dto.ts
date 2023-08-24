type ProductDto = {
  id: string;
  name: string;
  price: number;
};

export interface ListProductInputDto {
  limit?: number;
  offset?: number;
}

export interface ListProductOutputDto {
  products: ProductDto[];
}
