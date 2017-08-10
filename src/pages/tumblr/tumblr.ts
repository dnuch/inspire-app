import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, MenuController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TumblrService } from '../../app/services/tumblr.service';
import { ObjectService } from '../../app/services/object.service';

@IonicPage()
@Component({
    selector: 'tumblr',
    templateUrl: 'tumblr.html'
})
export class TumblrPage {
    
    @ViewChild(Content) content: Content;
    items: any;
    tumblrCategory: string;
    limit: number;
    
    constructor(private events: Events, private menuCtrl: MenuController, private tumblrService: TumblrService, public objectService: ObjectService, public iab: InAppBrowser, public platform: Platform) {
        localStorage.getItem('tumblrCategory') != null ? this.tumblrCategory = localStorage.getItem('tumblrCategory') : this.tumblrCategory = 'lifeofquotations.tumblr';
        
        events.subscribe('tumblrMenu:clicked', (blog) => {
            this.tumblrCategory = blog;
            this.content.scrollToTop(0);
            this.getDefaults();
        });
        
        this.getDefaults();
    }
    
    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'tumblrMenu');
        console.log(this.items);
    }
    
    getDefaults() {
        this.limit = 10;
        this.tumblrService.getPosts(this.tumblrCategory, this.limit, true).subscribe(object => this.items = object.response.posts);
    }
    
    refreshBlog(refresher: any) {
        this.getDefaults();
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    morePosts(infiniteScroll: any) {
        this.tumblrService.getPosts(this.tumblrCategory, this.limit, false).subscribe(object => {
            for(let i=0; i<object.response.posts.length; i++)
                this.items.push(object.response.posts[i]);
        });
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
}
