import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { APIResponse, AssorLogin, examlist_assesor } from '../../models/API.Models';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class ExamstudentListService {

  constructor(private _http:HttpClient) { }
  getexamStudentlist(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.EXAM_STD_LIST,obj);
  }
  addattendance(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.STD_ATTENDANCE,obj);

  }
}
