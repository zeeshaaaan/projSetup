import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedRoutingModule } from './shared-routing.module';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


const directives=[] as const;

const components=[] as const;

const pipes=[] as const;

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSnackBarModule,
    AngularMaterialModule
  ],
  exports:[
    AngularMaterialModule
  ],
  providers:[
    SnackBarService
  ]
})
export class SharedModule { }
