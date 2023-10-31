import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { MenubarService } from 'src/app/services/menubar/menubar.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, DoCheck {

  public length =0; currentpage=0;

  pageSize = 12; pageSizeOptions: number[] = [8, 12, 16, 20, 50];


  cardDataText='With supporting text below as a natural lead-in to additional content.'
  cardData !:any[]
  oldpageNo:number=0
  pageNo:number=0;
  noOfItems:number=10;
  totalNoOfPages:number=0;
  totalElements:number=0;
  constructor(private loginServ:LoginServiceService, private menuService:MenubarService
    ,private router : Router){

  }
  ngDoCheck(): void {
    console.log("ngOnchanges")
  }

 

  ngOnInit(): void {
      this.getAllCategories(this.currentpage,this.pageSize)
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {

    if (setPageSizeOptionsInput) {

      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

    }

  }

  pageEvent(event:any){

    console.log(event)

    this.currentpage=event.pageIndex+1;

    this.pageSize=event.pageSize;

    this.setpageparamaters(event.pageIndex,this.pageSize)

    this.getAllCategories(event.pageIndex,this.pageSize)

    




     

  }


  setpageparamaters(currentpage:any, pageSize:any){
    this.currentpage=currentpage;
    this.pageSize=pageSize;
  }


  getAllCategories(currentpage:any, pageSize:any){
      this.menuService.getAllItemsCategory(currentpage,pageSize).subscribe((res:any)=>{
           console.log(res['content'])

           this.length=res['totalElements'];
           this.cardData=res['content'];  // cardData
           this.totalNoOfPages=res['totalPages'];
           
      })
      this.router.navigate(['/home'], { queryParams: { reload: true } });
  }

  goToCategory(category:any){
    console.log(category);
    this.router.navigate(['/categoryDetails',category])
  }

  getCategoryImageUrl(categoryName: string): string {
    const formattedName = categoryName.toLowerCase().replace(/\s+/g, '').replace('/', '');
    return `assets/${formattedName}.jpg`;
  }

}
