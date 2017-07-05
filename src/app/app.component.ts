import { Component } from '@angular/core';
import { Events, LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RedditService } from './services/reddit.service';
import { ObjectService } from './services/object.service';

import { TabsPage } from '../pages/tabs/tabs';
@Component({
    templateUrl: 'app.html',
    providers: [RedditService, ObjectService]
})
export class MyApp {
    
    rootPage:any = TabsPage;
    redditCategory: string;
    tweetCategory: string;
    userQuote: string;
    
    constructor(public events: Events, public loadingCtrl: LoadingController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
        
        if(localStorage.getItem('quote') != null) {
            this.tweetCategory = localStorage.getItem('quote');
        } else {
            this.userQuote = 'The world is your oyster.';
        }
    }
    
    presentQuote() {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            enableBackdropDismiss: true,
            content: this.userQuote, 
        });

        loading.present();
    }
    
    clickMenuTweet() {
        this.events.publish('tweetMenu:clicked', this.tweetCategory);
    }
    
    clickMenuReddit() {
        this.events.publish('redditMenu:clicked', this.redditCategory);
    }
}
