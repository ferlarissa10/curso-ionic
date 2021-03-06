import { ProdudoService } from './../services/domain/produto.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { ClienteService } from './../services/domain/cliente.service';
import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule} from '@angular/common/http'

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageService } from '../services/storage.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/image-util.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ImageUtilService,
    CartService,
    ProdudoService,
    AuthInterceptorProvider,
    ClienteService,
    StorageService,
    ErrorInterceptorProvider,
    AuthService,
    StatusBar,
    CategoriaService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
