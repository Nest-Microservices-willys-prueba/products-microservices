import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern ({cmd :'product_create'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern ({cmd :'product_find_all'})
   findAll(@Payload()paginationDto : PaginationDto) {
    //return paginationDto;
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern ({cmd :'product_find_one'})
  //@Get(':id')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }


  //@Patch(':id')
  @MessagePattern ({cmd :'product_update'})
    update(
    //  @Param('id', ParseIntPipe) id: number,
    //  @Body() updateProductDto: UpdateProductDto,
     @Payload() updateProductDto: UpdateProductDto,
  ) 
    {
  
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern ({cmd :'product_delete'})
  
  remove(@Payload('id' , ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
