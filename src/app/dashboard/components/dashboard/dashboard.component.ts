import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users:any;

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.dashboardService
    .getuser()
    .subscribe(res=>{
      console.log(res);
      this.users=res;
    })
  }

}
