import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, queset,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class StudentBulkService {

  url:any;
  constructor(private _http:HttpClient) {
    this.url=environment.API_URL+constraint.API_END_POINT.BULK_STUDENT_ADD;
   }

  Add_Bulk_STUDENTS(obj:any):Observable<APIResponse>
  {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this._http.post<APIResponse>(this.url,obj,{headers});
  }
}
