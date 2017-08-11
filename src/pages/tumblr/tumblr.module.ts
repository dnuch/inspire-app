import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TumblrPage } from './tumblr';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    TumblrPage
  ],
  imports: [
    IonicPageModule.forChild(TumblrPage),
    IonicImageViewerModule
  ],
  exports: [
    TumblrPage
  ]
})
export class TumblrModule {
}
