import { Injectable } from '@angular/core';
import { constraint } from '../constraint/Constraint';
import { APIResponse, scheme } from '../models/API.Models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  perpage:any;
  pagination:any;
 url:any;
  constructor(private _http:HttpClient) {

  this.url=environment.API_URL+constraint.API_END_POINT.SCHEME;
  }
 //scheme crud function start
 getAllScheme_pagewise(obj:any):Observable<APIResponse>
 {

  //  return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,{params} )
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj);
 }
 getAllSCHEMEList():Observable<APIResponse>
 {
  //debugger;

  //this.url=environment.API_URL+constraint.API_END_POINT.SCHEMES+constraint.API_END_POINT.LIST;
  return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,'{}');


 }
 getAllSCHEME(obj:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj )
 }
 addSCHEME(obj:scheme):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
 }
 updateSCHEME(obj:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
 }
 activateSCHEME(id:scheme):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
 }
 deactivateSCHEME(id:scheme):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
 }
 deleteSCHEME(id:any):Observable<APIResponse>
 {
   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
 }


 //scheme end
}
