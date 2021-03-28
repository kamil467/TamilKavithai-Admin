import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
 password:string;
 isLoggedIn:boolean;
 loggedInName:string;

 constructor(private angularFireAuth:AngularFireAuth, 
  private alertController:AlertController,
   private loadingController:LoadingController)
 {

 }
  ngOnInit(): void {
   this.angularFireAuth.authState.pipe(first()).subscribe(result =>{
     if(result)
     {
       this.isLoggedIn = true;
       this.loggedInName = result.email;
     }
   })
  }

  async login()
 {

  // put a progress loader
  const loading = await this.loadingController.create({
    spinner: "circles",
    message: 'Please wait while sigin in.....',
    translucent: true,
    cssClass: 'custom-class custom-loading',
    backdropDismiss: false
  });
  await loading.present();
  this.angularFireAuth.signInWithEmailAndPassword(this.email,this.password).then(async result =>{
    await loading.dismiss();
    if(result)
    {
      //success
      this.isLoggedIn = true;
      this.loggedInName = result.user.email;
    }
    else
    {
      // username or password incorrect.
      this.isLoggedIn = false;
     await  this.inValidLogin();
    }
  }).catch(async err =>{
    await loading.dismiss();
    this.isLoggedIn = false;
    await this.inValidLogin();
    console.error(err);
  })

 }
  async logOut()
{
  const loading = await this.loadingController.create({
    spinner: "circles",
    message: 'Logging out.....',
    translucent: true,
    cssClass: 'custom-class custom-loading',
    backdropDismiss: false
  });
  await loading.present();
  this.angularFireAuth.signOut().then(async ()=>{
    await loading.dismiss();
    console.log("successfully loggedout");
    this.isLoggedIn = false;
  }).catch(async err =>{
    await loading.dismiss();
  console.error("error occurred");
  })
}

 

async inValidLogin(message:string='') {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Authentication Failed',
    message: 'username or password is incorrect'+message,
    buttons: ['OK']
  });

  await alert.present();
}
async presentLogOutConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<strong>LogOut</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
         // do nothing.
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.logOut();
        }
      }
    ]
  });

  await alert.present();
}

}
