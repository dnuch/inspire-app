import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: string = 'TumblrPage';
  tab2Root: string = 'TwitterPage';
  tab3Root: string = 'RedditPage';

  constructor() { }
}
