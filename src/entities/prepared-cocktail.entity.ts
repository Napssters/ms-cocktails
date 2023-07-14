import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredients } from './ingredients.entity';
import { Cocktails } from './cocktails.entity';

@Entity()
export class PreparedCocktails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cocktails)
    @JoinColumn({ name: 'id' })
    cocktailId: number;

    @ManyToOne(() => Ingredients)
    @JoinColumn({ name: 'id' })
    ingredienId: number;

}