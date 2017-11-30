import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../model/profile.interface';
/**
 * Generated class for the ProfileListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html',
})
export class ProfileListPage {


  Online: boolean;
  profileList: Observable<any[]>;
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.uid = this.navParams.get('uid');
    
    this.profileList = this.db.list('profiles').valueChanges();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileListPage');
  }

  selectProfile(profile:Profile){
    this.navCtrl.push('MessagePage', {"profile":profile});
  }


}
