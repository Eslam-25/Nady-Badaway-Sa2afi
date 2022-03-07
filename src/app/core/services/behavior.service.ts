import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BehaviorService {
    public isDataAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}