import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQueryComponent } from './new-query.component';

describe('NewQueryComponent', () => {
  let component: NewQueryComponent;
  let fixture: ComponentFixture<NewQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
