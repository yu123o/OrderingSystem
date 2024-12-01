import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DispatchComponent } from './dispatch.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthGuardServiceService } from 'src/app/Cors/Service/auth-guard-service.service';

const routes: Routes = [
  {
    path: "", component: DispatchComponent,
    canActivate: [ AuthGuardServiceService ]
  },
  {
    path: "Dispatch", component: DispatchComponent,
    canActivate: [ AuthGuardServiceService ]
  },
]

@NgModule({
  declarations: [
    DispatchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule,
    RadioButtonModule,
    TableModule,
    ToolbarModule,
    ProgressSpinnerModule,
    DialogModule,
ButtonModule
  ]
})
export class DipatchModule { }
