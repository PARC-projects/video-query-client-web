import { Injectable } from '@angular/core';

export enum AlertType {
  Primary = 'alert-primary',
  Secondary = 'alert-secondary',
  Success = 'alert-success',
  Danger = 'alert-danger',
  Warning = 'alert-warning',
  Info = 'alert-info',
  Light = 'alert-light',
  Dark = 'alert-dark'
}

@Injectable()
export class AlertService {
  text: string;
  type: AlertType;
  show = false;

  setAlert(text: string, type: AlertType): void {
    this.text = text;
    this.type = type;
    this.show = true;
  }
}
