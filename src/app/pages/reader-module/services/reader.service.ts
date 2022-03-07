import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpService } from "../../../core/services/http.service";
import { ReaderDegreeModel } from "../models/reader-degree.model";
import { ReaderModel } from "../models/reader.model";

@Injectable()
export class ReaderSevice{
    
    segment: string = environment.segements.reader;

    constructor(private httpService: HttpService){
    }

    registerReader(reader: ReaderModel): Promise<boolean>{
        return this.httpService.post(this.segment, reader);
    }

    evaluateReader(reader: ReaderDegreeModel): Promise<boolean>{
        return this.httpService.post(this.segment + "/evaluate", reader);
    }

    getAll(): Promise<ReaderModel[]>{
        return this.httpService.get<ReaderModel>(this.segment);
    }

    getReaderEvelautionByRulerId(readerId: number, rulerId: number): Promise<ReaderModel>{
        return this.httpService.getBy<ReaderModel>(this.segment + `/reader-evaluation-byRuler?readerId=${readerId}&rulerId=${rulerId}`);
    }

    getById(id: number): Promise<ReaderModel>{
        return this.httpService.getById<ReaderModel>(this.segment, id);
    }

    Update(user: ReaderModel): Promise<boolean>{
        return this.httpService.put(this.segment, user);        
    }

    delete(user: ReaderModel): Promise<boolean>{
        return this.httpService.delete(this.segment, user.id);        
    }
}