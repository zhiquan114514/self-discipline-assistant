import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  ipAddress;
  port;
  status = "未配置"
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('config')!=null) {
    this.status = "已配置"
    this.ipAddress = localStorage.getItem('config').split(":")[0]
    this.port = localStorage.getItem('config').split(":")[1]
    }
  }
  setConfig(){
    
    localStorage.clear()
    localStorage.setItem('config',this.ipAddress+":"+this.port)
    console.log(localStorage.getItem('config'))
    this.status = "已配置"
  }

}
