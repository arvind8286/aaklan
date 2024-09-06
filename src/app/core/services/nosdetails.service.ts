import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, nosdetails } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class NOS_DETAILSService {
  perpage:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.perpage=this.perpage={

       "perpage":10,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.NOS;
   }
   getAllNOS_Details_pagewise(page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,{params} )
  }
  //NOSDETAILS crud function start
  getAllNOS_DETAILSList():Observable<APIResponse>
  {
   //debugger;

   //this.url=environment.API_URL+constraint.API_END_POINT.NOS_DETAILS+constraint.API_END_POINT.LIST;
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage);


  }
  getAllNOS_DETAILS(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
  }
  addNOS_DETAILS(obj:nosdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateNOS_DETAILS(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateNOS_DETAILS(id:nosdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateNOS_DETAILS(id:nosdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteNOS_DETAILS(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsNOS_DETAILS(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

