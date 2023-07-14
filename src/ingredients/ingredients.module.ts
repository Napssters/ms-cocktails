import { IngredientsService } from './services/ingredients.service';
import { IngredientsController } from './controller/ingredients.controller';
import { Module } from '@nestjs/common';
import { Ingredients } from 'src/entities/ingredients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Ingredients])],
    controllers: [IngredientsController],
    providers: [IngredientsService],
    exports: [IngredientsService],
})
export class IngredientsModule { }
