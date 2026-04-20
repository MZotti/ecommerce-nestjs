import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		ProductsModule,
		CategoriesModule
	],
})
export class ProductsServiceModule { }
