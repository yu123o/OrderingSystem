import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageModule } from '../Controls/home-page/home-page.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: "", component: ContentComponent,
    children: [
    {
      path: "HomePage", loadChildren: () => import('../Controls/home-page/home-page.module').then(m => m.HomePageModule)
    },
    {
      path: "Orders", loadChildren: () => import('../Controls/orders-screen/orders-screen.module').then(m => m.OrdersScreenModule)
    },
    {
      path: "Dispatch", loadChildren: () => import('../Controls/dispatch/dispatch.module').then(m => m.DipatchModule)
    },
  ],
  
  },
 
]

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    // HomePageModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    TranslateModule,
    MenubarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule
  ],
  exports: [
    RouterModule,
    ContentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule { }
