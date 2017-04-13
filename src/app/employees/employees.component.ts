import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';

import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {EmployeeFormComponent} from "./employee-form.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  roles = ['PM', 'Developer'];
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
    this.employee = new Employee(null, '', '', '', this.roles[0]);
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

  delete(employee: Employee): void {
    this.employeeService
      .delete(employee.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== employee);
        if (this.employee === employee) {
          this.new();
        }
      });
    this.isEditEmployee = false;
  }
}
