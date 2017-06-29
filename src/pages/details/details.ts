import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ObjectService } from '../../app/services/object.service';

@Component({
    templateUrl: 'details.html'
})
export class DetailsPage {
    item: any;
    
    constructor(public navCtrl: NavController, public params: NavParams, private objectService: ObjectService) {
        this.item = params.get('item');
    }
}
