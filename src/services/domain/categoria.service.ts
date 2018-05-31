import { CategoriaDto } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
//para que essa classe seja um servico que possa ser injetado em outras classes:
@Injectable()
export class CategoriaService{

    constructor (public http : HttpClient){}

    findAll() : Observable<CategoriaDto[]>{
        return this.http.get<CategoriaDto[]>(`${API_CONFIG.baseUrl}/categorias`);    }
}