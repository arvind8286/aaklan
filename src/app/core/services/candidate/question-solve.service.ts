import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { APIResponse} from '../../models/API.Models';
import { constraint } from '../../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class QuestionSolveService {

  url:any;
  constructor(private _http:HttpClient) {
    this.url=environment.API_URL+constraint.API_END_POINT.STUDENT;
   }

  submitAnswer(ans:any)
  {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.QUESTION_SOLVE,ans);

  }
}
