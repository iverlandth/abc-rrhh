import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//reference to routes app
import {AppRoutingModule} from "./app-routing.module";

//management web api in memory
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {EmployeeService} from "./employees/employee.service";
import {EmployeeFormComponent} from "./employees/employee-form/employee-form.component";
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

import {ModalModule, PaginationModule} from "ngx-bootstrap";
import {EmployeeReturnService} from "./employees/employee-return.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [EmployeeService, EmployeeReturnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
