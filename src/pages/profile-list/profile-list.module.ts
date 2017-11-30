import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileListPage } from './profile-list';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    ProfileListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileListPage),
    AngularFireAuthModule
  ],
})
export class ProfileListPageModule {}
