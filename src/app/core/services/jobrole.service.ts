import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, jobrole} from '../models/API.Models';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
@Injectable({
  providedIn: 'root'
})
export class JobroleService {
  perpage:any;
  perpages:any;
  url:any;
   constructor(private _http:HttpClient) {
  //    this.perpages={

  //      "perpage":100,
  //      "page":1

  //  }
   this.url=environment.API_URL+constraint.API_END_POINT.JOB_ROLE;
   }
   getAllJob_role_pagewise(page:number,size:number):Observable<APIResponse>
  {
    // let params = new HttpParams()
    // .set('page', page.toString())
    // .set('perpage', size.toString());
    this.perpage={

      "perpage":size,
      "page":page

  }

    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpages )
  }
  //jOBROLE crud function start
  getAllJOB_ROLEList():Observable<APIResponse>
  {
   //debugger;

   //this.url=environment.API_URL+constraint.API_END_POINT.JOB_ROLE+constraint.API_END_POINT.LIST;
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,'{}');


  }
  getAllJOB_ROLE(obj:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
  }
  addJOB_ROLE(obj:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateJOB_ROLE(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateJOB_ROLE(id:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateJOB_ROLE(id:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteJOB_ROLE(id:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsJOB_ROLE(id:jobrole):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //JOBROLE end


}
