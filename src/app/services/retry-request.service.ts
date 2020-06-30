import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, finalize, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RetryRequestService {
  status = new BehaviorSubject(false);
  token = '48fhj98jf894';

  constructor(private httpClient: HttpClient) {}

  retrieveInformation() {
    console.log('retrieving information, returning an observable');
    return this.status.value ? of('ok') : throwError('error thrown');
  }

  getInformation() {
    console.log('entered get information');
    return this.httpClient
      .get(
        'https://ceresa.us.auth0.com/api/v2/users?include_totals=true&per_page=5',
        {
          headers: { authorization: `Bearer ${this.token}` },
        }
      )
      .pipe(
        take(1),
        map((response) => {
          console.log(`Response ${response} caught`);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          console.log(`${error} caught`);
          if (error.status === 400) {
            console.log('refreshing Token being called');
            this.refreshTokenStatus();
            return of(error);
          }
          return throwError('Got an error');
        })
      );
  }

  refreshTokenStatus() {
    console.log('refreshing token status to true');
    this.status.next(true);
    this.getInformation();
  }
}
