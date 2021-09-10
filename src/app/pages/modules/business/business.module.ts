import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobsComponent } from './pages/post-jobs/post-jobs.component';
import { RouterModule } from '@angular/router';
import { businessRoutes } from './bussiness.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true}

@NgModule({
  declarations: [
    PostJobsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    RouterModule.forChild(businessRoutes),
    AngularEditorModule,
  ],
  providers: [
    {provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
  ],
})
export class BusinessModule {}