import { API_CONFIG } from './../../config/api.config';
import { ProdudoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDto[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdudoService, 
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      });
    
   }

   loadImageUrls() {
      for (var i=0; i<this.items.length; i++) {
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          error => {});
      }
    } 

    showDetail(produto_id : string){
      this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id})
    }

    presentLoading(){
      let loader = this.loadingCtrl.create({
        content: "Aguarde..."
      })
      loader.present();
      return loader
    }



}
