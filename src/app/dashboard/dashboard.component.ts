import { Component, OnInit} from '@angular/core';

import {Employee} from "../employees/employee";
import {EmployeeService} from "../employees/employee.service";
import {PaginatedResult} from "../shared/interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  public currentPage:number = 4;
  public totalItems:number = 64;
  public itemsPerPage: number = 2;

  constructor(private  employeeService: EmployeeService) { }

  ngOnInit() {

    this.employeeService.getEmployees(null,this.currentPage, this.itemsPerPage)
      .subscribe((res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          //this.totalItems = res.pagination.TotalItems;
        },
        error => {})
  }

}
