import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormServiceService } from 'src/app/services/form-service/form-service.service';

 

@Component({

  selector: 'app-bulk-product-page',

  templateUrl: './bulk-product-page.component.html',

  styleUrls: ['./bulk-product-page.component.css']

})

export class BulkProductPageComponent {

 

  isSubmitting: boolean = false;

  data: any;

 

  constructor(private http:HttpClient, private formService:FormServiceService){ }

 

 

  ngOnInit() {}

 

 

 

  uploadFile(file: File) {

    if (!file.type.startsWith('application/vnd.ms-excel')) {

      alert('File must be an Excel file');

      return;

    }

 

 

 

    this.formService.uploadFile(file);

  }

  // file:any

 

  // ngOnInit(): void{

  // }

  file:any;

  formObj:any;

 

 

  correctFileFlag=false;

  errorMessage='';

 

  selectedFile!: File;

  checkFile!:File;

  uploading = false;

 

 

  onFileSelected(event: any): void {

    this.checkFile = event.target.files[0];

    console.log(this.checkFile.type);

    if (this.checkFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ) {

      this.errorMessage = 'Only Excel files are allowed.';

      this.correctFileFlag=false;

   }

   else{

          this.selectedFile=this.checkFile;

          this.errorMessage = ''

          this.correctFileFlag=true;

        }

     }

 

  onUpload(): void {

    if (this.selectedFile) {

      this.uploading = true;

     

      this.isSubmitting = true;

 

      this.formService.uploadFile(this.selectedFile)

        .subscribe(

          () => {

            this.uploading = false;

            alert('File uploaded successfully!');

            this.isSubmitting = false;

            window.location.reload();

          },

          (error:any)=> {

            this.uploading = false;

            console.error('Error uploading file: ', error);

            alert('Error uploading file, please try again later.');

            this.isSubmitting = false;

            window.location.reload();

          }

        );

    }

  }

}