import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from 'src/entities/ingredients.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuid';
import { CreateIngredientDTO } from '../dto/create-ingredient.dto';
import { UpdateIngredientRequestDTO } from '../dto/requests/update-ingredient.request.dto';

@Injectable()
export class IngredientsService {

    constructor(
        @InjectRepository(Ingredients)
        private readonly ingredientsRepository: Repository<Ingredients>,
    ) { }

    async findAllIngredients(): Promise<Ingredients[]> {
        try {
            const ingredients = await this.ingredientsRepository.find();
            return ingredients;
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to fetch ingredients');
        }
    }

    async findByName(name: string): Promise<Ingredients | null> {
        try {
            return await this.ingredientsRepository.findOne({ where: { name } });
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to find ingredient');
        }
    }

    async create(createIngredient: CreateIngredientDTO): Promise<Ingredients> {
        try {
            return await this.ingredientsRepository.save({
                id: uuid,
                name: createIngredient.name,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to create ingredient');
        }

    }

    async update(name: string, updatedData: Partial<UpdateIngredientRequestDTO>): Promise<Ingredients> {
        try {
            const ingredient = await this.ingredientsRepository.findOne({ where: { name } });
            if (!ingredient) {
                throw new Error('Entity not found');
            }

            updatedData.updatedAt = new Date();
            const updatedEntity = { ...ingredient, ...updatedData };

            return await this.ingredientsRepository.save(updatedEntity);
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to update ingredient');
        }
    }

    async softDelete(name: string): Promise<string> {
        try {
            const ingredient = await this.ingredientsRepository.findOne({ where: { name } });

            if (!ingredient) {
                throw new Error('Entity not found');
            }

            await this.ingredientsRepository.update(ingredient.id, { isDeleted: true });
            return "Ingredient deleted successfully.";
        } catch (error) {
            console.log(error.message);
            return "Failed to delete ingredient.";
        }
    }
}
