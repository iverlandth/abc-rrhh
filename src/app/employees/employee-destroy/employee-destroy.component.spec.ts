import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDestroyComponent } from './employee-destroy.component';

describe('EmployeeDestroyComponent', () => {
  let component: EmployeeDestroyComponent;
  let fixture: ComponentFixture<EmployeeDestroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDestroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
