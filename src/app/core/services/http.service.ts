import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../pages/shared/toast.service";

@Injectable()
export class HttpService{
    
    api: string = environment.api;
    constructor(private httpClient: HttpClient, private toastService: ToastService){}

    async get<T>(segment: string){
        try{
            return await this.httpClient.get<T[]>(this.api + segment).toPromise();
        }catch(e:any){
            this.toastService.showError("عذرا حدث خطأ يرجي المحاولة لاحقا");
            return Promise.resolve([] as T[]);
        }
    }

    async getById<T>(segment: string, id: number){
        try{
            return await this.httpClient.get<T>(this.api + segment + "/" + id).toPromise();
        }catch(e:any){
            this.toastService.showError("عذرا حدث خطأ يرجي المحاولة لاحقا");
            return Promise.resolve(null);
        }
    }

    async getByAny<T>(segment: string, id: any){
        try{
            return await this.httpClient.get<T>(this.api + segment + "/" + id).toPromise();
        }catch(e:any){
            this.toastService.showError("عذرا حدث خطأ يرجي المحاولة لاحقا");
            return Promise.resolve(null);
        }
    }

    async getBy<T>(segment: string){
        try{
            return await this.httpClient.get<T>(this.api + segment).toPromise();
        }catch(e:any){
            this.toastService.showError("عذرا حدث خطأ يرجي المحاولة لاحقا");
            return Promise.resolve(null);
        }
    }

    async post(segment: string, body: any){
        try{
            return await this.httpClient.post<boolean>(this.api + segment, body, {headers: {"Access-Control-Allow-Origin" : "*"}}).toPromise();
        }catch(e:any){
            return Promise.resolve(false);
        }   
    }

    async postWithType<T>(segment: string, body: any){
        try{
            return await this.httpClient.post<T>(this.api + segment, body, {headers: {"Access-Control-Allow-Origin" : "*"}}).toPromise();
        }catch(e:any){
            return Promise.resolve(null);
        }   
    }

    async postWithReturnValue(segment: string, body: any){
        try{
            return await this.httpClient.post<boolean>(this.api + segment, body, {headers: {"Access-Control-Allow-Origin" : "*"}}).toPromise();
        }catch(e:any){
            return Promise.resolve(null);
        }   
    }

    async put(segment: string, body: any){
        try{
            return await this.httpClient.put<boolean>(this.api + segment, body, {headers: {"Access-Control-Allow-Origin" : "*"}}).toPromise();
        }catch(e:any){
            return Promise.resolve(false);
        }
    }

    async delete(segment: string, id: number){
        try{
            return await this.httpClient.delete<boolean>(this.api + segment + "/" + id, {headers: {"Access-Control-Allow-Origin" : "*"}}).toPromise();
        }catch(e:any){
            return Promise.resolve(false);
        }
    }
}