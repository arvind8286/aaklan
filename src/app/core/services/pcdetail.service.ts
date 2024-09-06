import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, pcdetails,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class PcdetailService {
  perpage:any;
  perpages:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.perpages={

       "perpage":100,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.PC_DETAILS;
   }
   getAllPC_pagewise(page:number,size:number):Observable<APIResponse>
  {
    // let params = new HttpParams()
    // .set('page', page.toString())
    // .set('perpage', size.toString());
    this.perpage={

      "perpage":size,
      "page":page

  }
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage )
  }
  //PCWISE crud function start
  getAllPCDETAILSList():Observable<APIResponse>
  {
   //debugger;

   //this.url=environment.API_URL+constraint.API_END_POINT.PCDETAILS+constraint.API_END_POINT.LIST;
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpages);


  }
  getAllPCDETAILS(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
  }
  addPCDETAILS(obj:pcdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updatePCDETAILS(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activatePCDETAILS(id:pcdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivatePCDETAILS(id:pcdetails):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deletePCDETAILS(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsPCDETAILS(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

