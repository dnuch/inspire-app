import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RedditService } from './services/reddit.service';
import { ObjectService } from './services/object.service';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
@Component({
    templateUrl: 'app.html',
    providers: [RedditService, ObjectService]
})
export class MyApp {
    
    @ViewChild('nav') navCtrl: any = NavController;
    
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
            content: this.userQuote
        });

        loading.present();
    }
    
    clickCategory(menuClicked: string, menuCategory: string) {
        this.events.publish(menuClicked, menuCategory);
    }
    
    viewSettings() {
        this.navCtrl.push(SettingsPage);
    }
    
    viewAbout() {
        this.navCtrl.push(AboutPage);
    }
}
