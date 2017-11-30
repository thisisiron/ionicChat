import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'kimiron518@gmail.com';
  password: string = '12341234';

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private tc:ToastController, private db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  nav2Register() {
    this.navCtrl.push('RegisterPage');
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
      this.db.object(`profiles/${result.uid}`).update( {isOnline: true });
      this.navCtrl.setRoot('TabsPage', {uid: result.uid, auth: this.afAuth});
    }
    catch(e) {
      this.tc.create( {
        message: e.message,
        duration: 3000
      }).present();
      console.log(e);
    }
  }
}
