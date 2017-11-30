import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1page = 'InboxPage';
  tab2page = 'ChannelPage';
  tab3page = 'ProfilePage';

  tabparams: NavParams;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabparams = navParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
