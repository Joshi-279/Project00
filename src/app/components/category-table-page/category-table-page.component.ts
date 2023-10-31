import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryPageService } from 'src/app/services/category/category-page.service';

interface Filter {
  columnName: string;
  values: string[];
}

@Component({
  selector: 'app-category-table-page',
  templateUrl: './category-table-page.component.html',
  styleUrls: ['./category-table-page.component.css']
})
export class CategoryTablePageComponent {
  category!: string;

  public length = 0; currentpage = 0;

  pageSize = 12; pageSizeOptions: number[] = [8, 12, 16, 20, 50];

  displayedColumns: string[] = ["assetId", "vendor", "assetMake", "assetModel", "manufacturer", "location", "priceInr", "remarks"];
  dataSource = new MatTableDataSource([]);;
  oldpageNo: number = 0
  pageNo: number = 0;
  noOfItems: number = 10;
  totalNoOfPages: number = 0;
  totalElements: number = 0;


  constructor(private categoryTableService: CategoryPageService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
    })
    this.getAllProducts(this.category, this.currentpage, this.pageSize)
  }

  ngAfterViewInit() {
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {

    if (setPageSizeOptionsInput) {

      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

    }

  }

  pageEvent(event: any) {

    console.log(event)

    this.currentpage = event.pageIndex + 1;

    this.pageSize = event.pageSize;

    this.setpageparamaters(event.pageIndex, this.pageSize)

    // this.gridApi.showLoadingOverlay();
    if(this.searchText=="" && this.searching==false){
      this.getAllProducts(this.category, event.pageIndex, this.pageSize)
    }else{
      this.searchAllProducts();
    }








  }


  setpageparamaters(currentpage: any, pageSize: any) {
    this.currentpage = currentpage;
    this.pageSize = pageSize;
  }

  //  TO GET ALL THE PRODUCTS OF THE CATEGORY IN A TABLE
  getAllProducts(category: any, currentpage: any, pageSize: any) {
    this.searching=false;
    this.categoryTableService.getAllCategoryItems(category, currentpage, pageSize).subscribe((res: any) => {
      console.log(res['content'])

      this.length = res['totalElements'];
      this.dataSource.data = (res['content']);  // cardData
      console.log(this.dataSource)
      console.log(this.dataSource)
      this.totalNoOfPages = res['totalPages'];

    })
    this.router.navigate(['/home'], { queryParams: { reload: true } });
  }

  // TO GET ALL THE PRODUCTS OF THE SEARCH OF THAT PARTICULAR CATEGORY
  filters: Filter[] = [];
  searchText = "";
  searching=false;
  searchAllProducts() {
    this.searching=true;
    console.log(this.searchText)
    this.categoryTableService.getAllItemsBySearchCategory(this.currentpage, this.pageSize, this.searchText.trim(), this.category).subscribe((res: any) => {
      console.log(res['content'])

      this.length = res['totalElements'];
      this.dataSource.data = (res['content']);  // cardData
      console.log(this.dataSource)
      this.totalNoOfPages = res['totalPages'];

      this.totalElements = res['totalElements'];
    })
  }

  isEven(row: any) {
    console.log(row)
    return true;
  }

  handleClick(row: any) {
    // to check the row data
    console.log(row);
    this.router.navigate(['/tableItemDetails', row.assetId])


  }


  filterValues: any = {};
  applyFilter(event: MatSelectChange, columnName: string): void {
    this.filterValues[columnName] = event.value;
    console.log(this.filterValues);

  }

  addFilter(columnName: string, selectedValues: string[]): void {
    let existingFilter = this.filters.find(filter => filter.columnName === columnName);



    if (existingFilter) {
      existingFilter.values.push(...selectedValues);
    } else {
      const newFilter: Filter = {
        columnName,
        values: selectedValues
      };
      this.filters.push(newFilter);
    }
  }


  locationOption = ['JAIPURSEZUN1', 'Indore', 'Pune', 'Chennai', 'Nagpur']
  assetMakeOption = ['EXTRON', 'SAMSUNG', 'MULTEE PRO INDIA', 'CRESTRON']
  vendorOption = ['MULTEE PRO INDIA', 'MOS WORLD SOUTH EAST ASIA PTE LTD']

  applyFilters01() {
    for (let columnName in this.filterValues) {
      const values = this.filterValues[columnName];
      this.addFilter(columnName, values);
    }
    console.log(this.filters)
    this.categoryTableService.getAllCategoryItemsBySearch(this.searchText.trim(), this.category, this.filters, this.currentpage, this.pageSize).subscribe((res: any) => {
      console.log(res['content'])

      this.length = res['totalElements'];
      this.dataSource.data = (res['content']);  // cardData
      console.log(this.dataSource)
      this.totalNoOfPages = res['totalPages'];

      this.totalElements = res['totalElements'];
    })
  }


  resetLocationFilter='';
  resetAssetMakeFilter='';
  resetVendorFilter='';

  clearFilters(){
    this.filters=[];
    this.resetLocationFilter=''
   this.resetAssetMakeFilter='';
   this.resetVendorFilter='';
    const page = 0;
    const pageSize = this.pageSize;
    this.categoryTableService.getAllCategoryItemsBySearch(this.searchText.trim(), this.category, this.filters, this.currentpage, this.pageSize).subscribe((res: any) => {
      console.log(res['content'])

      this.length = res['totalElements'];
      this.dataSource.data = (res['content']);  // cardData
      console.log(this.dataSource)
      this.totalNoOfPages = res['totalPages'];

      this.totalElements = res['totalElements'];
    });
  }
}
