import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name :string;

    @IsNumber({
        maxDecimalPlaces: 2 // cantidad de decimales que puede manejar
    },
    { message: 'El número debe tener un máximo de 2 decimales.' }
    )
    @Min(0)
    @Type(()=>Number)// cambiar el tipo de ingreso
    public price:number;

}
