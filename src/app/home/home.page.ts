import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router : Router) {}
  private subscription: Subscription;
  public showInput = true;

    public processName:string;
    public seconds=0;
    public minutes=0;
    public hours=0;



    private countdown () {   
      let msg = this.processName     
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
        this.subscription.unsubscribe()
        alert('ws://'+localStorage.getItem('config'))
        var ws = new WebSocket('ws://'+localStorage.getItem('config'));
        alert("发送中")
        ws.onopen = function () {
          this.send(msg);         
      };
      ws.onerror = function () {
        alert('error occurred!');
    };

      }
    }

  Start(){
    if(localStorage.getItem('config') == null)
    alert('你还未进行配置！')
    else{
    this.showInput = false;

         this.subscription = interval(1000)
      .subscribe(x => { this.countdown(); });
    }
  }
  Stop(){
    this.subscription.unsubscribe();
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0
    this.showInput = true;
  }
  toConfig(){
    this.router.navigate(['config']);
  }


    ngOnInit() {

    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}


