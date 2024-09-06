import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { APIResponse, stdlogin } from '../../models/API.Models';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class StudentLoginService {
constructor(private _http:HttpClient) { }
studentLogin(obj:stdlogin):Observable<APIResponse>
{
  return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.STUDENT+constraint.API_END_POINT.LOGIN,obj);
}

}
