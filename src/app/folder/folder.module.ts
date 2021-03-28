import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FolderPage } from './folder.page';
import { PopoverComponent } from '../components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    MatProgressBarModule
    
  ],
  declarations: [FolderPage,PopoverComponent]
})
export class FolderPageModule {}
