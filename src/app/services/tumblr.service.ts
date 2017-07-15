import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TumblrService {
    
    offset: number;
    
    constructor(private jsonp: Jsonp) {
        this.offset = 0;
    }
    
    getPosts(blog_url: string, limit: number): any {
        if(limit == 5) this.offset += 50;
        if(limit == 9) {
            limit++;
            this.offset = 0;
        }
        
        return this.jsonp.get('https://api.tumblr.com/v2/blog/'+blog_url+'.com/posts?filter=text&callback=JSONP_CALLBACK&api_key=rvNpIWW8rkM9fG5RzsxzCv95QANMrhUImnXsFLCuSyDZTGvpsR&limit='+limit+'&offset='+this.offset).map(res => res.json());
    }
}
