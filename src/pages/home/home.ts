import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/** Controller da view Home */
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
    //empilha uma pagina emcima da outra
    //this.navCtrl.push('CategoriasPage')
    //abre uma nova pagina
    this.navCtrl.setRoot('CategoriasPage')
  }

}
