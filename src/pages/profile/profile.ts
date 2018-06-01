import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDto } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDto;
  email: string;

  constructor(public navCtrl: NavController, public clienteService: ClienteService,
     public navParams: NavParams, public storage : StorageService) {
  }

  //Esse metodo é executado quando a pagina é carregada
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response =>{
        this.cliente = response;
        this.getImageIfExists();
      }, error =>{})
    }
  }
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    }, error=>{})
  }



}
