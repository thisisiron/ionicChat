import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileListPage } from './profile-list';

@NgModule({
  declarations: [
    ProfileListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileListPage),
  ],
})
export class ProfileListPageModule {}
