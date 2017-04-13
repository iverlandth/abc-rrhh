import {Component} from '@angular/core';
import {Employee}    from './employee';


@Component({
  selector: 'hero-form',
  templateUrl: 'employee-form.component.html'
})

export class EmployeeFormComponent {
  roles = ['PM', 'Developer'];
  model = new Employee(18, '', '', '', this.roles[0]);
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newEmployee() {
    this.model = new Employee(42, '', '', '', this.roles[0]);
  }
}
