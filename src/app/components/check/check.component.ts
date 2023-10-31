import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType, Color} from 'chart.js';
import { environment } from 'src/app/environments/environment';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {

  // public pieChartLabels = ['Red', 'Blue', 'Yellow'];
  // public pieChartData = [{data:[120, 150, 180]}];
  // public pieChartType = 'pie';

  @Input() recentlyAddedProducts: any[] = [];

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  // TO DARKEN THE COLORS OF CHART
  // pieChartOptions: any = {
  //   responsive: true,
  //   legend: {
  //     labels: {
  //       fontColor: 'darkgray' // Set the legend font color to dark gray
  //     }
  //   },
  //   elements: {
  //     arc: {
  //       backgroundColor: ['rgba(255, 99, 132, 0.8)',
  //       'rgba(54, 162, 235, 0.8)',
  //       'rgba(255, 206, 86, 0.8)',
  //       'rgba(75, 192, 192, 0.8)',
  //       'rgba(153, 102, 255, 0.8)',
  //       'rgba(255, 159, 64, 0.8)',
  //       'rgba(255, 99, 132, 0.8)',
  //       'rgba(54, 162, 235, 0.8)',
  //       'rgba(255, 206, 86, 0.8)',
  //       'rgba(75, 192, 192, 0.8)',
  //       'rgba(153, 102, 255, 0.8)',
  //       'rgba(255, 159, 64, 0.8)',
  //       'rgba(255, 99, 132, 0.8)'] // Set the arc background colors to darker shades
  //     }
  //   }
  // };

  // public pieChartOptions: any = {
  //   responsive: true,
  //   legend: {
  //     labels: {
  //       generateLabels: (chart:any) => {
  //         const data = chart.data;
  //         if (data.labels.length && data.datasets.length) {
  //           return data.labels.map((label:any, index:any) => {
  //             const dataset = data.datasets[0];
  //             const backgroundColor = dataset.backgroundColor[index];
  //             return {
  //               text: label,
  //               fillStyle: backgroundColor,
  //               strokeStyle: backgroundColor,
  //               lineWidth: 1,
  //               fontColor: ['red', 'green', 'blue'][index % 3] // Set font color based on index
  //             };
  //           });
  //         }
  //         return [];
  //       }
  //     }
  //   },
  //   elements: {
  //     arc: {
  //       backgroundColor: ['red', 'green', 'blue']
  //     }
  //   }
  // };

 
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
  // public pieChartColors: any[] = [
  //   {
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.8)',
  //       'rgba(54, 162, 235, 0.8)',
  //       'rgba(255, 206, 86, 0.8)',
  //       'rgba(75, 192, 192, 0.8)',
  //       'rgba(153, 102, 255, 0.8)',
  //       'rgba(255, 159, 64, 0.8)',
  //       'rgba(255, 99, 132, 0.8)',
  //       'rgba(54, 162, 235, 0.8)',
  //       'rgba(255, 206, 86, 0.8)',
  //       'rgba(75, 192, 192, 0.8)',
  //       'rgba(153, 102, 255, 0.8)',
  //       'rgba(255, 159, 64, 0.8)',
  //       'rgba(255, 99, 132, 0.8)'
  //     ]
  //   }
  // ];

  @Input() pieChartType: ChartType = 'pie';

  @Input() pieChartData: ChartDataset[] = [];
  @Input() pieChartLabels: string[] = [];

  constructor(private http: HttpClient, private router:Router, private loaderService:LoaderService) { }

  ngOnInit(): void {
    // this.loaderService.showLoader();  // to show loader
    // this.fetchCategoryData();
    // this.getRecentlyAddedProducts();
  }

  // fetchCategoryData(): void {
  //   this.http.get(environment.apiUrl+"/Item/countByCategory").subscribe((data: any) => {
  //     // the API response is an object with category names as keys and item counts as values
  //     this.pieChartData = [{ data: Object.values(data) }];
  //     this.pieChartLabels = Object.keys(data);
  //     this.loaderService.hideLoader();   // hide loader
  //   });
  // }

 
  
  // getRecentlyAddedProducts(): void {
  //   this.http.get(environment.apiUrl+"/Item/latestItems").subscribe(
  //     (products: any) => {
  //       this.recentlyAddedProducts = products;
  //     },
  //     (error) => {
  //       console.error('Error fetching recently added products:', error);
  //     }
  //   );
  // }


  handleClick(assetId:any){
    // to check the row data
    console.log(assetId);
    this.router.navigate(['/tableItemDetails',assetId])
    
  
  }




  
}
