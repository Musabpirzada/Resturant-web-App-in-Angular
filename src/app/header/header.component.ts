import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dia: MatDialog) { }

  ngOnInit(): void {
  }
openLogin(){
  this.dia.open(LoginComponent, {width: '600px', height: '500px'});
}
}
