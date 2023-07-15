import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PreparedCocktails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cocktailId: number;

    @Column()
    ingredientId: number;

}