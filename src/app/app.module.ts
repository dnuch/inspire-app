import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { RedditsPage } from '../pages/reddits/reddits';
import { TweetsPage } from '../pages/tweets/tweets';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TumblrPage } from '../pages/tumblr/tumblr'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TwitterService } from 'ng2-twitter';
import { IonicImageLoader } from 'ionic-image-loader';

import { ExpandableComponent } from '../components/expandable/expandable';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    RedditsPage,
    TumblrPage,
    TweetsPage,
    SettingsPage,
    TabsPage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicImageLoader.forRoot(),
    IonicImageViewerModule
  ],    
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    RedditsPage,
    TumblrPage,
    TweetsPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    TwitterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
