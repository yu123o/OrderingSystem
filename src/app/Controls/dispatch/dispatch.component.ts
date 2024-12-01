import { Component, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ReturnOrderDetail } from 'src/app/Cors/Models/OrdersDetailInfo/ReturnOrderDetail';
import { SearchOrderDetail } from 'src/app/Cors/Models/OrdersDetailInfo/SearchOrderDetail';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent {
  ShowSpinner: boolean = false
  formGroup: FormGroup = new FormGroup({})
  searchOrderDetail: SearchOrderDetail = new SearchOrderDetail()
  returnOrderDetail: ReturnOrderDetail[] = []
  returnStatment: ReturnOrderDetail[] = []
  totalrows: number = 0
  visible: boolean = false;

  DisplayColumns: string[] = [
    "RequestsScreen.OrderNo",
    "RequestsScreen.CustomerNo",
    "RequestsScreen.Name",
    "RequestsScreen.OrderDate",
    "RequestsScreen.PieceName",
    "RequestsScreen.SKU",
    "RequestsScreen.Unit",
    "RequestsScreen.Price",
    "RequestsScreen.Cost",
    "RequestsScreen.PurchasePackageNo",
    "RequestsScreen.Dispatch",

  ]

  constructor(public translate: TranslateService, public router: Router, public service: GenericServiceService, public messageService: MessageService) {

  }

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.initFormGroup()
    this.ReturnOrderDetails()
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      PurchaseOrderNo: new FormControl(this.searchOrderDetail.PurchaseOrderNo, [Validators.required]),
      Dispatch: new FormControl(this.searchOrderDetail.Dispatch, [Validators.required]),
    })
  }
  async ReturnOrderDetails() {
    this.ShowSpinner = true
    let data = await this.service.Services(this.searchOrderDetail, API.ReturnOrderDetail).subscribe((data: ReturnOrderDetail[]) => {
      this.totalrows = data[0].TotalRows
      this.returnOrderDetail = data
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);
  }
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  click() {
    
  }
  async ReturnStatments() {
    this.ShowSpinner = true
    let data = await this.service.Services(this.searchOrderDetail, API.ReturnOrderDetail).subscribe((data: ReturnOrderDetail[]) => {
      this.returnStatment = data
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);
  }

  async SaveStatments() {


    this.ShowSpinner = true
    let data = await this.service.Services(this.returnStatment, API.SaveOrderDetail).subscribe(async (data: any) => {
      console.log(data)
      let obj = await this.service.Notification(data[0].QueryResult)
      this.messageService.add({ severity: obj[1], detail: obj[0] })
      this.visible = false
      setTimeout(() => {
        this.ShowSpinner = false
      }, 1000);
    })
    this.visible = false
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);

  }
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
    if (event.keyCode === 13) {
      // this.addShowroom();
      if(this.inputFocused){
        this.ReturnOrderDetails()
      }
      else{
        this.Dispatch()
      }
    }
  }
  inputFocused:boolean=false
  onFocus(){
    this.inputFocused = true
  }
  onBlur(){
    this.inputFocused = false
  }

  async Dispatch() {


    this.ShowSpinner = true
    let data = await this.service.Services(this.searchOrderDetail, API.SaveOrderDetail).subscribe(async (data: any) => {
      console.log(data)
      let obj = await this.service.Notification(data[0].QueryResult)
      this.messageService.add({ severity: obj[1], detail: obj[0] })
      this.visible = false
      setTimeout(() => {
        // this.returnOrderDetail.reverse()
        // this.returnOrderDetail.pop()
        // this.returnOrderDetail.reverse()
        
        this.returnOrderDetail = this.returnOrderDetail.filter(order => order.No !== this.returnOrderDetail[0].No)
        this.ShowSpinner = false
      }, 1000);
    })
    this.visible = false
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);

  }
}
