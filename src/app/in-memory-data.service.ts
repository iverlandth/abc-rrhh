import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let employees = [
      {id: 11, first_name: 'Fusce', middle_name: 'Nec', last_name: 'Mr. Nice', role: 'Developer'},
      {id: 12, first_name: 'Augue', middle_name: 'Semper', last_name: 'Narco', role: 'PM'},
      {id: 13, first_name: 'Lorem', middle_name: 'Ipsum', last_name: 'Bombasto', role: 'Developer'},
      {id: 14, first_name: 'Amet', middle_name: 'Sociosqu', last_name: 'Celeritas', role: 'Developer'},
      {id: 15, first_name: 'Integer', middle_name: 'Sed', last_name: 'Magneta', role: 'Developer'},
      {id: 16, first_name: 'Libero', middle_name: 'Quis', last_name: 'RubberMan', role: 'PM'},
      {id: 17, first_name: 'Dapibus', middle_name: 'Elementum', last_name: 'Dynama', role: 'Developer'},
      {id: 18, first_name: 'Nulla', middle_name: 'Nulla', last_name: 'Dr IQ', role: 'Developer'},
      {id: 19, first_name: 'Nibh', middle_name: 'Ligula', last_name: 'Magma', role: 'PM'},
      {id: 20, first_name: 'Sagittis', middle_name: 'Inceptos', last_name: 'Tornado', role: 'Developer'}
    ];
    return {employees};
  }
}
