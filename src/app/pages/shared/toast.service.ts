import { Injectable } from "@angular/core";
import { NbComponentStatus, NbToastrService } from "@nebular/theme";

@Injectable()
export class ToastService {
    constructor(private toastrService: NbToastrService) { }

    showSuccess = (message: string) => this.showToast("success" , message);
    showError = (message: string) => this.showToast("danger" , message);

    private showToast(status: NbComponentStatus, msg: string) {
        this.toastrService.show("", msg, { status });
    }
}