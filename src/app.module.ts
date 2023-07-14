import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktails } from './entities/cocktails.entity';
import { Ingredients } from './entities/ingredients.entity';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CocktailsModule } from './cocktails/cocktails.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Cocktails, Ingredients],
      synchronize : true
    }),
    IngredientsModule, CocktailsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
