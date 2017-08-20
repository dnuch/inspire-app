import { Component, ViewChild } from '@angular/core';

import { Events, AlertController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { RedditService } from './services/reddit.service';
import { ObjectService } from './services/object.service';
import { TumblrService } from './services/tumblr.service';
import { TwitterProvider } from './services/twitter.service';

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
  rootPage: string = 'TabsPage';

  redditCategory: string;
  tweetCategory: string;
  tumblrCategory: string;
  redditOptions: Array<{ name: string, category: string }>;
  tweetOptions: Array<{ name: string, category: string }>;
  tumblrOptions: Array<{ name: string, category: string }>;

  userQuote: string;
  userName: string;
  date: string;

  constructor(private events: Events, private alertCtrl: AlertController, private platform: Platform, private statusBar: StatusBar) {
    platform.ready().then(() => statusBar.styleDefault());

    this.getDefaults();
    this.presentQuote();
  }

  presentQuote() {
    if ((Date.now() - parseInt(this.date)) / (1000 * 3600 * 24) >= 1) {
      let alert = this.alertCtrl.create({
        title: this.userQuote,
        subTitle: '<br>— ' + this.userName
      });
      alert.present();
      localStorage.setItem('date', Date.now().toString());
    }
  }

  changeCategory(menuClicked: string, menuCategory: string) {
    this.events.publish(menuClicked, menuCategory);
  }

  viewSettings() {
    this.navCtrl.push('SettingsPage', {
      redditOptions: this.redditOptions,
      tweetOptions: this.tweetOptions,
      tumblrOptions: this.tumblrOptions
    });
  }

  viewAbout() {
    this.navCtrl.push('AboutPage');
  }

  getDefaults() {
    this.tumblrOptions = [
      {   //pics + quotes
        name: 'Feel Inspired',
        category: 'cwote.tumblr'
      },
      {   //quotes
        name: 'Life Quotes',
        category: 'lifeofquotations.tumblr'
      },
      {   //quotes
        name: 'Literature Quotes',
        category: 'quotemadness'
      },
      {   //pictures
        name: 'Personal Quotes',
        category: 'personal-quotes'
      }
    ];

    this.tweetOptions = [
      {   //quotes
        name: 'Deep Life Quotes',
        category: 'DeepLifeQuotes'
      },
      {   //quotes
        name: 'Great Minds Quotes',
        category: 'GreatestQuotes'
      },
      {   //pics + quotes
        name: 'Inspirational Quotes',
        category: 'Inspire_Us'
      },
      {   //reminders
        name: 'Reminders',
        category: 'babycarebot'
      },
      {   //quotes
        name: 'Uplifting Quotes',
        category: 'UpliftingQuotes'
      }
    ];

    this.redditOptions = [
      {   //pics
        name: 'Earth Pictures',
        category: 'EarthPorn'
      },
      {   //pics + desc.
        name: 'Get Motivated',
        category: 'GetMotivated'
      },
      {   //desc.
        name: 'Life Pro Tips',
        category: 'LifeProTips'
      },
      {   //pics + gifs
        name: 'Pet Therapy',
        category: 'aww'
      },
      {   //pics + gifs
        name: 'Uplift Your Mood',
        category: 'funny'
      }
    ];

    if(localStorage.getItem('redditCategory') != null)
      this.redditCategory = localStorage.getItem('redditCategory');
    else {
      this.redditCategory = this.redditOptions[0].category;
      localStorage.setItem('redditCategory', this.redditCategory);
    }

    if(localStorage.getItem('tweetCategory') != null)
      this.tweetCategory = localStorage.getItem('tweetCategory');
    else {
      this.tweetCategory = this.tweetOptions[0].category;
      localStorage.setItem('tweetCategory', this.tweetCategory);
    }

    if(localStorage.getItem('tumblrCategory') != null)
      this.tumblrCategory = localStorage.getItem('tumblrCategory');
    else {
      this.tumblrCategory = this.tumblrOptions[0].category;
      localStorage.setItem('tumblrCategory', this.tumblrCategory);
    }

    if(localStorage.getItem('quote') != null)
      this.userQuote = localStorage.getItem('quote');
    else {
      this.userQuote = 'The world is your oyster.';
      localStorage.setItem('quote', this.userQuote);
    }

    if(localStorage.getItem('username') != null)
      this.userName = localStorage.getItem('username');
    else {
      this.userName = 'William Shakespeare';
      localStorage.setItem('username', this.userName);
    }

    if(localStorage.getItem('date') != null)
      this.date = localStorage.getItem('date');
    else
      this.date = '0';
  }
}
