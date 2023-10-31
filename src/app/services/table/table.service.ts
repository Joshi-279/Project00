import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/data-types/Item';
import { environment } from 'src/app/environments/environment';

export interface TableData{
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
  tags:null;};

export interface Table{
  content: TableData[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl=environment.apiUrl+'/Item/getAllItems';

  constructor(private http:HttpClient) { }

  getAllItems(pageNo:any,noOfItems:any): Observable<Item>{
     return this.http.get<Item>(this.apiUrl+"/"+pageNo+"/"+noOfItems);
  }

  getAllItemsBySearch(searchText:any,pageNo:any,noOfItems:any): Observable<Item>{
    const url=environment.apiUrl+"/Item/searchItems/"+pageNo+"/"+noOfItems+"?searchItem="+searchText;
    return this.http.get<Item>(url);
 }


 getTableData(pageNumber: number,pageSize: number): Observable<Table> {
  return this.http.get<Table>(environment.apiUrl+"/Item/getAllItems/"+pageNumber+"/"+pageSize);
}
getTableDataBySearch(page: number, pageSize: number, search:string): Observable<Table> {
  
  return this.http.get<any>(environment.apiUrl+"/Item/searchItems/"+page+"/"+pageSize+"?searchItem"+"="+search);
}

getFilteredData(filters: any,pageNumber: number, pageSize: number): Observable<any> {
  let requestBody = {
    filters: filters
  };
  return this.http.post<any>(environment.apiUrl+"/Item/search?searchText&pageNumber="+ pageNumber+"&pageSize="+pageSize,JSON.parse(JSON.stringify(requestBody.filters)));
}
}
/*export interface TableData{
  itemNo: number,
  assetId: string,
  status: string,
  description: string,
  assetMake: string,
  assetModel: string,
  manufacturer: string,
  location: string,
  subLocation: string,
  assetStatus: string,
  serialNo: string,
  poNo: number,
  vendor: string,
  price: number,
  currency: string,
  conversionFactor: number,
  priceInr: number,
  bondNo: string,
  tags: null,
  remarks: string,
  itemCategory: {
    itemCategoryId: number,
    category: string }};*/ 