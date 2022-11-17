import { environment } from "src/environments/environment";

export class ApiConfigModel{
    module: ApiModuleName;
    pathTemplate:string;
    method:ApiMethod;
    isRetryAllowed?:boolean;
    useHttpCookies?:boolean;
    isBlocking?:boolean;
    isSilent?:boolean;

/** 
@param module
@param pathTemplate
@param method
*/

constructor( config:ApiConfigModel)
{
   if(Object.keys(environment.apiEndPoints).includes(config.module)){
    this.module=config.module;
    this.pathTemplate=config.pathTemplate;
    this.method=config.method;
    this.isRetryAllowed=config.isRetryAllowed || false;
    this.useHttpCookies=config.useHttpCookies||false;
    this.isBlocking=typeof config.isBlocking === 'undefined'? true : config.isBlocking;
    this.isSilent=config.isSilent||false;
   }else{
    throw new Error(('Invalid Module name'))
   }
}


}

type ApiModuleName=keyof typeof environment.apiEndPoints;
type ApiMethod='GET' | 'POST' | 'PUT' | 'DELETE';