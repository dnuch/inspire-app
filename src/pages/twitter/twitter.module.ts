import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwitterPage } from './twitter';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
    declarations: [
        TwitterPage
    ],
    imports: [
        IonicPageModule.forChild(TwitterPage),
        IonicImageViewerModule
    ],
    exports: [
        TwitterPage
    ]
})
export class TwitterModule { }
