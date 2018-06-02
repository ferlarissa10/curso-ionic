import { CidadeDto } from './../../models/cidade.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class CidadeService{

    constructor (public http : HttpClient){}

    findAll(estado_id: string) : Observable<CidadeDto[]>{
       return this.http.get<CidadeDto[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}