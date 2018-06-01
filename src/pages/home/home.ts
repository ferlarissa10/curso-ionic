import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/** Controller da view Home */
export class HomePage {
  
  //para fazer o login:
  creds : CredenciaisDTO={
    email: "",
    senha:""
  }

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public auth : AuthService) {

  }

    ionViewWillEnter(){
      this.menu.swipeEnable(false);
    }
    ionViewDidLeave(){
      this.menu.swipeEnable(true);
    }

    ionViewDidEnter(){
    this.auth.refreshToken().subscribe(response=>{
      this.auth.sucessfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage')
    }, error=>{})
    }

  login(){

    this.auth.authenticate(this.creds).subscribe(response =>{
      console.log(response.headers.get('Authorization'));
      //metodo que vai armazenar os dados de usuario caso o login seja feito com sucesso:
      this.auth.sucessfullLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage')
    }, error =>{})

    //empilha uma pagina emcima da outra
    //this.navCtrl.push('CategoriasPage')
    //abre uma nova pagina
   
    console.log("Logiin:::")
    console.log(this.creds)
  }
  carregar(){
    this.creds.email="fernandalarissahtp@gmail.com"
  }

}
