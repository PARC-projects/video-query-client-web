import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IMatch } from '../models/match.model';

const API_URL = environment.apiUrl;

export interface IMatchRepository {
  getAll(): Observable<IMatch>;
}

@Injectable()
export class MatchRepository {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<IMatch> {
    return this.http.get(`${API_URL}/matches/${id}`).pipe(
      map((resp: IMatch) => {
        return resp || {} as IMatch;
      }),
      catchError(this.handleError)
    );
  }

  saveMatches(matches: IMatch[], queryId: number): Observable<IMatch> {
    return this.http.patch(`${API_URL}/matches-list/`, { matches: matches, query_id: queryId }).pipe(
      map((resp: IMatch) => {
        return resp || {} as IMatch;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
