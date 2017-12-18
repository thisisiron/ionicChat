import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface DBMessage {
  content: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
}


interface Peer{
  msgkey: string;
  unread: number;
  content: string;
  name: string;
  id: string;
}


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  myid: string;
  messageList: Observable<Peer[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.myid = this.afAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
    console.log(this.myid)

    this.messageList = this.db.list(`lastMessage/${this.myid}`).valueChanges().map((msgs: Peer[])=>{
      msgs.map((peer:Peer)=>{
        this.db.object(`/message/${peer.msgkey}`).valueChanges().subscribe((DBmsg:DBMessage)=>{
          peer.content = DBmsg.content;
          peer.name = (DBmsg.fromId == this.myid) ? DBmsg.toName : DBmsg.fromName;
          peer.id = (DBmsg.fromId == this.myid) ? DBmsg.toId : DBmsg.fromId;
        });
      });
      console.log(msgs);
      return msgs;
    });
  }

  nav2Profiles() {
    this.navCtrl.push('ProfileListPage');
  }

  selectPerson(msg) {
    this.navCtrl.push('MessagePage', {peer_uid: msg.id});
  }
  
}
