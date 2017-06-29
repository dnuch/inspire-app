import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'tweets',
  templateUrl: 'tweets.html'
})
export class TweetsPage {
    tweetPage: string;
    
    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams) {
        this.getDefaults();
    }
    
    ngAfterViewInit() {
        !function(d,s,id){
            var js: any,
                fjs=d.getElementsByTagName(s)[0],
                p='https';
                js=d.createElement(s);
                js.id=id;
                js.src=p+"://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js,fjs);
        }
        (document,"script","twitter-wjs");
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
        content: 'Please wait...'
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