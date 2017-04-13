import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Employee} from './employee';

@Injectable()
export class EmployeeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private employeesUrl = 'api/employees';

  constructor(private http: Http) {
  }

  getEmployee(id: number): Promise<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Employee)
      .catch(this.handleError);
  }

  getEmployees(): Promise<Employee[]> {
    return this.http.get(`${this.employeesUrl}`)
      .toPromise()
      .then(response => response.json().data as Employee[])
      .catch(this.handleError);
  }

  create(employee: Employee): Promise<Employee> {
    console.log(employee.first_name);
    return this.http
      .post(`${this.employeesUrl}`, JSON.stringify({
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
        role: employee.role
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Employee)
      .catch(this.handleError);
  }

  show(id: number): Promise<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Employee)
      .catch(this.handleError);
  }

  update(employee: Employee): Promise<Employee> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http
      .put(url, JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  destroy(id: number): Promise<void> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

