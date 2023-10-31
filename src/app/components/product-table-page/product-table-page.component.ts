import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/data-types/Item';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-product-table-page',
  templateUrl: './product-table-page.component.html',
  styleUrls: ['./product-table-page.component.css']
})
export class ProductTablePageComponent implements OnInit {
 

  itemData!:Item
  assetId!:String
  itemForm!: FormGroup

  constructor(private route:ActivatedRoute,private http:HttpClient, private fb:FormBuilder){

  }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{

      this.itemForm = this.fb.group({
        assetId: [''],
        status: [''],
        description: [''],
        assetMake: [''],
        assetModel: [''],
        manufacturer: [''],
        location: [''],
        subLocation: [''],
        assetStatus: [''],
        serialNo: [''],
        poNo: [''],
        vendor: [''],
        price: [''],
        currency: [''],
        conversionFactor: [''],
        priceInr: [''],
        bondNo: [''],
        remarks: [''],
        categoryName: [''],
        tags: [null]
      });
      this.assetId=params['productId'];

      let url=environment.apiUrl+"/Item/getItemDetails/"+this.assetId;
     console.warn("url is : "+ url)
     this.http.get(url).subscribe((data:any)=>{
      console.log("after URL call");
      console.log(data)
      this.itemData=data;
      console.log(this.itemData);
      console.log(this.itemData.assetId)
      this.itemForm.patchValue({
        assetId: [this.itemData.assetId],
        status: [this.itemData.status],
        description: [this.itemData.description],
        assetMake: [this.itemData.assetMake],
        assetModel: [this.itemData.assetModel],
        manufacturer: [this.itemData.manufacturer],
        location: [this.itemData.location],
        subLocation: [this.itemData.subLocation],
        assetStatus: [this.itemData.assetStatus],
        serialNo: [this.itemData.serialNo],
        poNo: [this.itemData.poNo],
        vendor: [this.itemData.vendor],
        price: [this.itemData.price],
        currency: [this.itemData.currency],
        conversionFactor: [this.itemData.conversionFactor],
        priceInr: [this.itemData.priceInr],
        bondNo: [this.itemData.bondNo],
        remarks: [this.itemData.remarks],
        categoryName: [this.itemData.categoryName],
        tags: [this.itemData.tags]
      })

      //  // zto disable form field 
      this.itemForm.controls['assetId'].disable();
      this.itemForm.controls['status'].disable();
      this.itemForm.controls['description'].disable();
      this.itemForm.controls['assetMake'].disable();
      this.itemForm.controls['assetModel'].disable();
      this.itemForm.controls['manufacturer'].disable();
      this.itemForm.controls['location'].disable();
      this.itemForm.controls['subLocation'].disable();
      this.itemForm.controls['assetStatus'].disable();
      this.itemForm.controls['serialNo'].disable();
      this.itemForm.controls['poNo'].disable();
      this.itemForm.controls['vendor'].disable();
      this.itemForm.controls['price'].disable();
      this.itemForm.controls['currency'].disable();
      this.itemForm.controls['conversionFactor'].disable();
      this.itemForm.controls['priceInr'].disable();
      this.itemForm.controls['bondNo'].disable();
      this.itemForm.controls['remarks'].disable();
      this.itemForm.controls['categoryName'].disable();
      this.itemForm.controls['tags'].disable();

      console.log(this.itemForm)
     })
         
    })
  }

  fillItemData(assetId:any){
     let url=environment.apiUrl+"/Item/getItemDetails/"+assetId;
     console.warn("url is : "+ url)
     this.http.get(url).subscribe((data:any)=>{
      console.log(data)
      this.itemData=data;
      alert("data loaded successfully, check console")
      console.log(this.itemData);
     })
  }
}
