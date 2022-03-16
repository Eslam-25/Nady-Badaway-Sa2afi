import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { RegisterReaderComponent } from './reader-module/pages/register-reader/register-reader.component';
import { WidgetsModule } from './widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RulerEvaluationComponent } from './ruler-evaluation/ruler-evaluation.component';
import { LevelsComponent } from './levels/levels.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from './shared/shared.module';
import { RulersComponent } from './rulers/rulers.component';
import { ReadersComponent } from './reader-module/pages/readers/readers.component';
import { LevelService } from './services/level.service';
import { BehaviorService } from '../core/services/behavior.service';
import { ReaderSevice } from './services/reader.service';
import { UserService } from '../@core/mock/users.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TitleComponent } from './shared/title/title.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PagesComponent,
    RegisterReaderComponent,
    LoginComponent,
    RulerEvaluationComponent,
    LevelsComponent,
    UsersComponent,
    ChangePasswordComponent,
    RulersComponent,
    ReadersComponent,
    DashboardComponent,
    TitleComponent,
  ],
  providers: [
    LevelService,
    BehaviorService,
    UserService,
    ReaderSevice,
  ]
})
export class PagesModule {
}
