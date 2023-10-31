import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { CommonService } from '../common/common.service';
import { TokenStorageService } from '../token-storage/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient,private commonService: CommonService
    ,private tokenService:TokenStorageService, private router:Router) {

  }
  login(cred:any){
    this.commonService.setLoggedIn(true);//remove it when server is on
    this.router.navigate(['/'])//remove it when server is on
    const credentials={
      userId:cred.controls["username"].value,
      password:cred.controls["password"].value
    }
    console.log(environment.apiUrl+"/auth/signIn")
    console.log(credentials)
    this.http.post(environment.apiUrl+"/auth/signIn", credentials).subscribe((response:any)=>{
      console.log("successfull");
      this.commonService.setLoggedIn(true);
      this.tokenService.saveToken(response.token);
      this.tokenService.saveUser(response.user);
      this.router.navigate(['/'])
    },(error:any)=>{
      console.log(error)
      alert("Incorrect credentials")
      console.error("login error");
    });
    
  }

  logout() {
    console.log("logout executed")
    this.commonService.setLoggedIn(false);
    this.tokenService.removeUser();
    this.tokenService.removeToken();
    window.location.reload();
    
  }
}
