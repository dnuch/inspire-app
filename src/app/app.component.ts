import { Component, ViewChild } from '@angular/core';
import { Events, AlertController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RedditService } from './services/reddit.service';
import { ObjectService } from './services/object.service';
import { TumblrService } from './services/tumblr.service';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
@Component({
    templateUrl: 'app.html',
    providers: [
        RedditService, 
        ObjectService, 
        TumblrService
    ]
})
export class MyApp {
    
    @ViewChild('nav') navCtrl: any = NavController;
    
    rootPage: any = TabsPage;
    redditCategory: string;
    tweetCategory: string;
    tumblrCategory: string;
    userQuote: string;
    
    constructor(public events: Events, public alertCtrl: AlertController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        
        if(localStorage.getItem('category') != null) {
            this.redditCategory = localStorage.getItem('category');
        } else {
            this.redditCategory = 'LifeProTips';
        }
        
        if(localStorage.getItem('tweetPage') != null) {
            this.tweetCategory = localStorage.getItem('tweetPage');
        } else {
            this.tweetCategory = 'UpliftingQuotes';
        }
        
        if(localStorage.getItem('blog') != null) {
            this.tumblrCategory = localStorage.getItem('blog');
        } else {
            this.tumblrCategory = 'quotemadness';
        }
        
        if(localStorage.getItem('quote') != null) {
            this.tweetCategory = localStorage.getItem('quote');
        } else {
            this.userQuote = 'The world is your oyster.';
        }
        this.presentQuote();
    }
    
    presentQuote() {
        let alert = this.alertCtrl.create({
            title: this.userQuote,
            subTitle: '<br>— You'
        });
        alert.present();
    }
    
    changeCategory(menuClicked: string, menuCategory: string) {
        this.events.publish(menuClicked, menuCategory);
    }
    
    viewSettings() {
        this.navCtrl.push(SettingsPage);
    }
    
    viewAbout() {
        this.navCtrl.push(AboutPage);
    }
}
