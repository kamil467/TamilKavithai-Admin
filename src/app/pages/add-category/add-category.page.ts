import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { KavithaiServiceService } from 'src/app/service/kavithai-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  name:string; // Tamil
  id:string; // english
  constructor(private loadingController:LoadingController,
    private kavithaiService:KavithaiServiceService,
    private alertController:AlertController) { }

  ngOnInit() {
  }

  async addCategory()
{
  const loading = await this.loadingController.create({
    spinner: "circles",
    message: 'adding '+this.name+" category into server.",
    translucent: true,
    cssClass: 'custom-class custom-loading',
    backdropDismiss: false
  });
  await loading.present();
await this.kavithaiService.createCategory(this.name, this.id).then(async (re)=>
{
 if(re == true)
 {
  await loading.dismiss();
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Success',
    subHeader: 'Add Category',
    message: this.name+" successfully created.",
    buttons: ['OK']
  });
this.name ='';
  await alert.present();  
 }
 else{
  await loading.dismiss();
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Add Category',
    message: this.name+" adding failed.Please try again later.",
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
    subHeader: 'Add Category',
    message: this.name+" adding failed.Please try again later.",
    buttons: ['OK']
  });

  await alert.present(); 
});
}

}
