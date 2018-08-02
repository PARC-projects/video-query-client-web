import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from './authentication.guard';
import { appRoutes } from '../routing.module';

// describe('AuthenticationGuard', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthenticationGuard],
//       imports: [RouterTestingModule.withRoutes(appRoutes)]
//     });
//   });

//   it('should be created', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
//     expect(service).toBeTruthy();
//   }));
// });
