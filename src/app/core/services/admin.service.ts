import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constraint } from '../constraint/Constraint';

import { Observable } from 'rxjs';
import { APIResponse, Loginmodel } from '../models/API.Models';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }
  //country crud function start
   loginadmin(obj:Loginmodel):Observable<APIResponse>
  {

    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.LOGIN,obj);

  }

  //country end
}
