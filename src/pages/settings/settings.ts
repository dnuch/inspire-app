import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  redditCategory: string;
  tweetCategory: string;
  tumblrCategory: string;
  redditOptions: Array<{ name: string, category: string }>;
  tweetOptions: Array<{ name: string, category: string }>;
  tumblrOptions: Array<{ name: string, category: string }>;

  userQuote: string;
  userName: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private menuCtrl: MenuController) {
    this.redditOptions = navParams.get('redditOptions');
    this.tweetOptions = navParams.get('tweetOptions');
    this.tumblrOptions = navParams.get('tumblrOptions');
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false);
    this.getDefaults();
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  getDefaults() {
    this.userQuote = localStorage.getItem('quote');
    this.userName = localStorage.getItem('username');
    this.redditCategory = localStorage.getItem('redditCategory');
    this.tweetCategory = localStorage.getItem('tweetCategory');
    this.tumblrCategory = localStorage.getItem('tumblrCategory');
  }

  saveDefaults() {
    localStorage.setItem('redditCategory', this.redditCategory);
    localStorage.setItem('tweetCategory', this.tweetCategory);
    localStorage.setItem('tumblrCategory', this.tumblrCategory);
    localStorage.setItem('quote', this.userQuote);
    localStorage.setItem('username', this.userName);
    this.navCtrl.pop();
  }
}
