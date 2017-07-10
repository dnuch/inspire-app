import { Component } from '@angular/core';

import { TumblrService } from '../../app/services/tumblr.service';

@Component({
    selector: 'tumblr',
    templateUrl: 'tumblr.html'
})
export class TumblrPage {
    
    items: any;
    blog: string;
    limit: string;
    
    constructor(public tumblrService: TumblrService) {
        this.blog = 'quotemadness.com';
        this.limit = '10';
        this.getPosts();
    }
    
    ionViewDidEnter() {
        console.log(this.items);
    }
    
    getPosts() {
        this.tumblrService.getPosts(this.blog, this.limit).subscribe(object => {
            this.items = object.response.posts;
        });
    }
}