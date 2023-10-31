import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/data-types/Item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http:HttpClient) { }

  getItems() : Observable<Item[]>{
     return this.http.get<Item[]>("uri");
  }
}
