import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ObjectService } from '../../app/services/object.service';

@Component({
    templateUrl: 'details.html'
})
export class DetailsPage {
    
    item: any;

    constructor(private params: NavParams, public objectService: ObjectService, public iab: InAppBrowser) {
        this.item = params.get('item');
    }
}
