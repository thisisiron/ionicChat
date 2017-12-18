import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../model/profile.interface';
import { AngularFireAuth } from 'angularfire2/auth';
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
  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    
    this.profileList = this.db.list('profiles').valueChanges();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileListPage');
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  selectProfile(profile:Profile){
    this.navCtrl.push('MessagePage', {peer_uid: profile.key});
  }


}
