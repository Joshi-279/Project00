import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  user: any;

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    console.log(this.user)
  }

}
