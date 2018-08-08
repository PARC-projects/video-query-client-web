import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';
import { IPagination } from '../../models/pagination';


describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.pagination = {
      count: 10,
      previousPage: 1,
      currentPage: 2,
      nextPage: 3,
      lastPage: 4,
    } as IPagination;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('perPageSelected', () => {
    it('should emit 20 when the .custom-select is changed.', () => {
      spyOn(component.perPageSelected, 'emit');

      fixture.debugElement.query(By.css('.custom-select')).nativeElement.value = '20';
      fixture.debugElement.query(By.css('.custom-select')).nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.perPageSelected.emit).toHaveBeenCalledWith('20');
    });
  });

  describe('paginationClick', () => {
    it('should emit when the .page-item is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.page-item')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalled();
    });

    it('should emit 1 when the .previous-arrow is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.previous-arrow')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalledWith(1);
    });

    it('should emit 3 when the .next-arrow is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.next-arrow')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalledWith(3);
    });

    it('should emit 1 when the .previous is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.previous')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalledWith(1);
    });

    it('should emit 3 when the .next is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.next')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalledWith(3);
    });

    it('should emit 2 when the .current is clicked.', () => {
      spyOn(component.paginationClick, 'emit');

      fixture.debugElement.query(By.css('.current')).nativeElement.click();

      expect(component.paginationClick.emit).toHaveBeenCalledWith(2);
    });
  });
});
