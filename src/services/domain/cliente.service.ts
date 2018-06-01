import { StorageService } from './../storage.service';
import { ClienteDto } from './../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){}
    //sempre importar o Observable em rxJs/RX
    findByEmail(email:string) : Observable<ClienteDto>{
        return this.http.get<ClienteDto>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`
        )}

    getImageFromBucket(id:string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }
}