import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';


const matModule = [
  MatChipsModule,
  MatDialogModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  CommonModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
]
@NgModule({
  imports: [
    [...matModule]

  ],
  exports: [
    [...matModule]
  ]
})
export class MaterialModule { }
