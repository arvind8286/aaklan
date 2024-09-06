import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, jobrole} from '../models/API.Models';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  url:any;
  listurl:any;
  constructor(private _http:HttpClient) {
    this.url=environment.API_URL+constraint.API_END_POINT.ADD_INSTRUCTION;
    this.listurl=environment.API_URL+constraint.API_END_POINT.LIST_INSTRUCTION;
   }

  ADD_instruct(obj:any)
  {
   return this._http.post<APIResponse>(this.url,obj);

  }
  List_instruct(obj:any)
  {
   return this._http.post<APIResponse>(this.listurl,obj);

  }
}
