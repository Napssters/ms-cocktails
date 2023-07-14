import { IsString, IsEmail, IsDate } from "class-validator";

export class UpdateIngredientRequestDTO {

    @IsString()
    name: string;

    @IsDate()
    updatedAt: Date;
}