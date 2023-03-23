import { Injectable } from '@angular/core';
import { UserData } from 'src/app/models/userData';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userData: UserData;

  constructor() {
    this.userData = new UserData();
    this.userData.username = "Guest";
  }

  public getUser(): UserData {
    return this.userData;
  }
}
