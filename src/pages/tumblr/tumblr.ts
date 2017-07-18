import { Component } from '@angular/core';

import { Events, MenuController } from 'ionic-angular';

import { TumblrService } from '../../app/services/tumblr.service';
import { ObjectService } from '../../app/services/object.service';

@Component({
    selector: 'tumblr',
    templateUrl: 'tumblr.html'
})
export class TumblrPage {
    
    items: any;
    tumblrCategory: string;
    limit: number;
    
    constructor(private events: Events, private menuCtrl: MenuController, private tumblrService: TumblrService, public objectService: ObjectService) {
        if(localStorage.getItem('tumblrCategory') != null) {
            this.tumblrCategory = localStorage.getItem('tumblrCategory');
        } else {
            this.tumblrCategory = 'quotemadness';
        }
        
        this.getDefaults();
        
        events.subscribe('tumblrMenu:clicked', (blog) => {
            this.tumblrCategory = blog;
            this.getDefaults();
        });
    }
    
    ionViewDidEnter() {
        console.log(this.items);
        this.menuCtrl.enable(true, 'tumblrMenu');
    }
    
    getDefaults() {
        this.limit = 10;
        this.getPosts(this.tumblrCategory, this.limit);
    }
    
    getPosts(blog: string, limit: number) {
        this.tumblrService.getPosts(blog, limit).subscribe(object => this.items = object.response.posts);
    }
    
    addPosts(blog: string, limit: number) {
        this.tumblrService.getPosts(blog, limit).subscribe(object => {
            for(let i = 5; i > 0; i--)
                this.items.push(object.response.posts[limit-i]);
        });
    }
    
    refreshBlog(refresher: any) {
        this.limit = 10;
        this.getPosts(this.tumblrCategory, this.limit-1);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    morePosts(infiniteScroll: any) {
        this.limit <= 45 ? this.limit += 5 : this.limit = 5;
        
        this.addPosts(this.tumblrCategory, this.limit);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
}
