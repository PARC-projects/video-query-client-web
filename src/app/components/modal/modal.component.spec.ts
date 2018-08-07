import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display if show = true', () => {
    component.show = true;
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.modal'));

    expect(deAlert).toBeTruthy();
  });

  it('should not display if show = false', () => {
    component.show = false;
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.modal'));

    expect(deAlert).toBeNull();
  });

  it('open() should set show to true', () => {
    component.show = false;

    component.open();

    expect(component.show ).toEqual(true);
  });

  it('close() should set show to true', () => {
    component.show = true;

    component.close();

    expect(component.show ).toEqual(false);
  });

  it('should close on .modal-overlay ()', () => {
    component.show = true;
    fixture.detectChanges();

    let deModal = fixture.debugElement.query(By.css('.modal'));
    expect(deModal).toBeTruthy();

    fixture.debugElement.query(By.css('.modal-overlay')).nativeElement.click();
    fixture.detectChanges();

    deModal = fixture.debugElement.query(By.css('.modal'));

    expect(deModal).toBeNull();
  });
});
