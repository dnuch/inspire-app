import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailsPage } from '../details/details';
//services
import { RedditService } from '../../app/services/reddit.service';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
    items: any;
    category: any;
    limit: any;
    
    constructor(public navCtrl: NavController, private redditService: RedditService) {
        this.getDefaults();
    }

    //lifecycle hook, whenever rendered it will run
    ngOnInit(){
        this.getPosts(this.category, this.limit);
    }
    
    getDefaults(){
        if(localStorage.getItem('category') != null) {
            this.category = localStorage.getItem('category');
        } else {
            this.category = 'LifeProTips';
        }
         
        if(localStorage.getItem('limit') != null) {
            this.limit = localStorage.getItem('limit');
        } else {
            this.limit = 10;
        }
    }
    
    getPosts(category: string, limit: number){
        this.redditService.getPosts(category, limit).subscribe(response => {
            console.log(response);
            this.items = response.data.children;
        });
    }
    
    viewItem(item: any){
        this.navCtrl.push(DetailsPage, {
            item: item
        })
    }
    
    changeCategory(){
        this.getPosts(this.category, this.limit);
    }
}