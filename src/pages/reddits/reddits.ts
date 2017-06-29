import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    category: string;
    moreItems: string;
    
    constructor(public navCtrl: NavController, private redditService: RedditService, private objectService: ObjectService) {
        if(localStorage.getItem('category') != null) {
            this.category = localStorage.getItem('category');
        } else {
            this.category = 'LifeProTips';
        }
        this.getDefaults();
    }
    
    getDefaults() {      
        this.limit = 10;
        this.moreItems = "Loading Reddits...";
        this.getPosts(this.category, this.limit);
    }
    
    getPosts(category: string, limit: number) {
        this.redditService.getPosts(category, limit).subscribe(response => {
            this.items = response.data.children;
        });
    }
    
    viewItem(item: any) {
        this.navCtrl.push(DetailsPage, {
            item: item
        })
    }
    
    moreReddits(infiniteScroll: any) {
        console.log( 'BEFORE == limit:',this.limit, 'objects:', this.objectService.objectLength(this.items) );
        if(this.limit != this.objectService.objectLength(this.items)) {
            this.moreItems = "No more Reddits...";
            infiniteScroll.complete();
            //infiniteScroll.enable(false);
        } else {
            this.limit += 5;
            setTimeout(() => {
                this.getPosts(this.category, this.limit);
                infiniteScroll.complete();
            }, 500);
        }
    }
}