import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    AngularFireAuthModule
  ],
})
export class MessagePageModule {}
