import { Component } from '@angular/core';
import { Events, MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TwitterProvider } from '../../app/services/twitter.service';
import { ObjectService } from '../../app/services/object.service';

@Component({
  selector: 'tweets',
  templateUrl: 'tweets.html'
})
export class TweetsPage {
    
    tweetCategory: string;
    items: any;
    limit: number;
    browser: any;
    
    constructor(private events: Events, private menuCtrl: MenuController, public twitterProvider: TwitterProvider, public objectService: ObjectService, public iab: InAppBrowser) {
        if(localStorage.getItem('tweetCategory') != null) {
            this.tweetCategory = localStorage.getItem('tweetCategory');
        } else {
            this.tweetCategory = 'UpliftingQuotes';
        }
        events.subscribe('tweetMenu:clicked', (category) => {
            this.tweetCategory = category;
            this.getDefaults();
        });
        this.getDefaults();
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'tweetMenu');
    }
    
    getDefaults() {
        this.limit = 10;
        this.getTweets(this.tweetCategory, this.limit);
    }
    
    getTweets(category: string, limit: number) {
        this.twitterProvider.getTweets(category, limit).subscribe(res => this.items = res);
    }
    
    refreshTweets(refresher: any) {
        this.limit = 10;
        this.getTweets(this.tweetCategory, this.limit);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    moreTweets(infiniteScroll: any) {
        this.limit += 5;
        this.getTweets(this.tweetCategory, this.limit);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
        console.log(this.items);
    }
    
    btnRedirect(item: any) {
        this.browser = this.iab.create('https://twitter.com/'+item.user.screen_name+'/statuses/'+item.id_str);
    }
}
