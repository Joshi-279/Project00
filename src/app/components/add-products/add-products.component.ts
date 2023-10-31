import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormServiceService } from 'src/app/services/form-service/form-service.service';

import { RequestService } from 'src/app/services/request/request.service';

@Component({

  selector: 'app-add-products',

  templateUrl: './add-products.component.html',

  styleUrls: ['./add-products.component.css']

})

export class AddProductsComponent implements OnInit {

  formGroup: any;

  onLocationChange: any;

  onCategoryChange: any;

  static onSubmit(onSubmit: any) {

    throw new Error('Method not implemented.');

  }

 

  myForm: FormGroup;

  selectedLocation!: string;

  Location: any;

  cateogry!: string;

  Category: any;

  isSubmitting: boolean = false;

  static myForm: any;

 

  constructor(private formBuilder: FormBuilder, private formService: FormServiceService, private createrequestservice: RequestService) {

    this.myForm = this.formBuilder.group({

      assetId: ['',Validators.required],

      status: [''],

      description: [''],

      assetMake: ['',Validators.required],

      assetModel: ['',Validators.required],

      manufacturer: [''],

      location: ['',Validators.required],

      subLocation: [''],

      assetStatus: [''],

      serialNo: [''],

      poNo: [null, Validators.pattern(/^\d*$/)],

      Vendor: [''],

      price: [null, Validators.pattern(/^\d+(\.\d{1,2})?$/)],

      currency: [''],

      conversionFactor: [null],

      priceInr: [null],

      bondNo: [''],

      remarks: [''],

      tags:[''],

      categoryName: ['',Validators.required]

    });

 

  }

 

  ngOnInit(): void {

    this.GetLocation();

    this.GetCategory();

  }

 

  GetLocation() {

    debugger;

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

 

  GetCategory() {

    this.createrequestservice.GetCategory().subscribe({

      next: (res) => {

        this.Category = res;

        console.log(res);

      },

      error: (err) => console.log(err),

      complete: () => {},

    });

  }

 

  onSubmit() {

    console.log(this.myForm);

     if (this.myForm.valid) {

      const formData = this.myForm.value;

 

      this.isSubmitting = true;

 

      this.formService.submitForm(formData).subscribe((response: string) => {

        // Handle the response here (e.g., show a success message)

        console.log('Form submitted successfully:', response);

        alert("Item added successfully");

        this.isSubmitting = false;

        this.myForm.reset();

        window.location.reload();

       

      }, (error: any) => {

        // Handle any errors (e.g., display an error message)

        alert('Item not added');

        console.error('Error submitting form:', error);

        this.isSubmitting = false;

        // alert("Item added successfully")

 

        this.myForm.reset();

      });

    }

  }

}