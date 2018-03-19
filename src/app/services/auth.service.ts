import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class AuthenticationService {

  baseUrl: 'http://localhost:8080/email2sms/';
  loggedIn:boolean;
  constructor(private http: HttpClient) {
    console.log("Auth Service Started");
  }

  attemptAuth(uname: string, pwd: string): Observable<any> {
    const credentials = {username: uname, password: pwd};
    console.log('attempAuth ::');
    this.loggedIn=true;
    return this.http.post<any>('http://localhost:8080/token/generate-token', credentials);
  }
}

