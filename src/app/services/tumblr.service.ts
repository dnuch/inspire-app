import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TumblrService {

  offset: number;

  constructor(private jsonp: Jsonp) {
    this.offset = 0;
  }

  getPosts(blog_url: string, limit: number, reset: boolean): any {
    reset ? this.offset = 0 : this.offset += 10;

    return this.jsonp.get('https://api.tumblr.com/v2/blog/' + blog_url + '.com/posts?filter=text&callback=JSONP_CALLBACK&api_key=rvNpIWW8rkM9fG5RzsxzCv95QANMrhUImnXsFLCuSyDZTGvpsR&limit=' + limit + '&offset=' + this.offset).map(res => res.json());
  }
}
