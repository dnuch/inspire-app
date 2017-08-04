import { Component, ViewChild } from '@angular/core';
import { Content, Events, MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TwitterProvider } from '../../app/services/twitter.service';
import { ObjectService } from '../../app/services/object.service';

@Component({
  selector: 'tweets',
  templateUrl: 'tweets.html'
})
export class TweetsPage {
    
    @ViewChild(Content) content: Content;
    tweetCategory: string;
    items: any;
    limit: number;
    
    constructor(private events: Events, private menuCtrl: MenuController, public twitterProvider: TwitterProvider, public objectService: ObjectService, public iab: InAppBrowser) {
        localStorage.getItem('tweetCategory') != null ? this.tweetCategory = localStorage.getItem('tweetCategory') : this.tweetCategory = 'DeepLifeQuotes';
        
        events.subscribe('tweetMenu:clicked', (category) => {
            this.tweetCategory = category;
            this.content.scrollToTop(0);
            this.getDefaults();
        });
        
        this.getDefaults();
    }
    
    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'tweetMenu');
        console.log(this.items);
    }
    
    getDefaults() {
        this.limit = 10;
        //max_id of twitter post is 2^63-1 = 9223372036854775806
        this.twitterProvider.getTweets(this.tweetCategory, this.limit, '9223372036854775806').subscribe(res => this.items = res);
    }
    
    refreshTweets(refresher: any) {
        this.getDefaults();
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    moreTweets(infiniteScroll: any) {
        //subtract 1 from id string as max_id looks for posts less than or equal to original ID
        let id : string = this.items[this.items.length-1].id_str.substring(0, 4)+(parseInt(this.items[this.items.length-1].id_str.substring(4, this.items[this.items.length-1].id_str.length))-1).toString();
        
        this.twitterProvider.getTweets(this.tweetCategory, this.limit, id).subscribe(res => {
            for(let i=0; i<res.length; i++)
                this.items.push(res[i]);
        });
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
}
