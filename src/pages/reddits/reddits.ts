import { Component } from '@angular/core';
import { Events, NavController, MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    
    constructor(private events: Events, private menuCtrl: MenuController, private navCtrl: NavController, public redditService: RedditService, public objectService: ObjectService, public iab: InAppBrowser) {
        localStorage.getItem('redditCategory') != null ? this.redditCategory = localStorage.getItem('redditCategory') : this.redditCategory = 'GetMotivated';
        
        events.subscribe('redditMenu:clicked', (category) => {
            this.redditCategory = category;
            this.getDefaults();
        });
        
        this.getDefaults();
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'redditMenu');
        console.log(this.items);
    }
    
    getDefaults() {
        this.limit = 10;
        this.getPosts(this.redditCategory, this.limit);
    }
    
    getPosts(category: string, limit: number) {
        this.redditService.getPosts(category, limit).subscribe(response => { 
            this.items = response.data.children;
            
            for (let i=0; i<this.items.length; i++)
                if(this.items[i].data.selftext != '')
                    this.items[i].expanded = false;
        });
    }
    
    expandItem(item){
        this.items.map((listItem) => {
            if(item == listItem)
                listItem.expanded = !listItem.expanded;
            else 
                listItem.expanded = false;
            
            return listItem;
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
