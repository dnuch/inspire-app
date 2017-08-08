import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedditPage } from './reddit';
import { ExpandableModule } from '../../components/expandable/expandable.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
    declarations: [
        RedditPage
    ],
    imports: [
        IonicPageModule.forChild(RedditPage),
        ExpandableModule,
        IonicImageLoader,
        IonicImageViewerModule
    ],
    exports: [
        RedditPage
    ]
})
export class RedditModule { }
