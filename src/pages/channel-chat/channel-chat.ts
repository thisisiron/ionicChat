import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Profile } from './../../model/profile.interface';
/**
 * Generated class for the ChannelChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: any;
  messageList: Observable<{content:string}[]>;
  content: string;
  uid: string;
  subscription: any;
  myProfile: Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase) {
    this.channel = this.navParams.get('channel');
    this.uid = this.navParams.get('uid');
    
    this.subscription = this.db.object(`profiles/${this.uid}`).valueChanges().subscribe((profile:Profile)=>{
      console.log(profile);
      this.myProfile = profile;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelChatPage');
    this.messageList = this.db.list(`channels/${this.channel.key}`).valueChanges();
  }

  send() {
    this.db.list(`channels/${this.channel.key}`).push({from:this.myProfile['firstName'], content: this.content});
    this.content = "";
  }

}
