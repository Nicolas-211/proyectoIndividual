import { RolesModule } from './modules/roles/roles.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './database/typeorm.config';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ProductsModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
