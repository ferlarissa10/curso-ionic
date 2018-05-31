import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/** Controller da view Home */
export class HomePage {

  constructor(public navCtrl: NavController,
              public menu: MenuController) {

  }

    ionViewWillEnter(){
      this.menu.swipeEnable(false);
    }
    ionViewDidLeave(){
      this.menu.swipeEnable(true);
    }


  login(){
    //empilha uma pagina emcima da outra
    //this.navCtrl.push('CategoriasPage')
    //abre uma nova pagina
    this.navCtrl.setRoot('CategoriasPage')
  }

}
