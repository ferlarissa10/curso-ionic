import { ProdutoDto } from './../../models/produto.dto';
import { ProdudoService } from './../../services/domain/produto.service';
import { CartItem } from './../../models/cart_item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public cartService: CartService,
    public produtoService: ProdudoService) {
  }

  ionViewDidLoad() {
    
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();

  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  } 
  removeItem(produto : ProdutoDto){
    this.items = this.cartService.removeProduto(produto).items;
  }
  increaseQuantity(produto : ProdutoDto){
    this.items = this.cartService.increaseQuantity(produto).items;
  }
  decreaseQuantity(produto : ProdutoDto){
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total():number{
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage')
  }


}
