import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Producto Main');
  //const app = await NestFactory.create(AppModule);  // para rest

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {transport:Transport.TCP,
      options:{
        port:envs.port
      }

    }
  );  // para microservicio

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );


  //await app.listen(envs.port);// para rest

  await app.listen();
  logger.log(`Productos MicroServicio corriendo en el puerto ${envs.port}`);

}
bootstrap();
