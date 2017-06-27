import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { RedditsPage } from '../reddits/reddits';
import { TweetsPage } from '../tweets/tweets';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RedditsPage;
  tab2Root = TweetsPage;
  tab3Root = SettingsPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
