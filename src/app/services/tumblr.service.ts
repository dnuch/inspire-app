import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TumblrService {

  offset: number;
  key: string;

  constructor(private jsonp: Jsonp) {
    this.offset = 0;
    this.key = 'rvNpIWW8rkM9fG5RzsxzCv95QANMrhUImnXsFLCuSyDZTGvpsR';
  }

  getPosts(blog_url: string, limit: number, reset: boolean): any {
    reset ? this.offset = 0 : this.offset += 10;

    return this.jsonp.get('https://api.tumblr.com/v2/blog/' + blog_url + '.com/posts?filter=text&callback=JSONP_CALLBACK&api_key=' + this.key + '&limit=' + limit + '&offset=' + this.offset).map(res => res.json());
  }
}
