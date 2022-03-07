import { LOCALE_ID, NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToastrModule,
  NbUserModule,
} from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";
import { FormsModule as ngFormsModule } from "@angular/forms";
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import { Ng2SmartTableModule } from "ng2-smart-table";
registerLocaleData(localePt);

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbFormFieldModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot()
  ],
  exports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbFormFieldModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbSpinnerModule,
    NbToastrModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }, //your locale
  ]
})
export class WidgetsModule {}
