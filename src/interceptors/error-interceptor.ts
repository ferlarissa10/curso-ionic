import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from '../services/storage.service';

export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(public storage:StorageService){

    }

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

          switch(errorObj.status){
              case 403: 
              this.handle403();
              break;
          }          
          
          return Observable.throw(errorObj);
       }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null)
    }
}
//como o interceptor é instanciado, exigencias do angular
export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi: true
}