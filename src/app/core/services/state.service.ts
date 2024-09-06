import { Injectable } from '@angular/core';
import { constraint } from '../constraint/Constraint';
import { APIResponse, state } from '../models/API.Models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class STATEService {
perpage:any;
url:any;
  constructor(private _http:HttpClient) {
    this.perpage=this.perpage={

      "perpage":10,
      "page":1

  }
  this.url=environment.API_URL+constraint.API_END_POINT.All_STATE;
  }
  getAllstate_pagewise(obj:any,page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_LIST,obj,{params} )
  }
  //STATE crud function start
  getAllSTATE():Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_LIST,this.perpage )
  }
  getAllSTATEList(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_LIST,obj)
  }
  addSTATE(obj:state):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_ADD,obj)
  }
  updateSTATE(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_UPDATE,obj)
  }
  activateSTATE(id:state):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_ACTIVATE,id)
  }
  deactivateSTATE(id:state):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_DEACTIVATE,id)
  }
  deleteSTATE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.STATE_DELETE,id)
  }


  //STATE end
}
