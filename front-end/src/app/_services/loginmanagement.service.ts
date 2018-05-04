import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginmanagementService {

  constructor(
    private http: Http
  ) { }

  baseUrl='http://localhost:3000';
  signUp(data) {
  return this.http.post(this.baseUrl+'/account', data);
  }

  login(data) {
    return this.http.post(this.baseUrl+'/login', data);
    console.log('zzzzzzz', data);
  }

}
