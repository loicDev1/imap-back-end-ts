import { IsNotEmpty } from "class-validator";


export class UpdateInterventionDto {
    @IsNotEmpty()
    id: any;

    @IsNotEmpty()
    status: string;
}