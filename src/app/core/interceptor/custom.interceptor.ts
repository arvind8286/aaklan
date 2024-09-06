import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  //debugger;
  const mytoken=localStorage.getItem("accessToken");
  const uid="eeakalan";
  const pwd="PTTEXGWV4ZBYKIT3JMXBEN3TDXK6WNRZY3UFOM7BPOBZNU";

  const cloneRequest=req.clone({
    setHeaders:{
      Authorization:`Bearer ${mytoken}`,
      xusername:uid,
      xpassword:pwd
    }
  })
  return next(cloneRequest);
};
