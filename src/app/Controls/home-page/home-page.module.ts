import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCustomerInfoComponent } from './view-customer-info/view-customer-info.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthGuardServiceService } from 'src/app/Cors/Service/auth-guard-service.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
  {
    path: "", component: HomePageComponent ,
    canActivate: [ AuthGuardServiceService ]
  },
  {
    path: "AddCustomerInfo", component: ViewCustomerInfoComponent,
    canActivate: [ AuthGuardServiceService ]
  },
  {
    path: "EditCustomerInfo/:Id", component: ViewCustomerInfoComponent,
    canActivate: [ AuthGuardServiceService ]
  },
]

@NgModule({
  declarations: [
    HomePageComponent,
    ViewCustomerInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    TranslateModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DropdownModule,
    ToolbarModule,
    AutoCompleteModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule
  ]
})
export class HomePageModule { }
