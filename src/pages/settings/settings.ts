import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
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
        this.getDefaults();
        menuCtrl.swipeEnable(false);
    }
    
    ionViewWillLeave() {
        this.menuCtrl.swipeEnable(true);
    }
    
    getDefaults() {
        this.userQuote = this.navParams.get('quote');
        this.userName = this.navParams.get('username');
        this.redditCategory = this.navParams.get('redditCategory');
        this.tweetCategory = this.navParams.get('tweetCategory');
        this.tumblrCategory = this.navParams.get('tumblrCategory');
        this.redditOptions = this.navParams.get('redditOptions');
        this.tweetOptions = this.navParams.get('tweetOptions');
        this.tumblrOptions = this.navParams.get('tumblrOptions');
    }
    
    saveDefaults() {
        this.navCtrl.pop();
        localStorage.setItem('redditCategory', this.redditCategory);
        localStorage.setItem('tweetCategory', this.tweetCategory);
        localStorage.setItem('tumblrCategory', this.tumblrCategory);
        localStorage.setItem('quote', this.userQuote);
        localStorage.setItem('username', this.userName);
    }
}
