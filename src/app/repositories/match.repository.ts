import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Match } from '../models/match.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

const API_URL = environment.apiUrl;

export interface IMatchRepository {
  getAll(): Observable<Match>;
}

@Injectable()
export class MatchRepository {

  constructor(private http: HttpClient,
    private injector: Injector) { }

  get(id: number): Observable<Match> {
    return this.http.get(`${API_URL}/matches/${id}`).pipe(
      map((resp: Match) => {
        return resp || {} as Match;
      }),
      catchError(this.handleError)
    );
  }

  saveMatches(matches: Match[], queryId: number): Observable<Match> {
    return this.http.patch(`${API_URL}/matches-list/`, { matches: matches, query_id: queryId }).pipe(
      map((resp: Match) => {
        return resp || {} as Match;
      }),
      catchError(this.handleError)
    );
  }


  getLatestMatches(id: number): Observable<Match[]> {
    return this.http.get(`${environment.apiUrl}/queries/${id}/matches/`).pipe(
      map((resp: Match[]) => {
        const matches = [] as Match[];
        resp.forEach(match => {
          matches.push(new Match(this.injector.get(AuthenticationService)).deserialize(match));
        });
        return matches;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
