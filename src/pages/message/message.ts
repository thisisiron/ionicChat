import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from './../../model/profile.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



interface ChatMessage {
  fromID: string,
  toID: string,
  content: string
}

interface MessageKey {
  msgkey: string,
  content: string,
  name: string,
  when: string,
  id: string,
}

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  queries: { xxx: new ViewChild('content') }
})
export class MessagePage {


  
  profile: Profile;
  myProfile: Profile;
  messageList: Observable<any[]>;
  myuid: string;
  peerid: string;
  content_: string;
  msglist: Subscription;
  peername: string;
  myname: string;



  @ViewChild('content') cnt: any;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.peerid = this.navParams.get('peer_uid');
    this.myuid = this.afAuth.auth.currentUser.uid;
    

    this.db.object(`profiles/${this.peerid}`).valueChanges().subscribe(
      (x: Profile ) => this.peername = `${x.firstName}`
    );


    this.db.object(`profiles/${this.myuid}`).valueChanges().subscribe(
      (x: Profile) => this.myname = `${x.firstName}`
     );

  }

  ionViewWillLoad(){
    console.log(this.peerid)

    this.messageList = this.db.list(`messages-by-user/${this.myuid}/${this.peerid}`).valueChanges().map( (msgs) => {
      console.log(msgs);
      msgs.map( (mkey:MessageKey) => {
        console.log(typeof(mkey));
            this.db.object(`/messages/${mkey.msgkey}`).valueChanges().subscribe( (x:{content: string, fromName: string, when: string, fromID: string})=> {
              console.log(x);
              mkey.content = x.content;
              mkey.id = x.fromID;
              mkey.name = x.fromName;
              mkey.when = x.when;
            });
      });
      console.log(msgs);
      return msgs; 
    });

    this.msglist = this.db.list(`messages-by-user/${this.myuid}/${this.peerid}`).valueChanges().subscribe(
      (x) => {
        this.db.object(`last-messages/${this.myuid}/${this.peerid}`).update({unread: 0});
        if(this.cnt) this.cnt.scrollToBottom(0);    
      }
    );


  }


  ionViewWillUnload() {
    this.msglist.unsubscribe();
  }


  getTimeNow() : string {
    let d = new Date();
    return `${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }


  async sendMsg(){
    
    let message = { fromID: this.myuid, toID: this.peerid, content: this.content_, when: this.getTimeNow(), fromName: this.myname,  toName: this.peername};
    let messageKey = await this.db.list(`messages/`).push(message).key;


    this.db.database.ref(`last-messages/${this.peerid}/${this.myuid}`).transaction(function(msg) { 
        return {msgkey: messageKey, unread: (msg ? msg.unread+1: 0)}; 
      }
    );
    this.db.object(`last-messages/${this.myuid}/${this.peerid}`).set(
      {msgkey: messageKey, unread: 0}
    );

    await this.db.list( `messages-by-user/${this.myuid}/${this.peerid}` ).push({msgkey:messageKey});
    await this.db.list( `messages-by-user/${this.peerid}/${this.myuid}` ).push({msgkey:messageKey});

    if(this.cnt) this.cnt.scrollToBottom(0);   

    this.content_=""
  }


}
