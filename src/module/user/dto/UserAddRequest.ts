import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserAddRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}