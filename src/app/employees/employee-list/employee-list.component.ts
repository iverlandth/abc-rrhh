import {Component, OnInit, ViewChild, Directive} from '@angular/core';
import {Router}            from '@angular/router';

import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {Pagination, PaginatedResult} from '../../shared/interfaces';
import {ModalDirective} from "ngx-bootstrap";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {PagerService} from "../../shared/pager.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeDestroy: Employee;

  pager: any = {};
  pagedItems: any[];


  constructor(private employeeService: EmployeeService,
              private pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }


  loadEmployees() {
    this.employeeService.getEmployees(null, 1, 2)
      .subscribe((res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          this.setPage(1);
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


  @ViewChild('confirmModal') confirmModal: ModalDirective;

  confirmDestroy(employee: Employee): void {
    this.employeeDestroy = employee;
    this.confirmModal.show();
  }

  cancelConfirm(): void {
    this.confirmModal.hide();
  }

  destroy(): void {
    this.employeeService
      .destroy(this.employeeDestroy.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== this.employeeDestroy);
        this.setPage(this.pager.currentPage);
      });
    this.confirmModal.hide();
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


  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}

