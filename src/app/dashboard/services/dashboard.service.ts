import { Injectable } from '@angular/core';
import apiUrlConfigs from 'src/app/shared/modules/http-layer/config/api-urls.config';
import { ApiService } from 'src/app/shared/modules/http-layer/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService:ApiService,
  ) { }

  getuser(){
    return this.httpService.invoke(apiUrlConfigs.getuser);
  }
  
}
