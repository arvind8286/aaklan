import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, question, queset,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class QuestionpaperService {
  perpage:any;
  pagination:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.pagination={

       "perpage":100,
       "page":1

   }
   this.url=environment.API_URL+constraint.API_END_POINT.QUESTION;
   }
   getAllQuestion_paper_pagewise(page:number,size:number):Observable<APIResponse>
  {
    // let params = new HttpParams()
    // .set('page', page.toString())
    // .set('perpage', size.toString());
    this.perpage={

      "perpage":size,
      "page":page

  }
    // return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,{params} )
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.perpage )
  }
  getAllQUESTIONList():Observable<APIResponse>
  {

   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,this.pagination);


  }
  getAllQUESTION(obj:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj)
  }
  addQUESTION(obj:question):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ADD,obj)
  }
  updateQUESTION(obj:question):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  }
  activateQUESTION(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  }
  deactivateQUESTION(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  }
  deleteQUESTION(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  }
  detailsQUESTION(id:any):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  }


  //NOSDETAILS end


}

