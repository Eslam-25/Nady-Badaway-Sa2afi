import { UserRoleEnum } from "../../core/enums/user-roles.enum";

export class UserModel{
    id: number;
    isActive: boolean;
    creationDate: Date;
    name: string;
    phoneNumber: string;
    password: string;
    role: UserRoleEnum;
    roleName: string;
}