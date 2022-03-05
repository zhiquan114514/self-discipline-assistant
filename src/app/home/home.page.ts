import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private subscription: Subscription;
  public showInput = true;

    public processName;
    public seconds;
    public minutes;
    public hours;



    private countdown () {        
      if(this.seconds != 0)
        this.seconds -=1;
      else if(this.seconds == 0 && this.minutes != 0) {
        this.seconds = 59;
        this.minutes -=1;
      } else if(this.minutes == 0 && this.hours != 0){
        this.seconds = 59
        this.minutes = 59;
        this.hours -= 1;
      } else{
        this.showInput = true;

        console.log("send")
        this.subscription.unsubscribe()
      }
    }


  start(){
    this.showInput = false;

         this.subscription = interval(1000)
      .subscribe(x => { this.countdown(); });
  }
  Stop(){
    this.subscription.unsubscribe();
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0
    this.showInput = true;
  }

    ngOnInit() {

    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}
