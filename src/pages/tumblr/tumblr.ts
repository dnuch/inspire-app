import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, MenuController, Slides } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TumblrService } from '../../app/services/tumblr.service';
import { ObjectService } from '../../app/services/object.service';

@IonicPage()
@Component({
  selector: 'tumblr',
  templateUrl: 'tumblr.html'
})
export class TumblrPage {

  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  items: any;
  tumblrCategory: string;
  limit: number;
  mode: object;

  constructor(private events: Events, private menuCtrl: MenuController, private splashScreen: SplashScreen, private tumblrService: TumblrService, public objectService: ObjectService, public iab: InAppBrowser) {
    this.getDefaults();

    events.subscribe('tumblrMenu:clicked', (blog) => {
      this.tumblrCategory = blog;
      if(this.mode['type'] == 'list')
        this.content.scrollToTop(0);
      this.getPosts();
      this.resetSlides();
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'tumblrMenu');
    //console.log(this.items);
  }

  ionViewDidLoad() {
    this.splashScreen.hide();
  }

  getDefaults() {
    this.limit = 10;

    this.mode = {
      type: 'list',
      icon: 'ios-image'
    };

    this.tumblrCategory = localStorage.getItem('tumblrCategory');
    this.getPosts();
  }

  getPosts() {
    this.tumblrService.getPosts(this.tumblrCategory, this.limit, true).subscribe(object => this.items = object.response.posts);
  }

  addPosts() {
    this.tumblrService.getPosts(this.tumblrCategory, this.limit, false).subscribe(object => {
      for (let i = 0; i < object.response.posts.length; i++)
        this.items.push(object.response.posts[i]);
    });
  }

  toggleMode() {
    this.mode['type'] == 'gallery' ? this.mode['type'] = 'list' : this.mode['type'] = 'gallery';
    this.mode['icon'] == 'ios-list' ? this.mode['icon'] = 'ios-image' : this.mode['icon'] = 'ios-list';
    if(this.mode['type'] == 'gallery')
      this.slides.update();
  }

  addSlides() {
    if(this.slides.getActiveIndex() == Math.floor(this.slides.length()*.8)) {
      this.addPosts();
      this.slides.update();
    }
  }

  resetSlides() {
    this.slides.update();
    this.slides.slideTo(0);
  }

  refreshBlog(refresher: any) {
    this.getPosts();
    this.resetSlides();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  scroll(infiniteScroll: any) {
    this.addPosts();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
