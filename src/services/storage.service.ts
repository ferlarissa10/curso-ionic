import { Cart } from './../models/cart';
import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
/* servico que retonar o usuario logado, e o guarda um uma variavel*/
@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        //pega o valor da chave storage
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        //testa se o localUser existe
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        //recebe o localUser e o armazena no local storage
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    //metodos para o carrinho ficar salvo
    getCart() : Cart{
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if(str != null){
            return JSON.parse(str)
        }else{
            return null
        }
    }

    setCart(obj : Cart){
        if(obj != null){
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
        }else{
            localStorage.removeItem(STORAGE_KEYS.cart)
        }
    }
}