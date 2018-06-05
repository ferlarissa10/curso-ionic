import { API_CONFIG } from './../../config/api.config';
import { ImageUtilService } from './../image-util.service';
import { StorageService } from './../storage.service';
import { ClienteDto } from './../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class ClienteService{

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService:ImageUtilService){}
    //sempre importar o Observable em rxJs/RX
    findByEmail(email:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`)
    }
    
    findById(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`)
    }


    getImageFromBucket(id:string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }
    insert(obj : ClienteDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture){
        //metodo que converte a imagem tirada pela camera, de base64 para blob, que é o 
        //tipo que passamos pelo post
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture)
        //instanciar um formData
        let formData : FormData = new FormData();
        //codigo para enviar a imagem por formData:
        formData.set('file', pictureBlob, 'file.png')
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, 
        formData,
            {
                observe:'response', 
                responseType:'text'
            })
    }


}