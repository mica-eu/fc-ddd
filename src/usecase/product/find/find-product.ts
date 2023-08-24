import { inject, injectable } from 'tsyringe';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { FindProductInputDto, FindProductOutputDto } from './find-product-dto';

@injectable()
export class FindProductUseCase {
  constructor(@inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
