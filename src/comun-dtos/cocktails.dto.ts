import { IsArray, IsString } from "class-validator";
import { IngredientDTO } from "./ingredientes.dto";

export class CocktailsDTO {
    
    @IsString()
    name: string;

    @IsString()
    instructions: string;

    @IsString()
    additionalNotes: string;

    @IsArray()
    ingredients: IngredientDTO[];
    
}