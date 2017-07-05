import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

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
    
    constructor(public menuCtrl: MenuController, public navCtrl: NavController, private redditService: RedditService, private objectService: ObjectService) {
        if(localStorage.getItem('category') != null) {
            this.category = localStorage.getItem('category');
        } else {
            this.category = 'LifeProTips';
        }
        this.getDefaults();
        //menuCtrl.enable(false, 'tweetMenu'); 
        //menuCtrl.enable(true, 'redditMenu');   
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'redditMenu');
    }
    
    getDefaults() {  
        this.limit = 10;
        this.getPosts(this.category, this.limit);
        //console.log(this.navCtrl);
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
    
    moreReddits(infiniteScroll: any) {
        this.limit += 5;
        this.getPosts(this.category, this.limit);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 500);
    }
}
