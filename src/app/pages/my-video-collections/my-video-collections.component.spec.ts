import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideoCollectionsComponent } from './my-video-collections.component';

describe('MyVideoCollectionsComponent', () => {
  let component: MyVideoCollectionsComponent;
  let fixture: ComponentFixture<MyVideoCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideoCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideoCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
