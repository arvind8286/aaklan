import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, manageassessor,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class ManageassessorService {
  perpage:any;
  url:any;
  pagination:any;
   constructor(private _http:HttpClient) {
     this.pagination={

       "perpage":100,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.ASSESSOR;
   }
   getAllAssessor_pagewise(page:number,size:number):Observable<APIResponse>
  {
    // let params = new HttpParams()
    // .set('page', page.toString())
    // .set('perpage', size.toString());
    this.perpage={

      "perpage":size,
      "page":page

  }
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage)
  }
  getAllASSESSORList():Observable<APIResponse>
  {

   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.pagination);


  }
  getAllASSESSOR(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
  }
  addASSESSOR(obj:manageassessor):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateASSESSOR(obj:manageassessor):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateASSESSOR(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateASSESSOR(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteASSESSOR(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsASSESSOR(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

