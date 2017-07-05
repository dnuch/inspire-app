import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'tweets',
  templateUrl: 'tweets.html'
})
export class TweetsPage {
    
    tweetPage: string;
    
    constructor(public menuCtrl: MenuController, public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams) {
        this.getDefaults();
    }
    
    ngAfterViewInit() {
        !function(d,s,id){
            var js: any, fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
        (document,"script","twitter-wjs");
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'tweetMenu');
    }
    
    getDefaults() {
        this.presentLoadingDefault();
        
        if(localStorage.getItem('tweetPage') != null) {
            this.tweetPage = localStorage.getItem('tweetPage');
        } else {
            this.tweetPage = 'UpliftingQuotes';
        }
    }
    
    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
        content: 'Loading Tweets...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 500);
    }
    
    refreshPage() {
        localStorage.setItem('tweetPage', this.tweetPage);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
}
