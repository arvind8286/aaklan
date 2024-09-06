import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIResponse, country } from '../models/API.Models';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class CountrydataService {
  url:any;
  perpage:any;
  constructor(private _http:HttpClient) {

  this.url=environment.API_URL+constraint.API_END_POINT.ALL_COUNTRY;
}
  //country crud function start
  getAllcountry():Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_LIST,'' )
  }
  getAllcountry_pagewise(page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_LIST,{params} )
  }
  getAllcountryList():Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_LIST,'');
  }
  addcountry(obj:country):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_ADD,obj)
  }
  updatecountry(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_UPDATE,obj)
  }
  activatecountry(id:country):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_ACTIVATE,id)
  }
  deactivatecountry(id:country):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_DEACTIVATE,id)
  }
  deletecountry(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.COUNTRY_DELETE,id)
  }


  //country end
}
