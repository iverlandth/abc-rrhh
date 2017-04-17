export class Employee {
  public id: number;
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public role: string;

  constructor() {}

}
export class EmployeeReturn{
  constructor(public employee: Employee){}

  clone() {
    return new EmployeeReturn(this.employee);
  }
}
