import { API_CONFIG } from './../../config/api.config';
import { ProdudoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDto

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdudoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id')
    this.produtoService.findById(produto_id).subscribe(response =>{
      this.item = response;
      this.getImageUrlIfExists();
    }, error=>{})
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(reponse=>{
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    }, error =>{})
  }

}
