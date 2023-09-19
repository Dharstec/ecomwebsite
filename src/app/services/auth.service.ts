import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus: boolean = false;

  constructor() { }

  public setLoggedInStatus(value: boolean) {
    this.loggedInStatus = value;
}

public isLoggedIn() {
    return this.loggedInStatus;
}
}
