import { Component, OnInit } from '@angular/core';

import {

  FormGroup,

  FormControl,

  FormBuilder,

  Validators,

} from '@angular/forms';



import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';

import { RequestService } from 'src/app/services/request/request.service';

import { Router } from '@angular/router';

import { MenubarService } from 'src/app/services/menubar/menubar.service';

import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';

interface IDropdown {

  value: string;

  viewvalue: string;

}



@Component({

  selector: 'app-create-request-page',

  templateUrl: './create-request-page.component.html',

  styleUrls: ['./create-request-page.component.css'],

})

export class CreateRequestPageComponent implements OnInit {

  cateogry!: string;

  Name!: string;

  assetNames: any;

  remarks: any;

  selectedCategory!: string;

  selectedLocation!: string;

  approverEmail: any;

  userEmail: any;

  formGroup: FormGroup;

  email: any;

  Category: any;

  Location: any;

  user: any;



  constructor(

    private createrequestservice: RequestService,

    private fb: FormBuilder,

    private router: Router,

    private menuService: MenubarService,

    private tokenservice: TokenStorageService

  ) {

    this.formGroup = this.fb.group({

      location: [null, Validators.required],

      category: [null, Validators.required],

      assetName: ['', Validators.required],

      quantity: [null, Validators.required],

      remarks: [null],

      user: [''],

    });

  }

  initialValue = {

    location: 'null',

    category: 'null',

    assetName: 'null',

    quantity: 'null',

    userEmail: 'null',

  };



  ngOnInit(): void {

    this.GetCategory();

    this.GetLocation();

    // this.GetAssetName();



    this.user = this.tokenservice.getUser();

    this.formGroup.get('user')?.setValue(this.user.email);



    console.log(this.user);



  }



  GetCategory() {

    this.createrequestservice.GetCategory().subscribe({

      next: (res) => {

        this.Category = res;

        console.log(res);

      },

      error: (err) => console.log(err),

      complete: () => { },

    });

  }



  GetLocation() {

    this.createrequestservice.GetLocation().subscribe(

      (res) => {

        this.Location = res;

        console.log('', res);

      },

      (error) => {

        console.log('', error);

      }

    );

  }

  // GetAssetName() {

  //   this.createrequestservice.GetAssetName().subscribe({

  //     next: (res) => {

  //       this.assetNames = res;

  //       console.log('', res);

  //       console.log(this.assetNames);

  //     },

  //     error: (err) => console.log(err),

  //     complete: () => { },

  //   });

  // }

  onAlertOkClick() {

    this.formGroup.reset();

  }



  onSubmit(): void {

    let data = JSON.stringify(this.formGroup.getRawValue());

    console.log(data);

  



    this.createrequestservice.Sendmail(data).subscribe(

      (res: any) => {

        console.log('Email sent', res);



        const conf = window.confirm('Request Created');

        if (conf) {
          location.reload();

          // this.formGroup.reset({

          //   location: this.initialValue.location,

          //   category: this.initialValue.category,

          //   assetName: this.initialValue.assetName,

          //   quantity: this.initialValue.quantity,

          //   userEmail: this.initialValue.userEmail

          // });

          this.formGroup.markAsPristine();

          this.formGroup.markAsUntouched();

        }

        this.approverEmail = 'res';

        // this.router.navigate(['/createRequest']);

      },

      (error: any) => {



        const conf = window.confirm('Request  can not be Created');

        if (conf) {

          this.formGroup.reset({

            location: this.initialValue.location,

            category: this.initialValue.category,

            assetName: this.initialValue.assetName,

            quantity: this.initialValue.quantity,

            userEmail: this.initialValue.userEmail

          })



          this.formGroup.markAsPristine();

          this.formGroup.markAsUntouched();

        }



        console.log('Email Sending Error', error);

        this.router.navigate(['/createRequest']);

      }

    );





  }
  // refresh():void{
  //   location.reload();
  // }

}

