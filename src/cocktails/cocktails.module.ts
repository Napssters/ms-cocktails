import { CocktailsService } from './services/cocktails.service';
import { CocktailsController } from './controller/cocktails.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Cocktails } from 'src/entities/cocktails.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cocktails])],
    controllers: [CocktailsController],
    providers: [CocktailsService],
    exports: [CocktailsService],
})
export class CocktailsModule { }
