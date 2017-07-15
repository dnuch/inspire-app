import { Component } from '@angular/core';
import { Events, NavController, MenuController } from 'ionic-angular';

import { DetailsPage } from '../details/details';

import { RedditService } from '../../app/services/reddit.service';
import { ObjectService } from '../../app/services/object.service';

@Component({
    selector: 'reddits',
    templateUrl: 'reddits.html'
})
export class RedditsPage {
    
    items: any;
    limit: number;
    redditCategory: string;
    
    constructor(private events: Events, private menuCtrl: MenuController, private navCtrl: NavController, private redditService: RedditService, public objectService: ObjectService) {
        if(localStorage.getItem('redditCategory') != null) {
            this.redditCategory = localStorage.getItem('redditCategory');
        } else {
            this.redditCategory = 'LifeProTips';
        }
        
        this.getDefaults();
        
        events.subscribe('redditMenu:clicked', (category) => {
            this.redditCategory = category;
            this.getDefaults();
        });
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'redditMenu');
    }
    
    getDefaults() {
        this.limit = 10;
        this.getPosts(this.redditCategory, this.limit);
    }
    
    getPosts(category: string, limit: number) {
        this.redditService.getPosts(category, limit).subscribe(response => {
            this.items = response.data.children;
        });
    }
    
    viewItem(item: any) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }
    
    refreshReddits(refresher: any) {
        this.getPosts(this.redditCategory, this.limit);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    moreReddits(infiniteScroll: any) {
        this.limit += 5;
        this.getPosts(this.redditCategory, this.limit);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
}
