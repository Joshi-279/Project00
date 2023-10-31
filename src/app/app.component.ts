import { Component } from '@angular/core';
import { CommonService } from './services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'InventoryManagementSystem';
  isLoggedIn = false;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.isLoggedIn.subscribe((value:boolean) => {
      this.isLoggedIn = value;
    });
  }
}
