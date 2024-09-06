import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, uploadfiles } from '../../models/API.Models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class StdReportYearService {

  constructor(private _http:HttpClient) { }
  student_year_wise_report():Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.STUDENT_YEAR_WISE,'');
  }
}
