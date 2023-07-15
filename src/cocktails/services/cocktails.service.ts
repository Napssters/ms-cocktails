import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CocktailsDTO } from 'src/comun-dtos/cocktails.dto';
import { Cocktails } from 'src/entities/cocktails.entity';
import { IngredientsService } from 'src/ingredients/services/ingredients.service';
import { Repository } from 'typeorm';
import { uuid } from 'uuid';
import { PreparedCocktailService } from './prepared-cocktail.service';
import { MessageResponseDTO } from 'src/comun-dtos/reponse/message.response.dto';

@Injectable()
export class CocktailsService {

    constructor(
        @InjectRepository(Cocktails)
        private readonly cocktailsRepository: Repository<Cocktails>,
        private ingredientsService: IngredientsService,
        private preparedCocktailService: PreparedCocktailService) { }

    async create(createCocktailRequest: CocktailsDTO): Promise<MessageResponseDTO> {
        try {
            
            const name = createCocktailRequest.name;
            const instructions = createCocktailRequest.instructions || '';
            const additionalNotes = createCocktailRequest.additionalNotes || '';
            await this.cocktailsRepository.save({
                id: uuid,
                name: name,
                instruction: instructions,
                aditionalNotes: additionalNotes,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const cocktail = await this.cocktailsRepository.findOne({ where: { name } });

            if (!cocktail) {
                throw new Error('Entity not found');
            }
            
            for (const ingredient of createCocktailRequest.ingredients) {
                await this.createRegister(parseInt(cocktail.id), ingredient.name);
            }
0
            return { message: 'Cocktail create successfully' };

        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to create cocktail');
        }
    }

    async createRegister(cocktailId: number, ingredientName: string): Promise<void> {
        try {
            const ingredient = await this.ingredientsService.findByName(ingredientName);
            if (!ingredient) {
                throw new Error('ingredient does not exists');
            }

            await this.preparedCocktailService.createRegister(cocktailId, parseInt(ingredient.id));
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to create registers');
        }
    }

    async findByName(name: string): Promise<Cocktails | null> {
        try {
            return await this.cocktailsRepository.findOne({ where: { name } });
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to find cocktails');
        }
    }

    async findAllCocktails(): Promise<Cocktails[]> {
        try {
            const cocktails = await this.cocktailsRepository.find();
            return cocktails;
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to fetch cocktails');
        }
    }

    async findCocktailsIngredients(name?: string): Promise<CocktailsDTO> {

        try {
            const cocktail = await this.cocktailsRepository.findOne({ where: { name } });
            const preparedList = await this.preparedCocktailService.findByProductId(parseInt(cocktail.id), 1);
            
            if (!cocktail) {
                throw new Error('Entity not found');
            }

            if (!preparedList) {
                throw new Error('Entity not found');
            }
            
        } catch (error) {
            throw new Error('Failed to fetch cocktails');
        }
        return;
    }

}
