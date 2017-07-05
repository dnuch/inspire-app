import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { RedditsPage } from '../reddits/reddits';
import { TweetsPage } from '../tweets/tweets';
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root: any = RedditsPage;
    tab2Root: any = TweetsPage;
    tab3Root: any = SettingsPage;
    tab4Root: any = AboutPage;

    constructor() {

    }
}
