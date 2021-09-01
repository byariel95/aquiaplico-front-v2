import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
