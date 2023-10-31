import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageRequestAdminService} from 'src/app/services/manageRequestAdmin/manage-request-admin.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface Request {
  // category: string;
  // name: string;
  // location: string;
  // status: string;
  // id: string;
  approverEmail: string;
  assetName: string;
  category: string;
  location: string;
  quantity: number;
  remarks: string;
  requestid: any;
  status: string
  userEmail: string;
  action:string
}

const Req_Data: Request[] = [];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  displayedColumns: string[] = [
    'requestId',
    'userEmail',
    'assetName',
    'location',
    'quantity',
    'action',
  ];
  // requestData: any[] = [];
  requestId: any;
  id: any;
  User_id: any;
  AssetName: any;
  quantity: any;
  // Action: any;
  requestData = new MatTableDataSource<Request>(Req_Data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.requestData.paginator = this.paginator;
  }

  constructor(private adminService: ManageRequestAdminService, private router: Router) {
    this.requestData = new MatTableDataSource<Request>();
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.requestData.filter = filterValue.trim().toLowerCase();
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.requestData.filter = filterValue.trim().toLowerCase();
  // }

  ngOnInit(): void {
    this.loadPage();
  }
  Myrequest() {
    this.router.navigate(['manageRequest']);
  }


  // Get all request data
  loadPage() {
    this.adminService.getRequestdata().subscribe( (data) => {
        this.requestData = new MatTableDataSource<Request>(Req_Data);
        this.requestData = data;
        console.log('', this.requestData);
      },
    (error) => {
        console.log('Error in fetching request:', error);
      },
    );
  }

  approveRequest(id: any): void {
   
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to approve this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, do it!',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.approveRequest(id).subscribe( (res) => {
      
        console.log('Request Approve', res);
        // alert('Request Approve');
                // requestdata.data.splice(id, 1);
                this.router.navigate(['admin']);


      console.log(id);
      this.loadPage()
      
      },
      (error) => {
        console.log('Error approve request', error);
        // alert('Request Approved');

        this.router.navigate(['admin']);

      }
      
      
  );
  console.log(id);
    }
  })
}

  
  

 rejectRequest(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to reject this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      
    this.adminService.rejectRequest(id).subscribe((res) => {
        
        console.log('Request reject', res);
        // alert('Request reject');
        //window.adminService.reload()
        // this.loadPage()
        location.reload();
        // this.router.navigate(['admin']);
        

                // requestdata.data.splice(id, 1);

      },
     (error) => {
        console.log('Error reject request',error
        );
        // this.router.navigate(['admin']);

      }
  );
  }
      // // perform delete request here
      // console.log('Request deleted');
    }
  
)}
  // rejectRequest(id: number): void {
  //   this.adminService.rejectRequest(id).subscribe((res) => {
        
  //       console.log('Request reject', res);
  //       alert('Request reject');
  //       //window.adminService.reload()
  //       // this.loadPage()
  //       location.reload();
  //       this.router.navigate(['admin']);
        

  //               // requestdata.data.splice(id, 1);

  //     },
  //    (error) => {
  //       console.log('Error reject request',error
  //       );
  //       this.router.navigate(['admin']);

  //     }
  // );
  // }
  
  
  }
