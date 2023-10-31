import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private http: HttpClient) { }
  
  submitForm(formData: any): any {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'text/plain');
    return this.http.post(environment.apiUrl+'/Item/add-item', formData,{
      headers: headers,
      responseType: 'text'
    })
  }

    //  to upload the file
    uploadFile(file: File): any {
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      const headers = new HttpHeaders()
      .set('Accept', 'text/plain');

      return this.http.post(environment.apiUrl+"/Item/import", formData,{
        headers: headers,
        responseType: 'text'
  
      });
    }

}
