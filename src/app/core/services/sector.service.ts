import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, sector} from '../models/API.Models';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  perpage:any;
 url:any;
  constructor(private _http:HttpClient) {
    this.perpage=this.perpage={

      "perpage":10,
      "page":1

  }
  this.url=environment.API_URL+constraint.API_END_POINT.SECTORS;
  }
 //SECTOR crud function start

 getAllSECTORList():Observable<APIResponse>
 {
  //debugger;

  //this.url=environment.API_URL+constraint.API_END_POINT.SECTORS+constraint.API_END_POINT.LIST;
  return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,{});


 }
 getAllSector_pagewise(page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,{params} )
  }
 getAllSECTOR(obj:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
 }
 addSECTOR(obj:sector):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
 }
 updateSECTOR(obj:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
 }
 activateSECTOR(id:sector):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
 }
 deactivateSECTOR(id:sector):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
 }
 deleteSECTOR(id:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
 }


 //SECTOR end
}
