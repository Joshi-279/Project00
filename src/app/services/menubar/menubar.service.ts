import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemCategory } from 'src/app/data-types/itemCategory';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MenubarService {

  private apiUrl=environment.apiUrl+'/Item/getAllItemsCategory';

  constructor(private http:HttpClient) { }

  getAllItemsCategory(pageNo:any,noOfItems:any): Observable<itemCategory>{
     return this.http.get<itemCategory>(this.apiUrl+"/"+pageNo+"/"+noOfItems);
  }
}
