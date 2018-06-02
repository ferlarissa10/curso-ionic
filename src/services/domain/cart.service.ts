import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../../models/produto.dto';

@Injectable()
export class CartService{
    constructor(public storage : StorageService){  
    }

    createOrClearCart(): Cart{
        let cart: Cart = {items:[]}
        this.storage.setCart(cart)
        return cart
    }


    getCart(): Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart
    }

    addProduto(produto : ProdutoDto):Cart{
        let cart = this.getCart();
        //findIndex condicao para encontrar determinado elemento; no caso um produto que tenha 
        //a mesma posicao que o produto que queremos inserir
        let position = cart.items.findIndex(x=> x.produto.id == produto.id);
        //se esse item nao existir no carrinho ele é inserido.
        if(position == -1){
            cart.items.push({quantidade:1, produto: produto})
        }
        //carrega o storage com o carrinho atualizado
        this.storage.setCart(cart)
        return cart;
    }
}