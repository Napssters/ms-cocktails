import { Controller, Post, Get, Param, Put, Patch, Body } from '@nestjs/common';
import { IngredientsService } from '../services/ingredients.service';
import { CreateIngredientDTO } from '../dto/create-ingredient.dto';
import { Ingredients } from 'src/entities/ingredients.entity';
import { UpdateIngredientRequestDTO } from '../dto/requests/update-ingredient.request.dto';

@Controller('ingredients')
export class IngredientsController {

    constructor(private ingredientsService: IngredientsService) { }

    @Post('create-ingredient')
    async createIingredient(@Body() createIngredient: CreateIngredientDTO): Promise<Ingredients> {
        return this.ingredientsService.create(createIngredient);
    }

    @Get('find-ingredient/:name')
    async findIingredient(@Param('name') name: string): Promise<Ingredients> {
        return this.ingredientsService.findByName(name);
    }

    @Get('find-all-ingredient')
    async findAllIingredient(): Promise<Ingredients[]> {
        return this.ingredientsService.findAllIngredients();
    }

    @Put('update-ingredient/:name')
    updateIingredient(
        @Param('name') name: string, 
        @Body() updatedData: Partial<UpdateIngredientRequestDTO>
        ): Promise<Ingredients> {
        return this.ingredientsService.update(name, updatedData);
    }
    
    @Patch('delete-ingredient')
    deleteTol(@Param('name') name: string): Promise<string> {
        return this.ingredientsService.softDelete(name);
    }
 }
