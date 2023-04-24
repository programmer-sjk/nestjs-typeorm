import { IsEmail, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
email: string;

  @Column()
  password: string;

  @Column()
  @MaxLength(30)
  name: string;
}
