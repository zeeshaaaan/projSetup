import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { LoggerService } from '../../app-logger/services/logger.service';
import { HttpRequestExtras,UrlParams } from '../interfaces/http-extras.interface';
import RetryPolicy from './retry-policy';
import { ApiConfigModel } from '../models/api-config.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient, private logger:LoggerService) { }

  createEndPointRequest(apiConfig:ApiConfigModel,params?:HttpRequestExtras):Observable<any>{
    if(apiConfig){
      const mappedUrl=this.getFullEndpointUrl(apiConfig,params?.urlParameters);
      const optionalHeaders=this.setOptionalHeaderAndParams(apiConfig,params?.queryParams);
      let serviceMethod:Observable<any>;

      switch (apiConfig.method){
        case 'GET':
          serviceMethod=this.get(mappedUrl,optionalHeaders);
          break;
          case 'PUT':
          serviceMethod=this.put(mappedUrl,params?.requestBody,optionalHeaders);
          break;
          case 'POST':
          serviceMethod=this.post(mappedUrl,params?.requestBody,optionalHeaders);
          break;
          case 'DELETE':
          serviceMethod=this.delete(mappedUrl,optionalHeaders);
          break;
      }
      return  apiConfig.isRetryAllowed ? serviceMethod.pipe(RetryPolicy()) : serviceMethod;
    }
    return throwError('Invalid API config');
  }

  private get(url:string,optionalHeaders:OptionalHeaders):Observable<any>{
    this.logger.entering(`entering HTTPService.get ${JSON.stringify(url)}`);
    return this.httpClient.get(url, optionalHeaders);
  }

  private post(url:string,requestBody:any,optionalHeaders:OptionalHeaders):Observable<any>{
    this.logger.entering(`entering HTTPService.post ${JSON.stringify(url)}`);
    return this.httpClient.post(url,requestBody,optionalHeaders);
  }

  private put(url:string,requestBody:any,optionalHeaders:OptionalHeaders):Observable<any>{
    this.logger.entering(`entering HTTPService.put ${JSON.stringify(url)}`);
    return this.httpClient.put(url,requestBody,optionalHeaders);
  }

  private delete(url:string,optionalHeaders:OptionalHeaders):Observable<any>{
    this.logger.entering(`entering HTTPService.delete ${JSON.stringify(url)}`);
    return this.httpClient.get(url, optionalHeaders);
  }

  private getFullEndpointUrl(apiConfig:ApiConfigModel,params?:UrlParams):string{
    const urlWithParams=this.setUrlParams(apiConfig.pathTemplate,params);
    const fullUrl=`${environment.apiEndPoints[apiConfig.module]}/${urlWithParams}`;
    return fullUrl;
  }

  private setUrlParams(url:string,parameters?:UrlParams){
    if(!parameters){
      return url;
    }

    let parsedUrl = url;
      for(const key in parameters){
        if(parameters.hasOwnProperty(key)){
          parsedUrl=parsedUrl.replace(`{${key}}`, `${parameters[key]}`);
        }
      }
      return parsedUrl;
  }

  private setOptionalHeaderAndParams(apiConfig: ApiConfigModel,params?:UrlParams):OptionalHeaders{
    return{
      withCredentials : apiConfig.useHttpCookies,
      params
    };
  }
}

type OptionalHeaders={
  headers?: HttpHeaders | { [header:string]:string | string[];};
  params?: HttpParams | { [param:string]:string | string[];};
  withCredentials?:boolean;
};
