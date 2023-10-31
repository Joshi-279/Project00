import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/data-types/Item';
import { environment } from 'src/app/environments/environment';
import { Table } from '../table/table.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageService {

  private apiUrl = environment.apiUrl + '/Item/getAllItemsByCategory';

  constructor(private http: HttpClient) { }

  getAllCategoryItems(category: any, pageNo: any, noOfItems: any): Observable<Item> {
    return this.http.get<Item>(this.apiUrl + "/" + pageNo + "/" + noOfItems + "?categoryName=" + category);
  }

  getAllCategoryItemsBySearch(searchText: any, category: any, filters: any, pageNo: any, noOfItems: any): Observable<any> {

    const url = environment.apiUrl + "/Item/searchItemsbyCategoryWithFilters?searchText"+"="+searchText+"&pageNumber="+ pageNo+"&pageSize="+noOfItems+"&category="+category;
    return this.http.post<any>(url,filters);
  }

  getAllItemsBySearchCategory(page: number, pageSize: number, search:string, category:string): Observable<Table> {
    const filters: any[]=[];
    const url = environment.apiUrl + "/Item/searchItemsbyCategoryWithFilters?searchText"+"="+search+"&pageNumber="+ page+"&pageSize="+pageSize+"&category="+category;
    return this.http.post<any>(url,filters);


  }
}
