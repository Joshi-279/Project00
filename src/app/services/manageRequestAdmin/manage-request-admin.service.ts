import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageRequestAdminService {
id:any

  private url = environment.apiLocalhost+'/api/v1/getRequest/divyanshu.chauhan@gmail.com/true';//get api
  // private approveURL=environment.apiLocalhost+"/api/v1/"+id+"/true";
  private rejectURL=environment.apiLocalhost+'/api/v1/{id}/false';

  constructor(private http: HttpClient) {}
  
  getRequestdata(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  approveRequest(id: any): Observable<any> {
    // return this.http.put(`${this.approveURL}`, { requestId });
    const approveURL=environment.apiLocalhost+"/api/v1/"+id+"/true";

    // return this.http.put('this.approveURL',approveURL)
    return this.http.put(approveURL,{})
  }

  rejectRequest(id: any): Observable<any> {
    const rejectURL=environment.apiLocalhost+"/api/v1/"+id+"/false";

    return this.http.put(rejectURL, {});
  }

}
