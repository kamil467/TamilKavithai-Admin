import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AlertController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { adMob } from 'src/environments/environment';
import { category, Kavithai } from '../interface/kavithai';
import { KavithaiServiceService } from '../service/kavithai-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  signature:string ="#காதர்கவிதைகள்-Shared via- https://play.google.com/store/apps/details?id=com.kader.kavithaikal"
  category:Observable<category>;
  kavithaiList:Observable<Kavithai[]>

  constructor(private activatedRoute: ActivatedRoute,
    private kservice:KavithaiServiceService,
    public alert:AlertController,private socialSharing: SocialSharing,
    private adMob:AdMobPro,public popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.banner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = this.kservice.getCategoryById(this.folder);
    this.kavithaiList = this.kservice.getAllKavithaiByCatId(this.folder); // passing the cat id;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  banner() {
    let adId = adMob.banner;
    this.adMob.createBanner({
      adId: adId,
      autoShow:true
   //   isTesting: true // remove in production 
    })
      .then(() => {
        this.adMob.showBanner(this.adMob.AD_POSITION.BOTTOM_CENTER);
      })
      .catch( (err) => {
        //await this.presentAlert("");
      });
  }

  interstaAds()
  {
    let adId = adMob.interstitial;
    this.adMob.prepareInterstitial({adId: adId})
    .then(() => { this.adMob.showInterstitial(); });
  }


  async presentAlert(err:any) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Error Occurred',
      message: 'Please try again later.'+err,
      buttons: ['OK']
    });
    await alert.present();
  }

  shareWithFacebook(kav:Kavithai)
  {
    this.interstaAds();  // show ads
    const formattedContent = kav.content.replace(/<br>/g,"\n");
   // console.log(kav.content);
    //console.log(formattedContent);
    const title ="*"+kav.title+"*"+"\n";
    this.socialSharing.shareViaFacebookWithPasteMessageHint(title+formattedContent+this.signature,kav.imageURL,null,title+formattedContent+this.signature).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
  shareWithTwitter(kav:Kavithai)
  {
    this.interstaAds();  // show ads
    const formattedContent = kav.content.replace(/<br>/g,"\n");
    const title ="*"+kav.title+"*"+"\n";
    this.socialSharing.shareViaInstagram(title+formattedContent+this.signature,kav.imageURL).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
  shareWithOthers(kav:Kavithai)
  {
    this.interstaAds();  // show ads
    const formattedContent = kav.content.replace(/<br>/g,"\n");
    const title ="*"+kav.title+"*"+"\n";
  let options ={
    message:title+formattedContent+this.signature,
  }
  this.socialSharing.shareWithOptions(options).then((res) => {
    // Success
  }).catch((e) => {
    // Error!
  });
  }
  // works fine.
  shareWithWhatsapp(kav:Kavithai)
  {
    this.interstaAds();  // show ads
    const formattedContent = kav.content.replace(/<br>/g,"\n");
    const title ="*"+kav.title+"*"+"\n";
    this.socialSharing.shareViaWhatsApp(title+formattedContent+this.signature,kav.imageURL).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
}
