import { Component } from '@angular/core';

import { RedditsPage } from '../reddits/reddits';
import { TweetsPage } from '../tweets/tweets';
import { TumblrPage } from '../tumblr/tumblr';
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root: any = TumblrPage;
    tab2Root: any = TweetsPage;
    tab3Root: any = RedditsPage;

    constructor() { }
}
