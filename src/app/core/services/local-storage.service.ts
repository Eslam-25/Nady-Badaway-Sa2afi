import { Injectable } from "@angular/core";
import { UserRoleEnum } from "../enums/user-roles.enum";

@Injectable()
export class LocalStorageService{

    setItem(key: string, value: string){
        localStorage.setItem(key, value);
    }
    getItem(key: string){
        return localStorage.getItem(key);
    }

    setToken(token: any){
        localStorage.setItem("token", token);
    }
    getToken(){
        return localStorage.getItem("token");
    }

    setUserId(userId: number){
        localStorage.setItem("userId", userId.toString());
    }
    getUserId(){
        return Number.parseInt(localStorage.getItem("userId"));
    }

    setUserName(userName: string){
        localStorage.setItem("userName", userName);
    }
    getUserName(){
        return localStorage.getItem("userName");
    }

    setUserRole(userRole: number){
        localStorage.setItem("userRole", userRole.toString());
    }
    getUserRole(){
        return UserRoleEnum[localStorage.getItem("userRole")];
    }

    clear(){
        localStorage.clear();
    }
    removItem(key: string){
        localStorage.removeItem(key);
    }
}