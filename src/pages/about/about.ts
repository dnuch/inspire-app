import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
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
