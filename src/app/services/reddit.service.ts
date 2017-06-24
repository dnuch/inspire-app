import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

//Uses Reddit's subreddit API to retrieve posts
@Injectable()
export class RedditService {
    http: any;
    baseUrl: string;
    
    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'https://www.reddit.com/r/';
    }
    
    getPosts(category: string, limit: number) {
        return this.http.get(this.baseUrl+category+'/top.json?limit='+limit).map(res => res.json());
    }
}
