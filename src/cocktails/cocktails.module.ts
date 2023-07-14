import { CocktailsService } from './services/cocktails.service';
import { CocktailsController } from './controller/cocktails.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Cocktails } from 'src/entities/cocktails.entity';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { PreparedCocktailService } from './services/prepared-cocktail.service';
import { PreparedCocktails } from 'src/entities/prepared-cocktail.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cocktails, PreparedCocktails]),
        IngredientsModule
    ],
    controllers: [CocktailsController],
    providers: [
        CocktailsService,
        PreparedCocktailService
    ],
    exports: [
        CocktailsService,
        PreparedCocktailService
    ],
})
export class CocktailsModule { }
