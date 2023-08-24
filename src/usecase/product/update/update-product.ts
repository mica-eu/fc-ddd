import { inject, injectable } from 'tsyringe';
import { UpdateProductInputDto } from './update-product-dto';
import { ProductRepository } from '../../../domain/product/repository/product-repository';

@injectable()
export class UpdateProductUseCase {
  constructor(@inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async execute(inputDto: UpdateProductInputDto): Promise<UpdateProductInputDto> {
    const product = await this.productRepository.find(inputDto.id);
    product.changeName(inputDto.name);
    product.changePrice(inputDto.price);
    await this.productRepository.update(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
