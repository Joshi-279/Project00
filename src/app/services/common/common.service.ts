import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../token-storage/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient , private tokenService: TokenStorageService) { 
    this.checkLoggedIn();
  }
  
  getTotalNoOfUSers(): any {
     return this.http.get(environment.apiUrl+environment.getnoOfUsers);
  }



  private loggedIn = new BehaviorSubject<boolean>(false);

  private checkLoggedIn() {
    if (this.tokenService.getToken() && this.tokenService.getUser()) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
