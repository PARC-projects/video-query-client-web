import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IQueryResult } from '../models/query-result.model';
import { IMatches } from '../models/match.model';

const API_URL = environment.apiUrl;

@Injectable()
export class QueryResultRepository {
  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<IQueryResult> {
    return this.http.get(`${API_URL}/query-results/${id}/`).pipe(
      map((resp: IQueryResult) => {
        return resp || {} as IQueryResult;
      }),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<IQueryResult> {
    return this.http.get(API_URL + '/query-results/').pipe(
      map((resp: IQueryResult) => {
        return resp || {} as IQueryResult;
      }),
      catchError(this.handleError)
    );
  }

  add(query: IQueryResult): Observable<IQueryResult> {
    return this.http.post(API_URL + '/query-results/', query).pipe(
      map((resp: IQueryResult) => {
        return resp || {} as IQueryResult;
      }),
      catchError(this.handleError)
    );
  }

  getMatches(queryResultId: number): Observable<IMatches> {
    return this.http.get(`${API_URL}/query-results/${queryResultId}/matches/`).pipe(
      map((resp: IMatches) => {
        return resp || {} as IMatches;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('QueryResultsRepository::handleError', error);
    return throwError(error);
  }
}
