import { IsNotEmpty } from "class-validator";
import { UpdateUserDTO } from "src/user/dto/UpdateUserDTO";

export class UpdateUserRoleDTO extends UpdateUserDTO{
    @IsNotEmpty()
    role: string;
}
  