import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/data-types/Item';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table/table.service';
import { MatSelectChange } from '@angular/material/select';


export interface TableData {
    assetId: string;
    status: string;
    description: string;
    assetMake: string;
    assetModel: string;
    manufacturer: string;
    location: string;
    subLocation: string;
    assetStatus: string;
    serialNo: string;
    poNo: number;
    vendor: string;
    price: number;
    currency: string;
    conversionFactor: number;
    priceInr: number;
    bondNo: string;
    remarks: string;
    categoryName: string;
    tags:null;
};

interface Filter {
  columnName: string;
  values: string[];
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {



  displayedColumns: string[] = ['asset_id', 'description', 'asset_make', 'location', 'po_no', 'vendor', 'price', 'remarks'];
  dataSource!: MatTableDataSource<TableData>;
  totalElements!: number;
  size: any;
  search: string = '';
  totalPages: any;
  locationOption = ['JAIPURSEZUN1', 'Indore', 'Pune', 'Chennai', 'Nagpur']
  assetMakeOption = ['EXTRON', 'SAMSUNG', 'MULTEE PRO INDIA', 'CRESTRON']
  vendorOption = ['MULTEE PRO INDIA', 'MOS WORLD SOUTH EAST ASIA PTE LTD']
  filterValues: any = {};
  public length = 0;
  currentpage = 0;
  pageSize = 10;

  constructor(private dataItem: TableService, private router: Router) {
    this.dataSource = new MatTableDataSource<TableData>;
  }

  isLoading = false;

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit() {

    this.getITems();
  }

  pageEvent(event: any) {
    console.log(event);
    this.currentpage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    if(this.search!="" && this.searching==true){
      this.getBySearch();
      console.log("gitItems");
    } else if(this.searching==true && this.search==""){
      console.log("gitItems");
      this.applyFilters01();
    }else{
      console.log("gitBySearch")
      this.getITems();
    }
  }
    
  getDataItem(): TableService {
    return this.dataItem;
  }


  getITems(): void {
    this.searching=false;
    this.dataItem.getTableData(this.currentpage, this.pageSize).subscribe((data: any) => {
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.size = data.size;
      this.dataSource.data = data['content']
      console.log(this.dataSource);

    });
/*subscribe({
      next:(res) => {
        this.Location = res;
        // console.log('', res);
      },
     error: (err) => {
        console.log('', err);
      }
  });*/ 
  }

  searching=false;
  getBySearch(): void {
    this.searching=true;
    const pageSize = this.pageSize;
    const search = this.search;
    setTimeout(() => {


      this.dataItem
        .getTableDataBySearch(this.currentpage, pageSize, search)
        .subscribe((data) => {
          console.log(data);
          this.dataSource.data = data['content'];
          this.totalElements = data.totalElements;
          // this.paginator.length = data['totalElements'];
        });


    }, 3000);
  }

  filters: Filter[] = [];

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



  applyFilters01() {
    this.filters=[];
    this.searching=true;
    for (let columnName in this.filterValues) {
      const values = this.filterValues[columnName];
      this.addFilter(columnName, values);
    }
    console.log(this.filters)
    const page = this.currentpage;
    const pageSize = this.pageSize;
    this.dataItem.getFilteredData(this.filters, page, pageSize).subscribe(data => {
      console.log(data);
      this.dataSource.data = data['content'];

      this.paginator.length = data['totalElements'];


    });
  }
  getRowDetail(asset_id: any) {

    console.log("You click a row");
    console.log(asset_id);
    this.router.navigate(['/tableItemDetails', asset_id])
  }


resetLocationFilter='';
resetAssetMakeFilter='';
resetVendorFilter='';

clearFilters(){
  this.filters=[];
  this.resetLocationFilter=''
 this.resetAssetMakeFilter='';
 this.resetVendorFilter='';
 this.filterValues={};
 this.search='';
  this.currentpage = 0;
  const pageSize = this.pageSize;
  this.dataItem.getFilteredData(this.filters, this.currentpage, pageSize).subscribe(data => {
    this.dataSource.data = data['content'];

    this.paginator.length = data['totalElements'];
  });
  
}


}