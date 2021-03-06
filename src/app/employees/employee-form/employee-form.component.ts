import 'rxjs/add/operator/switchMap';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Employee, roles} from "../employee";
import {EmployeeService} from "../employee.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  roles = roles;
  employee: Employee = null;
  private model: Employee;

  @ViewChild('formModal') public formModal: ModalDirective;

  @Output() changeEmployee: EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  add(): void {
    this.employee = new Employee();
    this.formModal.show();
  }

  submit(): void {
    if (this.employee.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.employee.first_name = this.employee.first_name.trim();
    this.employee.middle_name = this.employee.middle_name.trim();
    this.employee.last_name = this.employee.last_name.trim();
    this.employee.role = this.employee.role.trim();

    if (!this.employee.first_name || !this.employee.middle_name || !this.employee.last_name || !this.employee.role) {
      return;
    }
    this.employeeService.create(this.employee)
      .then(employee => {
        this.formModal.hide();
        this.changeEmployee.emit();
      });
  }

  cancelForm(): void {
    this.formModal.hide();
    this.employee = this.model;
    this.changeEmployee.emit();
  }

  edit(employee: Employee): void {
    this.employee = employee;
    this.model = Object.assign({}, this.employee);
    this.formModal.show();
  }

  update(): void {
    this.employeeService.update(this.employee).then(() => {
      this.formModal.hide();
    });
  }

}
