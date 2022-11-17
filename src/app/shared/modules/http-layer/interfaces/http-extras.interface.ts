export interface HttpRequestExtras{
    urlParameters?:UrlParams;
    queryParams?:UrlParams;
    requestBody?:any;
}

export type UrlParams=Record<any,any>