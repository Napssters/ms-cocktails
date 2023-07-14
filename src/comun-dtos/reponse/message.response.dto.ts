import { IsString } from "class-validator";

export class MessageResponseDTO {
    
    @IsString()
    message: string;
    
}