import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private api =  environment.apiLocalhost+'/api/v1/saveRequest';
  private GetCategoryApi =
  environment.apiUrl+'/Item/getAllItemsCategory/0/25';
  private GetLocationApi = environment.apiRequestUrl+'/api/v1/getAllLocations';
  private GetAssetNameApi = environment.apiUrl+'/Item/list?page=0&size=10';

  constructor(private http: HttpClient) {}
  Sendmail(data: any): Observable<any> {
    var header = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    console.log(header);

    return this.http.post(`${this.api}`, data, { headers: header });
  }
  GetCategory(): Observable<any> {
    return this.http.get<any>(this.GetCategoryApi).pipe(retry(1),catchError(this.handleError));
  }

  private handleError(err:HttpErrorResponse):Observable<any>{
    let errMsg="";
    if(err.error instanceof Error){
      console.log(err.message);
      errMsg=err.message;
      
    }else{
    console.log('error',err.status);
    errMsg=err.message;
    }
    return throwError(()=>errMsg);
  }
  GetLocation(): Observable<any> {
    return this.http.get<any>(this.GetLocationApi);
  }
  GetAssetName(): Observable<any> {
   
    return this.http.get<any>(this.GetAssetNameApi);
  }
}
