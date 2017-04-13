import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';

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
  isEditEmployee = false;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .then(employees => this.employees = employees);
  }

  new(): void {
    this.employee = null;
  }

  save(first_name: string, middle_name: string, last_name: string, role: string): void {

    first_name = first_name.trim();
    middle_name = middle_name.trim();
    last_name = last_name.trim();
    role = role.trim();

    if (!first_name || !middle_name || !last_name || !role) {
      return;
    }

    this.employeeService.create(first_name, middle_name, last_name, role)
      .then(employee => {
        this.employees.push(employee);
        this.employee = null;
      });
  }

  show(employee: Employee): void {
    this.employee = employee;
    this.employee = employee;
    this.isEditEmployee = false;
  }

  edit(): void {
    this.isEditEmployee = true;
  }

  update(): void {
    this.employeeService.update(this.employee).then();
    this.isEditEmployee = false;
  }

  delete(employee: Employee): void {
    this.employeeService
      .delete(employee.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== employee);
        if (this.employee === employee) {
          this.employee = null;
        }
      });
    this.isEditEmployee = false;
  }
}
