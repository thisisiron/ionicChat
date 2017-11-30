import { MESSAGE_LIST } from './../../mockup/messages';
import { Message } from './../../model/message.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  email: string;
  password: string;
  messageList: Message[] = MESSAGE_LIST;
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
    this.uid = this.navParams.data.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

  nav2Profiles() {
    this.navCtrl.push('ProfileListPage', {uid:this.uid});
  }

  
}
