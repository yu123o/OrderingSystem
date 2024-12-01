import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ReturnCustomer } from 'src/app/Cors/Models/CustomerInfo/ReturnCustomer';
import { SearchCustomer } from 'src/app/Cors/Models/CustomerInfo/SearchCustomer';
import { ReturnOrderDetail } from 'src/app/Cors/Models/OrdersDetailInfo/ReturnOrderDetail';
import { SaveOrderDetail } from 'src/app/Cors/Models/OrdersDetailInfo/SaveOrderDetail';
import { SearchOrderDetail } from 'src/app/Cors/Models/OrdersDetailInfo/SearchOrderDetail';
import { ReturnOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/ReturnOrderMaster';
import { SaveOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/SaveOrderMaster';
import { SearchOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/SearchOrderMaster';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';
import { Actions } from 'src/app/Cors/enums/Actions/Actions';

@Component({
  selector: 'app-edit-orders-info',
  templateUrl: './edit-orders-info.component.html',
  styleUrls: ['./edit-orders-info.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditOrdersInfoComponent {
  formGroup: FormGroup = new FormGroup({})
  returnOrderMaster: ReturnOrderMaster = new ReturnOrderMaster()
  returnOrderDetail: ReturnOrderDetail[] = []
  DisplayColumns: string[] = [
    "RequestsScreen.Count",
    "RequestsScreen.PieceName",
    "RequestsScreen.SizeOrColor",
    "RequestsScreen.SKU",
    "RequestsScreen.Price",
    "RequestsScreen.DeliveryDateFromShein",
    "RequestsScreen.OrderNumberInShein",
    "RequestsScreen.Sorted",
    ""
  ]
  searchOrderMaster: SearchOrderMaster = new SearchOrderMaster()
  searchOrderDetail: SearchOrderDetail = new SearchOrderDetail()
  searchCustomerByMobile: SearchCustomer = new SearchCustomer()
  returnCustomerByName: ReturnCustomer[] = []
  ShowSpinner: boolean = false

  constructor(public translate: TranslateService, public router: Router, public route: ActivatedRoute, public confirmationService: ConfirmationService, public service: GenericServiceService, public messageService: MessageService) {
    console.log(router.url)
  }
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.initFormGroup()
    this.searchOrderDetail.PageIndex = 1
    this.searchOrderDetail.PageSize = 5
    this.searchOrderDetail.OrderMaster = this.searchOrderMaster.EntityID = Number(this.route.snapshot.paramMap.get("Id")?.substring(1))
    this.ReturnOrderMaster()
    this.ReturnOrderDetails()
  }
  totalrows: number = 0
  async ReturnOrderMaster() {
    this.ShowSpinner = true

    this.searchOrderDetail.PageIndex = null
    this.searchOrderDetail.PageSize = null
    let data = await this.service.Services(this.searchOrderMaster, API.ReturnOrderMaster).subscribe((data: ReturnOrderMaster[]) => {
      this.returnOrderMaster = data[0]
      this.returnOrderMaster.OrderDate = new Date(data[0].OrderDate)
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);
  }
  async ReturnOrderDetails() {
    this.ShowSpinner = true
    let data = await this.service.Services(this.searchOrderDetail, API.ReturnOrderDetail).subscribe((data: ReturnOrderDetail[]) => {
      this.totalrows = data[0].TotalRows
      this.returnOrderDetail = data
      setTimeout(() => {
        this.ShowSpinner = false
      }, 50);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 100);
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      CustomerName: new FormControl(this.returnOrderMaster.CustomerName, [Validators.required]),
      Mobile: new FormControl(this.returnOrderMaster.Mobile, [Validators.required]),
      OrderDate: new FormControl(this.returnOrderMaster.OrderDate, [Validators.required]),
      EntityID: new FormControl(this.returnOrderMaster.EntityID, [Validators.required]),
      ShipFees: new FormControl(this.returnOrderMaster.ShipFees, [Validators.required]),
      Notes: new FormControl(this.returnOrderMaster.Notes, [Validators.required]),
      StatusText: new FormControl(this.returnOrderMaster.StatusText, [Validators.required]),
    })
  }

  async ReturnCustomerByMobile() {
    // this.searchCustomer.PageIndex = 1
    this.searchCustomerByMobile.Mobile = this.returnOrderMaster.Mobile
    let data = await this.service.Services(this.searchCustomerByMobile, API.ReturnCustomer).subscribe((data: ReturnCustomer[]) => {
      this.returnCustomerByName = data
      if (data) {
        // this.saveCustomer = <SaveCustomer>data[0]
        this.returnOrderMaster.Customer = data[0].EntityID
        this.returnOrderMaster.CustomerName = data[0].Name
        this.returnOrderMaster.Mobile = data[0].Mobile
      }
    })
  }
  products: any[];

  statuses: SelectItem[];

  clonedProducts: { [s: string]: any } = {};
  onRowEditInit(product: any) {
    this.clonedProducts[product.id] = { ...product };
  }
  saveOrderDetail: SaveOrderDetail = new SaveOrderDetail()
  async onRowEditSave(orderDetails: SaveOrderDetail) {
    this.confirmationService.confirm({
      message: this.translate.instant('Messages.ConfirmMessage'),
      header: this.translate.instant('Messages.Confirmation'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('Messages.Yes'),
      rejectLabel: this.translate.instant('Messages.No'),
      accept: async () => {
        this.saveOrderDetail.Action = Actions.Update
        this.saveOrderDetail.OrderMaster = Number(this.route.snapshot.paramMap.get("Id")?.substring(1))
        this.saveOrderDetail.EntityID = orderDetails.EntityID
        this.saveOrderDetail.Qty = orderDetails.Qty
        this.saveOrderDetail.Price = orderDetails.Price
        this.saveOrderDetail.SKU = orderDetails.SKU
        this.saveOrderDetail.ItemCaption = orderDetails.ItemCaption
        this.saveOrderDetail.Unit = orderDetails.Unit
        let data = await this.service.Services(this.saveOrderDetail, API.SaveOrderDetail).subscribe(async (data: any) => {
          console.log(data)
          let obj = await this.service.Notification(data[0].QueryResult)
          this.messageService.add({ severity: obj[1], detail: obj[0] })
          this.ReturnOrderDetails()
        })
      },
      reject: (type: any) => {
        this.ReturnOrderDetails()
      }
    });
  }
  saveOrderMaster: SaveOrderMaster = new SaveOrderMaster()
  async SaveOrderMaster() {
    this.confirmationService.confirm({
      message: this.translate.instant('Messages.ConfirmMessage'),
      header: this.translate.instant('Messages.Confirmation'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('Messages.Yes'),
      rejectLabel: this.translate.instant('Messages.No'),
      accept: async () => {
        this.ShowSpinner = true
        this.saveOrderMaster.Action = Actions.Update
        this.saveOrderMaster.EntityID = Number(this.route.snapshot.paramMap.get("Id")?.substring(1))
        this.saveOrderMaster.Customer = this.returnOrderMaster.Customer
        this.saveOrderMaster.OrderDate = this.returnOrderMaster.OrderDate
        this.saveOrderMaster.ShipFees = this.returnOrderMaster.ShipFees
        this.saveOrderMaster.Notes = this.returnOrderMaster.Notes
        let data = await this.service.Services(this.saveOrderMaster, API.SaveOrderMaster).subscribe(async (data: any) => {
          console.log(data)
          let obj = await this.service.Notification(data[0].QueryResult)
          this.messageService.add({ severity: obj[1], detail: obj[0] })
          setTimeout(() => {
            this.ShowSpinner = false
            if (obj[1] == "success")
              this.router.navigateByUrl('/Systems/Orders')
          }, 500);
        })
        setTimeout(() => {
          this.ShowSpinner = false
        }, 1000);
      },
      reject: (type: any) => {
        this.ReturnOrderDetails()
      }
    });
  }
  onRowEditCancel(product: any, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }
  onPageChange(event: any) {
    this.searchOrderMaster.PageIndex = event.first / 5 + 1
    this.ReturnOrderMaster()
  }
}
