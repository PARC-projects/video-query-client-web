import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { QueryResponse, Query, ProcessState } from '../models/query.model';
import { environment } from '../../environments/environment';
import { IQueryResult } from '../models/query-result.model';
import { Match } from '../models/match.model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class QueryRepository {
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Query> {
    return this.http.get(`${environment.apiUrl}/queries/${id}/`).pipe(
      map((resp: Query) => {
        return resp || {} as Query;
      }),
      catchError(this.handleError)
    );
  }

  getAll(page?: number, search?: string, perPage = 10): Observable<QueryResponse> {
    let url = `${environment.apiUrl}/queries/?page_size=${perPage}`;
    if (page) {
      url = url + `&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
    }

    return this.http.get(url).pipe(
      map((resp: QueryResponse) => {
        return resp || {} as QueryResponse;
      }),
      catchError(this.handleError)
    );
  }

  add(query: Query): Observable<QueryResponse> {
    return this.http.post(environment.apiUrl + '/queries/', query).pipe(
      map((resp: QueryResponse) => {
        return resp || {} as QueryResponse;
      }),
      catchError(this.handleError));
  }

  getLatestQueryResult(id: number): Observable<IQueryResult> {
    return this.http.get(`${environment.apiUrl}/queries/${id}/query_result/`).pipe(
      map((resp: IQueryResult) => {
        return resp || {} as IQueryResult;
      }),
      catchError(this.handleError));
  }

  updateNote(id: number, note: string): Observable<void> {
    return this.http.patch(environment.apiUrl + `/queries/${id}/`, { 'notes': note }).pipe(
      map(() => { }),
      catchError(this.handleError));
  }

  updateState(id: number, state: ProcessState): Observable<void> {
    return this.http.patch(environment.apiUrl + `/queries/${id}/`, { 'process_state': state }).pipe(
      map(() => { }),
      catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('QueryRepository::handleError', error);
    return throwError(error);
  }
}
