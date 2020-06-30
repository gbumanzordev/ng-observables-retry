import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, finalize, take, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RetryRequestService {
  token = '48fhj98jf894';

  constructor(private httpClient: HttpClient) {}

  getInformation() {
    return this.httpClient
      .get(
        'https://ceresa.us.auth0.com/api/v2/users?include_totals=true&per_page=5',
        {
          headers: { authorization: `Bearer ${this.token}` },
        }
      )
      .pipe(
        map((response) => response),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return this.handleExpiredSession();
          }
          return throwError('Got an error');
        })
      );
  }

  handleExpiredSession() {
    return this.httpClient
      .post(
        'https://gatekeeper-node-qa.herokuapp.com/api/v1/authentication/login',
        { email: 'gumanzor@applaudostudios.com', password: 'admin1234' }
      )
      .pipe(
        switchMap(() => {
          this.token =
            'A VALID TOKEN SHOULD GO HERE AS T A RESULT OF THE REQUEST SENT TO THE ENDPOINT';
          return this.getInformation();
        })
      );
  }
}
