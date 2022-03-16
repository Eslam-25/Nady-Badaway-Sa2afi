import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpService } from "../../core/services/http.service";
import { DashboardModel } from "../models/dashboard.model";
import { ReaderDegreeModel } from "../reader-module/models/reader-degree.model";
import { ReaderModel } from "../reader-module/models/reader.model";

@Injectable()
export class ReaderSevice {

    segment: string = environment.segements.reader;

    constructor(private httpService: HttpService) {
    }

    registerReader(reader: ReaderModel): Promise<ReaderModel> {
        reader.creationDate = new Date(Date.now());
        return this.httpService.postWithType<ReaderModel>(this.segment, reader);
    }

    evaluateReader(reader: ReaderDegreeModel): Promise<boolean> {
        reader.creationDate = new Date(Date.now());
        return this.httpService.post(this.segment + "/evaluate", reader);
    }

    getAll(): Promise<ReaderModel[]> {
        return this.httpService.get<ReaderModel>(this.segment);
    }

    getDashboard(): Promise<DashboardModel> {
        return this.httpService.getSingle<DashboardModel>(this.segment + "/dashboard");
    }

    getReaderEvelautionByRulerId(readerCode: string, rulerId: number): Promise<ReaderModel> {
        return this.httpService.getBy<ReaderModel>(this.segment + `/reader-evaluation-byRuler?readerCode=${readerCode}&rulerId=${rulerId}`);
    }

    getById(id: number): Promise<ReaderModel> {
        return this.httpService.getById<ReaderModel>(this.segment, id);
    }

    getByCode(code: string): Promise<ReaderModel> {
        return this.httpService.getByAny<ReaderModel>(this.segment + `/by-code`, code);
    }

    Update(user: ReaderModel): Promise<boolean> {
        return this.httpService.put(this.segment, user);
    }

    delete(user: ReaderModel): Promise<boolean> {
        return this.httpService.delete(this.segment, user.id);
    }
}