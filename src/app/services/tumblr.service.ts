import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TumblrService {
    
    api_key: string;
    
    constructor(private jsonp: Jsonp) {
        this.api_key = 'rvNpIWW8rkM9fG5RzsxzCv95QANMrhUImnXsFLCuSyDZTGvpsR';
    }
    
    getPosts(blog_url: string, limit: string): any {
        return this.jsonp.get('https://api.tumblr.com/v2/blog/'+blog_url+'/posts?callback=JSONP_CALLBACK&api_key='+this.api_key+'&limit='+limit).map(res => res.json());
    }
}
