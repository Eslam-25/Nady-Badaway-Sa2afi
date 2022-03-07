import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { RegisterReaderComponent } from './reader-module/pages/register-reader/register-reader.component';
import { LoginComponent } from './login/login.component';
import { RulerEvaluationComponent } from './ruler-evaluation/ruler-evaluation.component';
import { LevelsComponent } from './levels/levels.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RulersComponent } from './rulers/rulers.component';
import { ReadersComponent } from './reader-module/pages/readers/readers.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'register-reader',
      component: RegisterReaderComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'ruler-evalution',
      component: RulerEvaluationComponent,
    },
    {
      path: 'levels',
      component: LevelsComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'rulers',
      component: RulersComponent,
    },
    {
      path: 'readers',
      component: ReadersComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'register-reader',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
