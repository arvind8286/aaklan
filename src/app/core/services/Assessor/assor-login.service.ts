import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { APIResponse, AssorLogin } from '../../models/API.Models';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class AssorLoginService {

  constructor(private _http:HttpClient) { }
AssessorLogin(obj:AssorLogin):Observable<APIResponse>
{
  return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ASSOR_LOGIN,obj);
}
}
