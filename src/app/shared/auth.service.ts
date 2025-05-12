import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUser: string | null = null;

  login(username: string) {
    this.loggedUser = username;
  }

  logout() {
    this.loggedUser = null;
  }

  get user() {
    return this.loggedUser;
  }

  isLoggedIn(): boolean {
    return this.loggedUser !== null;
  }
}
