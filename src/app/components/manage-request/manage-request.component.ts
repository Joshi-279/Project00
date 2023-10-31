import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ManageRequestService } from 'src/app/services/managerequest/manage-request.service';
import Swal from 'sweetalert2';

imports: [MatTableModule, MatPaginatorModule];
export interface iCategory {
  // category: string;
  // name: string;
  // location: string;
  // status: string;
  // id: string;
  data:any;
  error:any;
  assetName: any;
  location: any;
  status: any;
  category: any;
  requestid: any;
  approver:any;
  id:any
  
}

const Cat_Data: iCategory[] = [];

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css'],
  // standalone: true,
})
export class ManageRequestComponent {
  displayedColumns: string[] = [
    'requestid',
    'category',
    'assetName',
    'location',
    'status',
    'approver',
    'action',
  
  ];

  //dataSource: iCategory[] = [];
  assetName: any;
  location: any;
  status: any;
  category: any;
  requestid: any;
 
  // Assign the data to the data source for the table to render
  // dataSource = new MatTableDataSource<iCategory>(Cat_Data);

    @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<iCategory>(Cat_Data);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(
    private managerequestService: ManageRequestService,
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.trackingDetails();
    this.dataSource.paginator= this.paginator;
  }
  Admin() {
    this.router.navigate(['admin']);
  }
  trackingDetails() {
    this.managerequestService.getRequest().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log('', this.dataSource);
      },
      (error) => {
        console.error('Error in fetching data', error);
      },
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // EditRequest() {
  //   alert('Clicked on View');
  //   this.router.navigate(['edit-request']);
  // }
  removeItem(id:number){
    this.dataSource.data.splice(id,1)
  }

  // DeleteRequest(id: number) {
  //   this.managerequestService.DeleteRequest(id).subscribe( (data) => {
  //       alert('Item deleted successfully');
  //       // this.removeItem(id)
  //       // dataSource.data.splice(deletedIndex, 1);
  //       this.trackingDetails();
  //       this.router.navigate(['manageRequest']);

  //     },
  //      (error) => {
  //       console.log('Item cannot be delete', error);
  //       alert('Item  cannot deleted successfully');
  //       this.router.navigate(['manageRequest']);


  //     },
  //   );
  // }
   DeleteRequest(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      
    this.managerequestService.DeleteRequest(id).subscribe( (data) => {
        // alert('Item deleted successfully');
        // this.removeItem(id)
        // dataSource.data.splice(deletedIndex, 1);
        this.trackingDetails();
        this.router.navigate(['manageRequest']);

      },
       (error) => {
        console.log('Item cannot be delete', error);
        alert('Item  cannot deleted successfully');
        this.router.navigate(['manageRequest']);


      },
    );
  }
      // // perform delete request here
      // console.log('Request deleted');
    }
  
)}
}
