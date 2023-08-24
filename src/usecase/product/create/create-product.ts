import { inject, injectable } from 'tsyringe';
import { CreateProductInputDto, CreateProductOutputDto } from './create-product-dto';
import { ProductRepository } from '../../../domain/product/repository/product-repository';
import { Product } from '../../../domain/product/entity/product';
import { randomUUID } from 'crypto';

@injectable()
export class CreateProductUseCase {
  constructor(@inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async execute(inputDto: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = new Product(randomUUID(), inputDto.name, inputDto.price);
    await this.productRepository.create(product);
    const foundedProduct = await this.productRepository.find(product.id);
    return {
      id: foundedProduct.id,
      name: foundedProduct.name,
      price: foundedProduct.price,
    };
  }
}
