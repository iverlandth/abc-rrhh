import {Component, OnInit, ViewChild, Directive} from '@angular/core';

import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {Pagination, PaginatedResult} from '../../shared/interfaces';
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {PagerService} from "../../shared/pager.service";
import {EmployeeDestroyComponent} from "../employee-destroy/employee-destroy.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  pager: any = {};
  pagedItems: any[];


  constructor(private employeeService: EmployeeService,
              private pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.loadEmployees();

  }


  changeEmployee(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees(null, 1, 2)
      .subscribe((res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          if (this.pager) {
            this.setPage(this.pager.currentPage);
          } else {
            this.setPage(1);
          }
        },
        error => {
        })
  }

  filterItem(value) {
    this.employeeService.getEmployees(value.trim(), 1, 2)
      .subscribe((res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          this.setPage(1);
        },
        error => {
          console.log('ERROR');
        });
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.employees.length, page);
    this.pagedItems = this.employees.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  @ViewChild(EmployeeDestroyComponent) employeeDestroyComponent: EmployeeDestroyComponent;

  confirmDestroy(id: number): void {
    this.employeeDestroyComponent.confirmDestroy(id);
  }


  @ViewChild(EmployeeFormComponent) private employeeForm: EmployeeFormComponent;

  public add(): void {
    this.employeeForm.add();
  }

  public editEmployee(employee: Employee) {
    this.employeeForm.edit(employee);
  }


  @ViewChild(EmployeeDetailComponent) private employeeComponent: EmployeeDetailComponent;

  showEmployee(id: number): void {
    this.employeeComponent.show(id);
  }

}

