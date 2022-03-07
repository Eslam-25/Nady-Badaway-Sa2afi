import { NgModule } from "@angular/core";
import { WidgetsModule } from "../widgets.module";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ToastService } from "./toast.service";

@NgModule({
    exports: [
        ConfirmDialogComponent,
        DataTableComponent
    ],
    declarations: [
        ConfirmDialogComponent,
        DataTableComponent
    ],
    imports: [
        WidgetsModule
    ],
    providers: [
        ToastService
    ]
})
export class SharedModule {
}
