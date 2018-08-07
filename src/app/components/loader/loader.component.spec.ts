import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display if show = false', () => {
    component.show = false;
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('section'));

    expect(deAlert).toBeNull();
  });

  it('should display if show = true', () => {
    component.show = true;
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('section'));

    expect(deAlert).toBeTruthy();
  });
});
