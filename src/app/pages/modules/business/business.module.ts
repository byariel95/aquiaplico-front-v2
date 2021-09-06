import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobsComponent } from './pages/post-jobs/post-jobs.component';
import { RouterModule } from '@angular/router';
import { businessRoutes } from './bussiness.routing';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    PostJobsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(businessRoutes)
  ]
})
export class BusinessModule {}