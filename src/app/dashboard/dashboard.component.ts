import { Component, OnInit } from '@angular/core';
import {Employee} from "../employees/employee";
import {EmployeeService} from "../employees/employee.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private  employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .then(employees => this.employees = employees.slice(1, 5));
  }

}
