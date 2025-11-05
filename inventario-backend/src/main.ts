import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv'

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // quita campos extra
      forbidNonWhitelisted: true, // si mandan algo no permitido -> 400
      transform: true,            // cast types automáticamente
    }),
  );
  await app.listen(process.env.PORT || 3000);
  console.log(`API escuchando en puerto ${process.env.PORT || 3000}`);
}
bootstrap();
