import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { Observable,of,throwError } from 'rxjs';
import { catchError,map } from 'rxjs';
import { LoaderServiceService } from 'src/app/shared/services/loader-service/loader-service.service';
import { HttpRequestExtras } from '../interfaces/http-extras.interface';
import { ApiConfigModel } from '../models/api-config.model';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService,
              private loaderService: LoaderServiceService,
              private snackBar: SnackBarService       
    ) { }

    invoke(apiConfig:ApiConfigModel, params?:HttpRequestExtras):Observable<any>{
      if(apiConfig.isBlocking){
        this.loaderService.toggleLoader(true);
      }

      return this.httpService.createEndPointRequest(apiConfig,params)
      .pipe(
        map((responseData)=>{
          if(apiConfig.isBlocking){
            this.loaderService.toggleLoader(false);
          }

          if(responseData.errorDetails){
            throw responseData.errorDetails;
          }
          else{
            if((apiConfig.method == 'POST' || apiConfig.method =='PUT') && !apiConfig.isSilent){
              this.snackBar.triggerSnackBar("SUCCESS")
            }
            return responseData;
          }
        }),
        // catchError((error:HttpErrorResponse)=>{
        //   if(apiConfig.isBlocking){
        //     this.loaderService.toggleLoader(false);
        //   }
        //   this.snackBar.triggerSnackBar('Something went wrong!');
        //   if (error.status ===500){
        //     return of(error.error.reponse)
        //   }
        //   return throwError(error);

        // })
      )

    }
}
