import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Storage } from '@ionic/storage-angular';
import { HomePageRoutingModule } from './home-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    Storage, // Agrega Storage a la lista de providers
    InAppBrowser // Agrega InAppBrowser a la lista de providers
  ]
})
export class HomePageModule {}
