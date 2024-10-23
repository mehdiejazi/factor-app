import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {

  public isClosed:boolean = false;
  
  @Input() AlertType: string;
  @Input() TextMessage: string;

  public constructor() { }

  public ngOnInit(): void { }

  public onClickClose() {
    this.isClosed = true;
  }


}
