// src/database/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // carga .env solo una vez

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // IMPORTANT: vamos a mapear todas las entidades *.entity.ts
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false, // lo dejamos false porque ya tenemos tablas hechas
};
