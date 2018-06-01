import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{

    //classe instanciada que foi importada pelo agular2-jwt
    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http : HttpClient, public storage : StorageService){}

    authenticate(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
            creds, 
            {
                //para pegar o header da resposta
                observe: 'response',
                responseType: 'text'
            })
    }

    //caso aconteca um login de sucesso, recebe o Bearer token:
    sucessfullLogin(authorizationValue : string){

        //remove a palavra Bearer do token:
        let tok = authorizationValue.substring(7)
        let user :LocalUser = {
            token : tok,
            //metodo do jwt que retira o email direto do token
            email : this.jwtHelper.decodeToken(tok).sub
        }
        //setando o usuario para o service de local storage
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null)
    }

}