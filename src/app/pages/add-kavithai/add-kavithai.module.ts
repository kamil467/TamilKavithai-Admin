import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKavithaiPageRoutingModule } from './add-kavithai-routing.module';

import { AddKavithaiPage } from './add-kavithai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKavithaiPageRoutingModule
  ],
  declarations: [AddKavithaiPage]
})
export class AddKavithaiPageModule {}
