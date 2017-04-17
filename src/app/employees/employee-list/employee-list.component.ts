import {Component, OnInit, ViewChild, Directive} from '@angular/core';
import {Router}            from '@angular/router';

import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {Pagination, PaginatedResult} from '../../shared/interfaces';
import {ModalDirective} from "ngx-bootstrap";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeDestroy: Employee;

  public totalItems: number = 10;
  public currentPage: number = 4;
  public smallnumPages: number = 0;
  public itemsPerPage: number = 2;


  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees(1, 2)
      .subscribe((res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          this.totalItems = 10;
        },
        error => {
        })
  }

  @ViewChild('confirmModal') confirmModal: ModalDirective;

  confirmDestroy(employee: Employee): void {
    this.employeeDestroy = employee;
    this.confirmModal.show();
  }
  cancelConfirm(): void{
    this.confirmModal.hide();
  }

  destroy(): void {
    this.employeeService
      .destroy(this.employeeDestroy.id)
      .then(() => {
        this.employees = this.employees.filter(h => h !== this.employeeDestroy);
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
  showEmployee(employee: Employee): void {
    this.employeeComponent.show(employee);
  }


  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}

