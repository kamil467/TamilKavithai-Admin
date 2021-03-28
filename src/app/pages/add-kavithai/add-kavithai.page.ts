import { I18nPluralPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { category, Kavithai } from 'src/app/interface/kavithai';
import { KavithaiServiceService } from 'src/app/service/kavithai-service.service';
import { defaultImage } from 'src/environments/environment';

@Component({
  selector: 'app-add-kavithai',
  templateUrl: './add-kavithai.page.html',
  styleUrls: ['./add-kavithai.page.scss'],
})
export class AddKavithaiPage implements OnInit {

  title:string;
  content:string;
  category:string;
  categoryList:Observable<category[]>;
  constructor(private kService:KavithaiServiceService,
    private loadingController:LoadingController,
    private alertController:AlertController) { }

  ngOnInit() {
 this.categoryList = this.kService.getAllCategories();
  }
  async addNewKavithai(newKavForm:any)
  {
    const loading = await this.loadingController.create({
      spinner: "circles",
      message: 'adding Kavithai to server.',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();
  // build a kavithai model.
  const kav:Kavithai ={
    category:this.category,
    content:this.content,
    headerTextColor:"purple",
    title:this.title,
    imageURL:defaultImage,
    textColor:"purple",
    id:null
  }

  this.kService.createNewKavithai(kav).then(async (re)=>
  {
    if(re == true)
 {
  await loading.dismiss();
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Success',
    subHeader: 'Add Kavithai',
    message: "Kavithai successfully created.",
    buttons: ['OK']
  });

  await alert.present();  
  newKavForm.resetForm(); // resetting the fomr
 }
 else{
  await loading.dismiss();
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Add Kavithai',
    message: "adding failed.Please try again later.",
    buttons: ['OK']
  });

  await alert.present(); 
 }
  }).catch(async ()=>
  {
    await loading.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Add Kavithai',
      message: "adding failed.Please try again later.",
      buttons: ['OK']
    });
  
    await alert.present(); 
  })


  }

}
