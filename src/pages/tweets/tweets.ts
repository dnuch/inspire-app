import { Component } from '@angular/core';
import { Events, LoadingController, NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'tweets',
  templateUrl: 'tweets.html'
})
export class TweetsPage {
    
    tweetCategory: string;
    
    constructor(private events: Events, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private navCtrl: NavController) {
        this.getDefaults();
        
        events.subscribe('tweetMenu:clicked', (category) => {
            this.tweetCategory = category;
            this.refreshPage();
        });
    }
    
    ionViewDidEnter() {
        this.menuCtrl.enable(true, 'tweetMenu');
    }
    
    ngAfterViewInit() {
            !function(d,s,id){
                let js: any, fjs = d.getElementsByTagName(s)[0];
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
            (document,"script","twitter-wjs");
    }
    
    getDefaults() {
        this.presentLoadingDefault();
        
        if(localStorage.getItem('tweetCategory') != null) {
            this.tweetCategory = localStorage.getItem('tweetCategory');
        } else {
            this.tweetCategory = 'UpliftingQuotes';
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
        localStorage.setItem('tweetCategory', this.tweetCategory);
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
    }
}
