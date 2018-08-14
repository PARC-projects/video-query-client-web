import { ReferenceTimeValidatorDirective } from './reference-time.validator';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  template: '<form #form="ngForm">' +
    '<input type="hidden" appReferenceTime" #fieldModel="ngModel" [(ngModel)]="field">' +
    '</form>'
})
class TestComponent {
  field: string;
}

describe('ReferenceTimeValidatorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [TestComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new ReferenceTimeValidatorDirective();
    expect(directive).toBeTruthy();
  });
});
