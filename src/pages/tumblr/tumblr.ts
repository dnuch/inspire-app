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
    blog: string;
    limit: number;
    
    constructor(public events: Events, public menuCtrl: MenuController, public tumblrService: TumblrService, public objectService: ObjectService) {
        if(localStorage.getItem('blog') != null) {
            this.blog = localStorage.getItem('blog');
        } else {
            this.blog = 'quotemadness';
        }
        
        this.getDefaults();
        
        events.subscribe('tumblrMenu:clicked', (blog) => {
            this.blog = blog;
            this.getDefaults();
        });
    }
    
    ionViewDidEnter() {
        console.log(this.items);
        this.menuCtrl.enable(true, 'tumblrMenu');
    }
    
    getDefaults() {
        this.limit = 10;
        this.getPosts(this.blog, this.limit);
    }
    
    getPosts(blog: string, limit: number) {
        this.tumblrService.getPosts(blog, limit).subscribe(object => {
            this.items = object.response.posts;
        });
    }
    
    refreshBlog(refresher: any) {
        this.getPosts(this.blog, this.limit);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    morePosts(infiniteScroll: any) {
        if(this.limit < 50) this.limit += 5;
        this.getPosts(this.blog, this.limit);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
        console.log( this.limit, this.objectService.objectLength(this.items));
    }
}
