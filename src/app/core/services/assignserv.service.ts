import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { constraint } from '../constraint/Constraint';
import { Observable } from 'rxjs';
import { APIResponse, assigntest,  } from '../models/API.Models';

@Injectable({
  providedIn: 'root'
})
export class AssignservService {

  perpage:any;
  url:any;
   constructor(private _http:HttpClient) {
     this.perpage=this.perpage={

       "perpage":10,
       "page":1

   }
   this.url=environment.API_URL;
   }
  getAllASSIGN_TEST_List(obj:any):Observable<APIResponse>
  {

   return this._http.post<APIResponse>(environment.API_URL+constraint.API_END_POINT.ASSIGNTEST_LIST,obj);


  }
  // getAllBATCH(obj:any):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.LIST,obj)
  // }
  assignTest(obj:assigntest):Observable<APIResponse>
  {
    return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ASSIGNTEST,obj)
  }
  // updateBATCH(obj:batch):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.UPDATE,obj)
  // }
  // activateBATCH(id:any):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.ACTIVATE,id)
  // }
  // deactivateBATCH(id:any):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DEACTIVATE,id)
  // }
  // deleteBATCH(id:any):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DELETE,id)
  // }
  // detailsBATCH(id:any):Observable<APIResponse>
  // {
  //   return this._http.post<APIResponse>(this.url+constraint.API_END_POINT.DETAILS,id)
  // }


  //NOSDETAILS end


}


