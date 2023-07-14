import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreparedCocktails } from 'src/entities/prepared-cocktail.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuid';

@Injectable()
export class PreparedCocktailService {

    constructor(
        @InjectRepository(PreparedCocktails)
        private readonly cocktailsRepository: Repository<PreparedCocktails>) { }

    async createRegister(cocktailId: number, ingredienId: number): Promise<PreparedCocktails> {
        try {
            return await this.cocktailsRepository.save({
                id: uuid,
                cocktailId: cocktailId,
                ingredienId: ingredienId
            });
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to create table reference: cocktail and ingredien');
        }
    }

    async findAllPreparedCocktails(): Promise<PreparedCocktails[]> {
        try {
            const preparedCocktails = await this.cocktailsRepository.find();
            return preparedCocktails;
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to fetch ingredients');
        }
    }

    async findByProductId(productId: number, optionFilter: number): Promise<PreparedCocktails[] | null> {
        try {
            if (optionFilter == 1) {
                return await this.cocktailsRepository.find({ where: { cocktailId: productId } });
            } else {
                return await this.cocktailsRepository.find({ where: { ingredienId: productId } });
            }
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to find ingredient');
        }
    }

}
