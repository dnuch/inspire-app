import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(private menuCtrl: MenuController) {
        menuCtrl.swipeEnable(false);
    }
    
    ionViewWillLeave() {
        this.menuCtrl.swipeEnable(true);
    }
}
