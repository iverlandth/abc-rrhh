import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  roles= ['PM', 'Developer'];
  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.employeeService.getEmployee(+params['id']))
      .subscribe(employee => this.employee = employee);
  }

}
