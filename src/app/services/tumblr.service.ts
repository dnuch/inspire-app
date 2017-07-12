import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TumblrService {
    
    constructor(private jsonp: Jsonp) { }
    
    getPosts(blog_url: string, limit: number): any {
        return this.jsonp.get('https://api.tumblr.com/v2/blog/'+blog_url+'.com/posts?filter=text&callback=JSONP_CALLBACK&api_key=rvNpIWW8rkM9fG5RzsxzCv95QANMrhUImnXsFLCuSyDZTGvpsR&limit='+limit).map(res => res.json());
    }
}
