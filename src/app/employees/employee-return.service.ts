import { Injectable }    from '@angular/core';
import { EmployeeReturn } from './employee';
import {EmployeeService} from "./employee.service";

@Injectable()
export class EmployeeReturnService {
  private currentEmployeeReturn: EmployeeReturn;
  private originalEmployee: EmployeeReturn;

  constructor(private employeeService: EmployeeService) { }

  set employeeReturn (htr: EmployeeReturn) {
    this.originalEmployee = htr;
    this.currentEmployeeReturn  = htr.clone();
  }

  get employeeReturn (): EmployeeReturn {
    return this.currentEmployeeReturn;
  }

  restoreEmployeeReturn() {
    this.employeeReturn = this.originalEmployee;
  }
/*
  saveTaxReturn() {
    this.taxReturn = this.currentEmployeeReturn;
    this.employeeService.saveEmployeeReturn(this.currentEmployeeReturn).subscribe();
  }*/
}
