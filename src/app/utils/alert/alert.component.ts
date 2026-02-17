import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {

  public isClosed: boolean = false;
  public isFading: boolean = false;
  private readonly _fadeDurationMs: number = 220;
  private _closeTimerId: ReturnType<typeof setTimeout> | null = null;
  
  @Input() AlertType: string;
  @Input() TextMessage: string;

  public constructor() { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    if (this._closeTimerId) {
      clearTimeout(this._closeTimerId);
      this._closeTimerId = null;
    }
  }

  public onClickClose(): void {
    if (!this.isClosable || this.isClosed || this.isFading) {
      return;
    }

    this.isFading = true;
    this._closeTimerId = setTimeout(() => {
      this.isClosed = true;
      this.isFading = false;
      this._closeTimerId = null;
    }, this._fadeDurationMs);
  }

  public get alertType(): string {
    return (this.AlertType || 'Info').trim();
  }

  public get alertBootstrapClass(): string {
    switch (this.alertType) {
      case 'Error':
      case 'Danger':
        return 'alert-danger';
      case 'Success':
        return 'alert-success';
      case 'Warning':
        return 'alert-warning';
      case 'Download':
      case 'Info':
      default:
        return 'alert-info';
    }
  }

  public get alertToneClass(): string {
    switch (this.alertType) {
      case 'Download':
        return 'alert-download';
      case 'Error':
        return 'alert-error';
      case 'Success':
        return 'alert-success-tone';
      case 'Warning':
        return 'alert-warning-tone';
      case 'Danger':
        return 'alert-danger-tone';
      case 'Info':
      default:
        return 'alert-info-tone';
    }
  }

  public get isClosable(): boolean {
    return this.alertType === 'Error' || this.alertType === 'Danger';
  }

}
