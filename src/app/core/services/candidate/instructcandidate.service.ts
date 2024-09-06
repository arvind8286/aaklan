import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { constraint } from '../../constraint/Constraint';
import { APIResponse } from '../../models/API.Models';


@Injectable({
  providedIn: 'root'
})
export class InstructcandidateService {

  url:any;
  // listurl:any;
  constructor(private _http:HttpClient) {
    this.url=environment.API_URL+constraint.API_END_POINT.INSTSTUD;
    // this.listurl=environment.API_URL+constraint.API_END_POINT.LIST_INSTRUCTION;
   }


  List_studinstruct()
  {
   return this._http.post<APIResponse>(this.url,'{}');

  }
}
