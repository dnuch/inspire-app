import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TwitterProvider } from '../../app/services/twitter.service';
import { ObjectService } from '../../app/services/object.service';

@IonicPage()
@Component({
  selector: 'twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage {

  @ViewChild(Content) content: Content;
  tweetCategory: string;
  items: any;
  limit: number;

  constructor(private events: Events, private menuCtrl: MenuController, public twitterProvider: TwitterProvider, public objectService: ObjectService, public iab: InAppBrowser) {
    this.getDefaults();

    events.subscribe('tweetMenu:clicked', (category) => {
      this.tweetCategory = category;
      this.content.scrollToTop(0);
      this.getTweets();
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'tweetMenu');
    //console.log(this.items);
  }

  getDefaults() {
    this.limit = 10;
    this.tweetCategory = localStorage.getItem('tweetCategory');
    this.getTweets();
  }

  getTweets() {
    //max_id of twitter post is 2^63-1 = 9223372036854775806
    this.twitterProvider.getTweets(this.tweetCategory, this.limit, '9223372036854775806').subscribe(res => this.items = res);
  }

  refreshTweets(refresher: any) {
    this.getTweets();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  moreTweets(infiniteScroll: any) {
    this.twitterProvider.getTweets(this.tweetCategory, this.limit, this.items[this.items.length - 1].id_str).subscribe(res => {
      for (let i = 0; i < res.length; i++)
        this.items.push(res[i]);
    });
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
