import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {EmployeeDetailComponent} from "./employees/employee-detail/employee-detail.component";
import {EmployeeFormComponent} from "./employees/employee-form/employee-form.component";
import {EmployeeListComponent} from "./employees/employee-list/employee-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'employees/show/:id', component: EmployeeDetailComponent},
  {path: 'employees/edit/:id', component: EmployeeFormComponent},
  {path: 'employees/new', component: EmployeeFormComponent},
];


@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)

export class AppRoutingModule {
}
