import { ProdutoDto } from './../../models/produto.dto';
import { Observable } from 'rxjs/Observable';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ProdudoService{
    constructor(public http: HttpClient){

    }


    findById(produto_id : string){
        return this.http.get<ProdutoDto>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`)
    }

    findByCategoria(categoria_id:string, page: number =0, linesPerPage:number = 24){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`)
    }

    /*findByCategoria(categoria_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`)
    }*/
      getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }  

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }  
}