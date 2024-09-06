import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, creteevidance,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class CreateEvidanceService {

  perpage:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.perpage=this.perpage={

       "perpage":10,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.CREATE_EVIDANCE;
   }

   getAllEvidance_pagewise(obj:any,page:number,size:number):Observable<APIResponse>
   {
     let params = new HttpParams()
     .set('page', page.toString())
     .set('perpage', size.toString());
     return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj,{params} )
   }
  getAllCREATEEVIDANCEList():Observable<APIResponse>
  {

   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage);


  }
  getAllCREATEEVIDANCE(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj)
  }
  addCREATEEVIDANCE(obj:creteevidance):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateCREATEEVIDANCE(obj:creteevidance):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateCREATEEVIDANCE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateCREATEEVIDANCE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteCREATEEVIDANCE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsCREATEEVIDANCE(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

