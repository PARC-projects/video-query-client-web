import { TestBed, inject } from '@angular/core/testing';
import { TokenInterceptor } from './token.interceptor';
import { ServiceModule } from '../services/service.module';

describe('TokenInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
      imports: [ServiceModule]
    });
  });

  it('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
