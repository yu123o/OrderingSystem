import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersScreenComponent } from './orders-screen/orders-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { EditOrdersInfoComponent } from './edit-orders-info/edit-orders-info.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
  {
    path: "", component: OrdersScreenComponent
  },
  {
    path: "EditOrdersInfo/:Id", component: EditOrdersInfoComponent
  },
]

@NgModule({
  declarations: [
    OrdersScreenComponent,
    EditOrdersInfoComponent
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
    CalendarModule,
    ToolbarModule,
    DialogModule,
    MenuModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule
  ]
})
export class OrdersScreenModule { }
