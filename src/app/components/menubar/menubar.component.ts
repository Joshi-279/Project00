import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit{
  title = 'InventoryManagementSystem';

  name= ""
  Initials=""

  user: any;

  

  constructor(private loginService:LoginServiceService,private tokenService: TokenStorageService){

  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.name=this.user.firstName+" "+this.user.lastName
    this.Initials=this.user.firstName.charAt(0).toUpperCase()
                          +this.user.lastName.charAt(0).toUpperCase();
    console.log(this.user)
  }

  logout(){
    console.log("logout")
    this.loginService.logout();
  }
}
