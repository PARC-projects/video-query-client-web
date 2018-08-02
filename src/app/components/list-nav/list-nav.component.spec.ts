import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNavComponent } from './list-nav.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoaderComponent } from '../loader/loader.component';

describe('ListNavComponent', () => {
  let component: ListNavComponent;
  let fixture: ComponentFixture<ListNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListNavComponent,
        PaginationComponent,
        LoaderComponent
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
