import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { RedditsPage } from '../pages/reddits/reddits';
import { TweetsPage } from '../pages/tweets/tweets';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';
import { TumblrPage } from '../pages/tumblr/tumblr'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TwitterService } from 'ng2-twitter';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    RedditsPage,
    TumblrPage,
    TweetsPage,
    DetailsPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicImageViewerModule
  ],    
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    RedditsPage,
    TumblrPage,
    TweetsPage,
    DetailsPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TwitterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
