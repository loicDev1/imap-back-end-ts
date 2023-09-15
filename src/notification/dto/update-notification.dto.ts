import { IsNotEmpty } from "class-validator";


export class UpdateNotificationDTO {
    @IsNotEmpty()
    id : any;

    @IsNotEmpty()
    isOpen : boolean;
}
