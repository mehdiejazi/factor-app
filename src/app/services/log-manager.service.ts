import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogManagerService {

  constructor() {

    this.reset();

  }

  private informationMessages: string[] = [];
  private warningMessages: string[] = [];
  private errorMessages: string[] = [];

  private reset() {

    this.informationMessages = [];
    this.warningMessages = [];
    this.errorMessages = [];

  }

  public logInformation(info: string) {
  
    this.informationMessages.push(info);
  
  }


  public logWarning(warn: string){

    this.informationMessages.push(warn);
  
  }


  public logError(err: string){
    
    this.errorMessages.push(err);

  }
}
