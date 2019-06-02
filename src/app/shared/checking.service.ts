import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  constructor() { }

  public checkForLog(): boolean {
    if (localStorage.getItem('email')) {
      return true;
    } else { return false; }
  }

  public checkForAdmin(): boolean {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    } else { return false; }
  }
}
