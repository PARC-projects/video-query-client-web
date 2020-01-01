import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/user.model';

const API_URL = environment.apiUrl;

@Injectable()
export class ProfileRepository {
  constructor(private http: HttpClient) { }

  patch(profile: Profile): Observable<void> {
    return this.http.patch(`${API_URL}/profile/${profile.profile_id}/`, profile)
    .pipe(
      map((resp: Profile) => {
        console.log(resp);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('VideoRepository::handleError', error);
    return throwError(error);
  }
}
