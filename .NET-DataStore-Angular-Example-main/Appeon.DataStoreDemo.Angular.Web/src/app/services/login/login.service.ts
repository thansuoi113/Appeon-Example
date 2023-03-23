import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private static readonly LoginEndpoint = '/login';
  constructor(private api: ApiService) {}

  public login(username: string, password: string): Observable<boolean> {
    return this.api
      .post(LoginService.LoginEndpoint, {
        username: username,
        password: password,
      })
      .pipe(map((response) => response.status == 200));
  }
}
