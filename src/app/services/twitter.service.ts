import { Injectable } from '@angular/core';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/Rx';

declare let require: any;
let bigInt = require("big-integer");

@Injectable()
export class TwitterProvider {

  conKey: string;
  conSecKey: string;
  token: string;
  tokenSec: string;

  constructor(private twitterService: TwitterService) {
    this.conKey    = 'pCCCP4wUA8TsIby8n6QbelEGG';
    this.conSecKey = 'Yk0jdrmgzcns7z525FQP03TtnNs70EzhcEe5v99oWxjRLISLvX';
    this.token     = '452959156-PlUSwqN7yVdnHvPwvF0k3ORj9N8bJLzOms52boNB';
    this.tokenSec  = 'lAEFJ0xJ1ji3SRLk6rPovtnCT77jNrb1UF8a6EzIMYyie';
  }

  getTweets(category: string, limit: number, itemID: string): any {
    return this.twitterService.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json',
      {
        screen_name: category,
        include_rts: false,
        exclude_replies: true,
        max_id: bigInt(itemID).minus(1).toString(),
        count: limit
      },
      {
        consumerKey: this.conKey,
        consumerSecret: this.conSecKey
      },
      {
        token: this.token,
        tokenSecret: this.tokenSec
      }
    ).map(res => res.json());
  }
}
