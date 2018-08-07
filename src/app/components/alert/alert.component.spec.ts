import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { AlertService, AlertType } from '../../services/alert.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      providers: [
        AlertService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    alertService = TestBed.get(AlertService);
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not display if message not available', () => {
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.alert'));

    expect(deAlert).toBeNull();
  });

  it('should hide on click', () => {
    alertService.setAlert('test', AlertType.Danger);
    fixture.detectChanges();

    let deAlert = fixture.debugElement.query(By.css('.alert'));
    expect(deAlert !== null).toBeTruthy();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    deAlert = fixture.debugElement.query(By.css('.alert'));

    expect(deAlert).toBeNull();
  });


  describe('setAlert', () => {
    it('should apply "alert-danger" as css class ', () => {
      alertService.setAlert('test', AlertType.Danger);
      fixture.detectChanges();

      const deAlert = fixture.debugElement.query(By.css('.alert'));
      expect(deAlert.classes[AlertType.Danger]).toBeTruthy();
    });

    it('should display if message available', () => {
      alertService.setAlert('test', AlertType.Danger);
      fixture.detectChanges();

      const deAlert = fixture.debugElement.query(By.css('.alert'));
      expect(deAlert !== null).toBeTruthy();
    });

    it('should render message', () => {
      alertService.setAlert('test', AlertType.Danger);
      fixture.detectChanges();

      const deAlert = fixture.debugElement.query(By.css('.alert'));
      expect(deAlert.nativeElement.textContent).toContain('test');
    });
  });
});
