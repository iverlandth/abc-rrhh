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

  getEmployees(): Promise<Employee[]> {
    return this.http.get(`${this.employeesUrl}`)
      .toPromise()
      .then(response => response.json().data as Employee[])
      .catch(this.handleError);
  }

  create(first_name: string, middle_name: string, last_name: string, role: string): Promise<Employee> {
    return this.http
      .post(`${this.employeesUrl}`, JSON.stringify({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        role: role
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

  delete(id: number): Promise<void> {
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

