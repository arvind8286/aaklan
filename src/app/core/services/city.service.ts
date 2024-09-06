import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, city} from '../models/API.Models';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _http:HttpClient) { }

  //CITY crud function start
  getAllCity_pagewise(obj:any,page:number,size:number):Observable<APIResponse>
  {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('perpage', size.toString());
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_LIST,obj,{params} )
  }
  getAllCITY(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_LIST,obj )
  }
  addCITY(obj:city):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_ADD,obj)
  }
  updateCITY(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_UPDATE,obj)
  }
  activateCITY(id:city):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_ACTIVATE,id)
  }
  deactivateCITY(id:city):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_DEACTIVATE,id)
  }
  deleteCITY(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ALL_CITY+constraint.API_END_POINT.CITY_DELETE,id)
  }


  //CITY end

}
