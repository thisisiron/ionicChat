import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  channelList: Observable<any[]>;
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private db: AngularFireDatabase) {
    this.uid = this.navParams.data.uid;
  }

  ionViewDidLoad() {
    this.channelList = this.db.list('channel-names').valueChanges();
    console.log('ionViewDidLoad ChannelPage');
  }

  showAddChannelAlert() {
    this.alertCtrl.create( {
      title: 'Channel Name',
      inputs: [ { name: 'channelName', placeholder: 'Channel Name'}
      ],
      buttons: [
        { 
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => { this.addChannel(data.channelName) }
        }
      ]
    }).present();
  }

  addChannel( channelName ) {
    let key = this.db.list('channel-names').push({name: channelName}).key;
    this.db.object(`channel-names/${key}`).update({key: key});
  }

  selectChannel( channel ) {
    this.navCtrl.push('ChannelChatPage', {channel: channel, uid:this.uid });
  }
  remove(key:string) {
    console.log(`remove():key=${key}`);
  }


}
