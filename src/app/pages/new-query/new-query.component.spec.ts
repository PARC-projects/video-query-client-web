import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewQueryComponent } from './new-query.component';
import { ComponentsModule } from '../../components/components.module';
import { SearchSetRepository } from '../../repositories/search-set.repository';
import { QueryRepository } from '../../repositories/query.repository';
import { AlertService } from '../../services/alert.service';

describe('NewQueryComponent', () => {
  let component: NewQueryComponent;
  let fixture: ComponentFixture<NewQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ComponentsModule
      ],
      declarations: [NewQueryComponent],
      providers: [
        AlertService,
        QueryRepository,
        SearchSetRepository
      ]
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
