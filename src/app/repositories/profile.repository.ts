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

  patch(profile: Profile): Observable<Profile> {
    return this.http.patch(`${API_URL}/profile/${profile.id}/`, profile)
      .pipe(
        map((resp: Profile) => {
          return resp;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    console.error('VideoRepository::handleError', error);
    return throwError(error);
  }
}
