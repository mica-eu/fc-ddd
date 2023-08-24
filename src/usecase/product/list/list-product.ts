import { inject, injectable } from 'tsyringe';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { ListProductInputDto, ListProductOutputDto } from './list-product-dto';

@injectable()
export class ListProductUseCase {
  constructor(@inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async execute(inputDto: ListProductInputDto): Promise<ListProductOutputDto> {
    const products = await this.productRepository.findAll(inputDto?.limit, inputDto?.offset);
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
