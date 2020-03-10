import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewQueryComponent } from './create-new-query.component';

describe('CreateNewQueryComponent', () => {
  let component: CreateNewQueryComponent;
  let fixture: ComponentFixture<CreateNewQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
