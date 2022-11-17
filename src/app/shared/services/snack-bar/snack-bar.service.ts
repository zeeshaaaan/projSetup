import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackbar:MatSnackBar,
  ) { }

  triggerSnackBar(message:string,action='close'){
    this.snackbar.open(message,action);
  }
}
