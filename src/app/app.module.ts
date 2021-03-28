import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseConfig } from 'src/environments/environment';
import {MatDividerModule} from '@angular/material/divider';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,MatDividerModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AdMobPro,SocialSharing,FCM],
  bootstrap: [AppComponent],
})
export class AppModule {}
