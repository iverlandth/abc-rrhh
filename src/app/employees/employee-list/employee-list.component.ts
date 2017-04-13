import { Component, OnInit } from '@angular/core';
import {Router}            from '@angular/router';

import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {EmployeesComponent} from "../employees.component";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeDetail: EmployeeDetailComponent;

  constructor(
    private employeeService: EmployeeService,
    private employeesComponent: EmployeesComponent,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().then(
      employees => this.employees = employees);
  }
  goTo(employee: Employee){
    console.log(employee.id);
    this.router.navigate(['employees/show', employee.id]);
  }

  editTo(employee: Employee){
    console.log(employee.id);
    this.router.navigate(['employees/edit', employee.id]);
  }

  destroy(employee: Employee): void {
    this.employeeService
      .destroy(employee.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== employee);
      });
  }

  new(): void {
    this.router.navigate(['employees/new']);
  }
}

