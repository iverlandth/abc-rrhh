import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-destroy',
  templateUrl: './employee-destroy.component.html',
  styleUrls: ['./employee-destroy.component.css']
})
export class EmployeeDestroyComponent implements OnInit {
  employeeDestroyId: number = null;

  @Output() destroyEmployee: EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }


  @ViewChild('confirmModal') confirmModal: ModalDirective;

  confirmDestroy(id: number): void {
    this.employeeDestroyId = id;
    this.confirmModal.show();
  }

  cancelConfirm(): void {
    this.confirmModal.hide();
  }

  destroy(): void {
    this.employeeService
      .destroy(this.employeeDestroyId)
      .then(() => {
        this.destroyEmployee.emit();
        this.confirmModal.hide();
      });
  }

}
