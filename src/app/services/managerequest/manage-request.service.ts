import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageRequestService {
  


  private api = environment.apiLocalhost+'/api/v1/getRequest/divyanshu.chauhan@gmail.com/false'; //for my request
// requestId:any
  // private deleteapi = environment.apiRequestUrl+"/api/v1/"+this.requestId+"/delete"; //delete request

  constructor(private http: HttpClient) {}
  getRequest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`);
  }

  DeleteRequest(id: any): Observable<any> {
    // this.requestId= id;
    const deleteapi = environment.apiLocalhost+"/api/v1/"+id+"/delete"

    return this.http.delete(deleteapi);

  }

}

