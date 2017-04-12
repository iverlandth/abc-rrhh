import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  employees: Employee[];
  employee: Employee;
  selectedEmployee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private router: Router) { }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .then(employees => this.employees = employees);
  }

  add(first_name: string, middle_name: string, last_name: string, role: string): void {

    first_name = first_name.trim();
    middle_name = middle_name.trim();
    last_name = last_name.trim();
    role = role.trim();

    if (!first_name && !middle_name && !last_name && !role) {
      return;
    }

    this.employeeService.create(first_name, middle_name, last_name, role)
      .then(employee => {
        this.employees.push(employee);
        this.selectedEmployee = null;
      });
  }

  delete(employee: Employee): void {
    this.employeeService
      .delete(employee.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== employee);
        if (this.selectedEmployee === employee) { this.selectedEmployee = null; }
      });
  }

  save(): void {
    this.employeeService.update(this.employee).then();
    this.selectedEmployee = null;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.employee = employee;
  }
  new(): void{
    this.selectedEmployee = null;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedEmployee.id]);
  }


}
