import { Controller, Post, Get, Param, Put, Patch, Body } from '@nestjs/common';
import { CocktailsService } from '../services/cocktails.service';
import { CreateCocktailRequestDTO } from 'src/comun-dtos/requests/create-cocktai.request.dto';
import { MessageResponseDTO } from 'src/comun-dtos/reponse/message.response.dto';
import { Cocktails } from 'src/entities/cocktails.entity';

@Controller('cocktails')
export class CocktailsController {

    constructor(private cocktailsService: CocktailsService) { }

    @Post('create-cocktail')
    async createIingredient(@Body() createCocktailRequestDTO: CreateCocktailRequestDTO): Promise<MessageResponseDTO> {
        return this.cocktailsService.create(createCocktailRequestDTO);
    }

    @Get('find-cocktail/:name')
    async findIingredient(@Param('name') name: string): Promise<Cocktails> {
        return this.cocktailsService.findByName(name);
    }

    @Get('find-all-cocktail')
    async findAllIingredient(): Promise<Cocktails[]> {
        return this.cocktailsService.findAllCocktails();
    }

}
