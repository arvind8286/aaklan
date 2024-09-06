import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, managetp,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class ManagetpService {
  perpage:any;
  pagination:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.pagination={

       "perpage":200,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.TRAINING_PARTNER;
   }
   getAllTP_pagewise(page:number,size:number):Observable<APIResponse>
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
  getAllTPList():Observable<APIResponse>
  {

   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.pagination);


  }
  getAllTP(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
  }
  addTP(obj:managetp):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateTP(obj:managetp):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateTP(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateTP(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteTP(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsTP(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

