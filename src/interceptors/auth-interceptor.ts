import { Injectable } from '@angular/core';
import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler,
      HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(public storage : StorageService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length
        let requestToAPi = req.url.substring(0,N) == API_CONFIG.baseUrl;

        if(localUser && requestToAPi){
            const authReq = req.clone({
                //acrescentando o bearer ao clone da requisicao:
                headers: req.headers.set('Authorization', 'Bearer '+localUser.token)})
                return next.handle(authReq)
        }else{
            return next.handle(req) //continua a requisicao
        }
      
    }
}
//como o interceptor é instanciado, exigencias do angular
export const AuthInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
}