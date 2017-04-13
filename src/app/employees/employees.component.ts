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
    this.new();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .then(employees => this.employees = employees);
  }

  new(): void {
    this.employee = new Employee();
  }

  save(): void {
    this.employee.first_name = this.employee.first_name.trim();
    this.employee.middle_name = this.employee.middle_name.trim();
    this.employee.last_name = this.employee.last_name.trim();
    this.employee.role = this.employee.role.trim();

    if (!this.employee.first_name || !this.employee.middle_name || !this.employee.last_name || !this.employee.role) {
      return;
    }
    console.log(this.employee.role);
    this.employeeService.create(this.employee)
      .then(employee => {
        this.employees.push(employee);
        this.employee = employee;
        this.isEditEmployee = false;
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
    this.employeeService.update(this.employee).then(()=> {
      this.isEditEmployee = false;
    });
  }
}
