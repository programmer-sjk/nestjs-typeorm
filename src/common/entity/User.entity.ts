import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserAddRequest } from './../../module/user/dto/UserAddRequest';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    age: number;

    static of(dto: UserAddRequest) {    
        const user = new Users();
        user.name = dto.name
        user.age = dto.age

        return user
    }
}