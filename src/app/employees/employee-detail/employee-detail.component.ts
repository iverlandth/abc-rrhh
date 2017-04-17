import {Component, OnInit, ViewChild} from '@angular/core';

import {Employee} from "../employee";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = null;

  @ViewChild('detailModal') public detailModal: ModalDirective;

  constructor() {
  }

  ngOnInit() {
  }

  public onHidden(): void {
    this.employee = null;
  }

  show(employee: Employee) {
    this.employee = employee;
    this.detailModal.show();
  }

  cancel(): void {
    this.detailModal.hide();
  }

}
