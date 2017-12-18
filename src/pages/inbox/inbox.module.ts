import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxPage } from './inbox';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    InboxPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxPage),
    AngularFireAuthModule
  ],
})
export class InboxPageModule {}
