import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpService } from "../../core/services/http.service";
import { LevelModel } from "../models/level.model";

@Injectable()
export class LevelService{

    segment: string = environment.segements.level;
    constructor(private httpService: HttpService){
    }

    getAll(): Promise<LevelModel[]>{
        return this.httpService.get<LevelModel>(this.segment);
    }

    getById(id: number): Promise<LevelModel>{
        return this.httpService.getById<LevelModel>(this.segment, id);
    }

    add(level: LevelModel): Promise<boolean>{
        return this.httpService.post(this.segment, level);
    }

    Update(level: LevelModel): Promise<boolean>{
        return this.httpService.put(this.segment, level);        
    }

    delete(level: LevelModel): Promise<boolean>{
        return this.httpService.delete(this.segment, level.id);        
    }
}