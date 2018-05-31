import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler,
     HttpSentEvent, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";

export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(req) //continua a requisicao
       .catch((error, caught) =>{
           
          let errorObj = error;

          if(errorObj.error){
              errorObj = errorObj.error;
          }

          if(!errorObj.status){
            errorObj = JSON.parse(errorObj);
          }
          console.log("Erro no interceptor::::")
          console.log(errorObj)
          return Observable.throw(errorObj);
       }) as any;
    }
}
//como o interceptor é instanciado, exigencias do angular
export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi: true
}