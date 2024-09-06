import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { APIResponse, AssorLogin, examlist_assesor } from '../../models/API.Models';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class AssorExamListService {

  constructor(private _http:HttpClient) { }
getexamlist():Observable<APIResponse>
{
  return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ASSOR_EXAM_LIST,'');
}
}
