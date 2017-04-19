import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Employee} from './employee';
import {PaginatedResult, Pagination} from "../shared/interfaces";

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

  getEmployees(search: string = null, page?: number, itemsPerPage?: number): Observable<PaginatedResult<Employee[]>> {
    let peginatedResult: PaginatedResult<Employee[]> = new PaginatedResult<Employee[]>();

    let headers = new Headers();

    if (page != null && itemsPerPage != null) {
      headers.append('Pagination', page + ',' + itemsPerPage);
    }

    return this.http.get(this.employeesUrl, {
      headers: headers
    }).map((res: Response) => {

      let resultData = res.json().data;

      if (!search || !search.length) {
        peginatedResult.result = resultData;
      } else {
        peginatedResult.result = Object.assign([], resultData).filter(
          item => item.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      }
      return peginatedResult;
    }).catch(this.handleError);
  }

  create(employee: Employee): Promise<Employee> {
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

  getSerialized<T>(arg: any): T {
    return <T>JSON.parse(JSON.stringify(arg));
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

