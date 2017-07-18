import { Component, ViewChild } from '@angular/core';

import { Events, AlertController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RedditService } from './services/reddit.service';
import { ObjectService } from './services/object.service';
import { TumblrService } from './services/tumblr.service';
import { TwitterProvider } from './services/twitter.service';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
@Component({
    templateUrl: 'app.html',
    providers: [
        RedditService, 
        ObjectService, 
        TumblrService,
        TwitterProvider
    ]
})
export class MyApp {
    
    @ViewChild('nav') navCtrl: any = NavController;
    
    rootPage: any = TabsPage;
    redditCategory: string;
    tweetCategory: string;
    tumblrCategory: string;
    userQuote: string;
    userName: string;
    
    constructor(private events: Events, private alertCtrl: AlertController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        
        if(localStorage.getItem('redditCategory') != null) {
            this.redditCategory = localStorage.getItem('redditCategory');
        } else {
            this.redditCategory = 'LifeProTips';
        }
        
        if(localStorage.getItem('tweetCategory') != null) {
            this.tweetCategory = localStorage.getItem('tweetCategory');
        } else {
            this.tweetCategory = 'UpliftingQuotes';
        }
        
        if(localStorage.getItem('tumblrCategory') != null) {
            this.tumblrCategory = localStorage.getItem('tumblrCategory');
        } else {
            this.tumblrCategory = 'quotemadness';
        }
        
        if(localStorage.getItem('quote') != null) {
            this.userQuote = localStorage.getItem('quote');
        } else {
            this.userQuote = 'The world is your oyster.';
        }
        
        if(localStorage.getItem('username') != null) {
            this.userName = localStorage.getItem('username');
        } else {
            this.userName = 'William Shakespeare';
        }
        
        //this.presentQuote();
    }
    
    presentQuote() {
        let alert = this.alertCtrl.create({
            title: this.userQuote,
            subTitle: '<br>— '+this.userName
        });
        alert.present();
    }
    
    changeCategory(menuClicked: string, menuCategory: string) {
        this.events.publish(menuClicked, menuCategory);
    }
    
    viewSettings() {
        this.navCtrl.push(SettingsPage, {
            quote: this.userQuote,
            username: this.userName,
            redditCategory: this.redditCategory,
            tweetCategory: this.tweetCategory,
            tumblrCategory: this.tumblrCategory
        });
    }
    
    viewAbout() {
        this.navCtrl.push(AboutPage);
    }
}
