import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDto } from '../../models/cliente.dto';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {


  items: EnderecoDTO[];
  cliente: ClienteDto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService, 
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response =>{
        
        this.items = response['enderecos']
      
      }, error =>{
        if(error.status ==403){
          this.navCtrl.setRoot('HomePage')
        }
      })
    } else{
      this.navCtrl.setRoot('HomePage')
    }
  }

}
