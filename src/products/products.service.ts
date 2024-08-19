import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{
  
  private readonly logger = new Logger('ProductsServices MAIN');
  /* implementacion  */
  onModuleInit() {
    this.$connect();
    this.logger.log('Data Base conected');
  }
  create(createProductDto: CreateProductDto) {
    //return 'This action adds a new product';
    return this.product.create(
      {data : createProductDto}
    );
  }

  async findAll(paginationDto : PaginationDto) {
    
    const {page, limit} = paginationDto;
    const totalPages = await this.product.count({where : {available:true}});
    const lastPages = Math.ceil(totalPages/limit); // redondear al siguiemtno numero positivo
    //return `This action returns all products`;
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit, // para las siguientes paginas
        take: limit,  // para el limite de la paginacion
        where:{
          available:true  // solo los disponibles
        }
      }),     // retorna la data del prodcuto
      metadata:{
        total: totalPages,
        page: page ,
        lastPages:lastPages
      } // retorna la metadad de la paginacion
    }
  }

  async findOne(id: number) {
    const product = await this.product.findFirst ({
      where: {id:id,
        available : true
      }
    });

      if (!product) {
        throw new NotFoundException(`el producto con id: ${id} not existe`);
      }

      return product;
    //return `This action returns a #${id} product`;
  
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    //return `This action updates a #${id} product`;
    const {id:__ , ...data} = updateProductDto;
   await this.findOne(id);
    return this.product.update({
      where: {id:id},
      data :data
    });
  }

  async remove(id: number) {

    await this.findOne(id);
    const product = await this.product.update({
      where: {id:id},
      data :{
        available:false
      }
    })
    //return this.product.delete({
    //  where :{id:id}
    //})
    //return `This action removes a #${id} product`;  
  }
}
