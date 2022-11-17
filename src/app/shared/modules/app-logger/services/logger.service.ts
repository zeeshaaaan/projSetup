import { Injectable } from '@angular/core';
import {LogConfig} from '../models/logger-config.model'
import ILogger from '../interfaces/logger.interface';
import LogLevel from '../enums/log-level.enum';
import LogObject from '../models/log-entry.model';
import { LoggerHttpService } from './logger-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  private logConfig=new LogConfig();
  private serverLogs:any[]=[];

  constructor(private httpService:LoggerHttpService) { }

  public entering(methodname:string):void{
    this.trace('Entering ' + methodname);
  }

  public exiting(methodname:string):void{
    this.trace('Exiting ' + methodname);
  }

  public trace(message:Error|string):void{
    this.logMessage(LogLevel.TRACE,message);
  }

  public debug(message:Error|string):void{
    this.logMessage(LogLevel.DEBUG,message);
  }

  public info(message:Error|string):void{
    this.logMessage(LogLevel.INFO,message);
  }

  public log(message:Error|string):void{
    this.logMessage(LogLevel.LOG,message);
  }

  public warn(message:Error|string):void{
    this.logMessage(LogLevel.WARN,message);
  }

  public error(message:Error|string):void{
    this.logMessage(LogLevel.ERROR,message);
  }

  public fatal(message:Error|string):void{
    this.logMessage(LogLevel.FATAL,message);
  }





  public logMessage(logLevel:LogLevel,message:Error|string):void{
    const logOnConsole=this.logConfig.logOnConsole;
    const logOnServer=this.logConfig.logOnServer;

    if(!(message&&(logOnConsole||logOnServer))){
      return;
    }

    message=message instanceof Error ?(message.stack || '') : message;

    if(logOnConsole){
      this.logOnConsole(logLevel,message)
    }

    if(logOnServer){
      this.serverLogs.push(this.createLogObject(message,logLevel));
      if(this.serverLogs.length>=this.logConfig.SERVER_LOG_THRESHOLD){
        this.httpService.logOnServer(this.logConfig.url,this.serverLogs)
        .subscribe((response:any)=>{
          console.log(response);
          
        },()=>{
          console.log('could not send log data to server');
          
        })
      }
    }
  }

  private logOnConsole(logLevel:LogLevel,message:string):void{
    switch(logLevel){
      case LogLevel.WARN:
        console.warn(message);
        break;
        case LogLevel.INFO:
        console.log(message);
        break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(message);
          break;
          default:
            console.log(message);
    }
  }

  private createLogObject(message:Error |string, logLevelText:string):LogObject{
    const timestamp = new Date().toISOString;
    message=message instanceof Error ? (message.stack || '') : message;

    return new LogObject({
      message,
      time:timestamp,
      level:logLevelText
    });
  }

}
