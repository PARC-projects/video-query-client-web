import { TestBed, inject } from '@angular/core/testing';

import { AlertService, AlertType } from './alert.service';

describe('AlertService', () => {
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService]
    });
    alertService = new AlertService();
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));

  // it('should have no message to start', () => {
  //   expect(alertService.text).toBe(undefined);
  // });

  // it('should have no type to start', () => {
  //   expect(alertService.type).toBe(undefined);
  // });

  it('should not be visible to start', () => {
    expect(alertService.show).toBe(false);
  });

  it('should set "show" to true when setAlert is called', () => {
    alertService.setAlert('alert message', AlertType.Danger);

    expect(alertService.show).toBe(true);
  });

  it('should have "text" when setAlert is called', () => {
    alertService.setAlert('alert message', AlertType.Danger);

    expect(alertService.text).toBe('alert message');
  });

  it('should have type when setAlert is called', () => {
    alertService.setAlert('alert message', AlertType.Danger);

    expect(alertService.type).toBe(AlertType.Danger);
  });
});
