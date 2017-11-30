import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from './../../model/profile.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
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
  fromID: string,
  toID: string,
}

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {


  
  profile: Profile;
  myProfile: Profile;
  messageList: Observable<any[]>;
  myuid: string;
  content: string;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.profile = this.navParams.get('profile');
    this.myuid = this.afAuth.auth.currentUser.uid;
    this.db.object(`profiles/${this.myuid}`).valueChanges().subscribe((myPro:Profile)=>{this.myProfile = myPro});
  }

  ionViewWillLoad(){
    this.messageList = this.db.list(`messages-by-user/${this.myuid}/${this.profile.key}`).valueChanges().map( (msgs) => {
      console.log(msgs);
      msgs.map( (mkey:MessageKey) => {
        console.log(typeof(mkey));
            this.db.object(`/messages/${mkey.msgkey}`).valueChanges().subscribe( (x:ChatMessage)=> {
              console.log(x);
              mkey.content = x.content;
              mkey.fromID = x.fromID;
              mkey.toID = x.toID;
              this.db.object(`profiles/${x.fromID}`).valueChanges().subscribe( (y: Profile) => {
                  console.log(y);
                  mkey.name =  y.firstName+' '+y.lastName;
                });
            });
      });
      console.log(msgs);
      return msgs; 
    });


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  sendMsg(){
    
    let message = { fromID: this.myuid, toID: this.profile.key, content: this.content, when:new Date(), fromName: this.myProfile.firstName+" "+this.myProfile.lastName, toName: this.profile.firstName+" "+this.profile.lastName};
    let messageKey = this.db.list(`messages/`).push(message).key;
    this.db.list( `messages-by-user/${this.myuid}/${this.profile.key}` ).push({msgkey:messageKey});
    this.db.list( `messages-by-user/${this.profile.key}/${this.myuid}` ).push({msgkey:messageKey});
    this.content=""
  }


}
