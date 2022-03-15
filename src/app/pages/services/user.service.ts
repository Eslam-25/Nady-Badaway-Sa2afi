import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UserRoleEnum } from "../../core/enums/user-roles.enum";
import { HttpService } from "../../core/services/http.service";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { UserLoginModel } from "../models/user-login.model";
import { UserModel } from "../models/user.model";
import { ReaderModel } from "../reader-module/models/reader.model";

@Injectable()
export class UserService{

    segment: string = environment.segements.user;
    constructor(
        private httpService: HttpService, 
        private localStorageService: LocalStorageService){
    }

    getAll(): Promise<UserModel[]>{
        return this.httpService.get<UserModel>(this.segment);
    }

    getById(id: number): Promise<UserModel>{
        return this.httpService.getById<UserModel>(this.segment, id);
    }

    add(user: UserModel): Promise<boolean>{
        user.creationDate = new Date(Date.now());
        return this.httpService.post(this.segment, user);
    }

    async login(phoneNumber: string, password: string): Promise<UserModel>{
        let loggedUser: UserModel = await this.httpService.postWithReturnValue(this.segment + "/login", {phoneNumber: phoneNumber.toString(), password: password} as UserLoginModel);
        if(loggedUser){
            this.localStorageService.setUserId(loggedUser.id);
            this.localStorageService.setUserName(loggedUser.name);
            this.localStorageService.setUserRole(loggedUser.role);
        }
        return Promise.resolve(loggedUser);
    }

    async loginAsReader(readerCode: string, password: string): Promise<ReaderModel>{
        let loggedUser: ReaderModel = await this.httpService.postWithReturnValue(this.segment + "/login-as-reader", {phoneNumber: readerCode.toString(), password: password} as UserLoginModel);
        if(loggedUser){
            this.localStorageService.setUserId(loggedUser.id);
            this.localStorageService.setItem("code", loggedUser.code);
            this.localStorageService.setUserName(loggedUser.name);
            this.localStorageService.setUserRole(UserRoleEnum.Reader);
        }
        return Promise.resolve(loggedUser);
    }

    logout(){
        this.localStorageService.clear();
    }

    Update(user: UserModel): Promise<boolean>{
        return this.httpService.put(this.segment, user);        
    }

    changePassword(id: number, newPassword: string): Promise<boolean>{
        return this.httpService.put(this.segment + "/change-password", {id: id, password: newPassword} as UserModel);        
    }

    delete(user: UserModel): Promise<boolean>{
        return this.httpService.delete(this.segment, user.id);        
    }
}