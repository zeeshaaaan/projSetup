import { Injectable } from '@angular/core';
import { HttpBackend,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerHttpService {

  constructor(private readonly httpBackend:HttpBackend) { }

  logOnServer(url:string,log:any){
    const req =new HttpRequest<any>('POST',url,log);
    return this.httpBackend.handle(req);
  }
}
