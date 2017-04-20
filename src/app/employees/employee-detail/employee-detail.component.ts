import {Component, OnInit, ViewChild} from '@angular/core';

import {Employee} from "../employee";
import {ModalDirective} from "ngx-bootstrap";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = null;

  @ViewChild('detailModal') public detailModal: ModalDirective;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  public onHidden(): void {
    this.employee = null;
  }

  show(id: number) {
    this.employeeService.getEmployee(id).then(res => {
      this.employee = res;
      this.detailModal.show();
    });
  }

  cancel(): void {
    this.detailModal.hide();
  }

}
