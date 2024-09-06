import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, students, queset,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  perpage:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.perpage=this.perpage={

       "perpage":10,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.STUDENT;
   }
   getAllCndidate_pagewise(obj:any,page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj,{params} )
  }
  getAllCANDIDATEList():Observable<APIResponse>
  {

   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage);

  }
  getAllCANDIDATE(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj)
  }
  addCANDIDATE(obj:students):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateCANDIDATE(obj:students):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateCANDIDATE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateCANDIDATE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteCANDIDATE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsCANDIDATE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}


