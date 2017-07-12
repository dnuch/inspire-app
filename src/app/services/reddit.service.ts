import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RedditService {
    
    constructor(private http: Http) { }
    
    getPosts(category: string, limit: number): any {
        return this.http.get('https://www.reddit.com/r/'+category+'/top.json?raw_json=1&limit='+limit).map(res => res.json());
    }
}
