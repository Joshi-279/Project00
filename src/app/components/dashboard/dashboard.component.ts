import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { environment } from 'src/app/environments/environment';
import { CommonService } from 'src/app/services/common/common.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalNoOfUsers:number=0;
  totalNoOfRequests:number=0;
  totalNoOfPendingRequests:number=0;
  totalnoOfProducts:number=0;

  isLoading = false;
  constructor(private http: HttpClient,private commonService:CommonService, private loaderService:LoaderService,   private cdr: ChangeDetectorRef){
  }

  ngOnInit(): void {
    
    this.loaderService.showLoader();  // to show loader
    console.log(this.isLoading)
    this.loaderService.loaderState$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cdr.detectChanges(); // Manually trigger change detection
      console.log(this.isLoading)
    });
    
      this.getTotalNoOfUsers();


    this.fetchCategoryData();
    this.getRecentlyAddedProducts();
  }

  getTotalNoOfUsers(){
    this.commonService.getTotalNoOfUSers().subscribe((data:any)=>{
      console.log("getting response from getTotalNoOfUsers"+data);
       this.totalNoOfUsers=data.noOfUsers;      
       this.totalNoOfRequests=data.totalnoOfRequests;      
       this.totalNoOfPendingRequests=data.totalnoOfPendingRequests;      
       this.totalnoOfProducts=data.totalnoOfProducts;      
    })
  }

  pieChartType: ChartType = 'pie';

  pieChartData: ChartDataset[] = [];
  pieChartLabels: string[] = [];
  recentlyAddedProducts: any[] = [];

  fetchCategoryData(): void {
    this.http.get(environment.apiUrl+"/Item/countByCategory").subscribe((data: any) => {
      this.pieChartData = [{ data: Object.values(data) }];
      this.pieChartLabels = Object.keys(data);
      this.loaderService.hideLoader();   // hide loader
    });
  }

 
  
  getRecentlyAddedProducts(): void {
    this.http.get(environment.apiUrl+"/Item/latestItems").subscribe(
      (products: any) => {
        this.recentlyAddedProducts = products;
      },
      (error) => {
        console.error('Error fetching recently added products:', error);
      }
    );
  }

}
