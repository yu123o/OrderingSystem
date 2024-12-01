import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { SaveCustomer } from 'src/app/Cors/Models/CustomerInfo/SaveCustomer';
import { ReturnOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/ReturnOrderMaster';
import { SaveOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/SaveOrderMaster';
import { SearchOrderMaster } from 'src/app/Cors/Models/OrdersMasterInfo/SearchOrderMaster';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';
import { Actions } from 'src/app/Cors/enums/Actions/Actions';


@Component({
  selector: 'app-orders-screen',
  templateUrl: './orders-screen.component.html',
  styleUrls: ['./orders-screen.component.css'],
  providers: [MessageService]
})
export class OrdersScreenComponent {
  visible: boolean = false;
  ShowSpinner: boolean = false


  choosedId: number = 0

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: this.translate.instant("RequestsScreen.EditReceiptInformation"),
          icon: 'pi pi-pencil',
          command: () => {
            // this.showDialog();
            this.OpenDialog(this.choosedId)
          }
        },
        {
          label: this.translate.instant("PageTitle.EditRequests"),
          icon: 'pi pi-pencil',
          command: () => {
            // this.delete();
            this.router.navigateByUrl("/Systems/Orders/EditOrdersInfo/:" + this.choosedId)
          }
        },
        {
          label: this.translate.instant("RequestsScreen.PrintLable"),
          icon: 'pi pi-print',
          command: () => {
            this.PrintLabel()
            // this.delete();
          }
        }
      ]
    }
  ];

  customers: [] = [];
  formGroup: FormGroup = new FormGroup({})
  formGroupDialog: FormGroup = new FormGroup({})

  searchOrderMaster: SearchOrderMaster = new SearchOrderMaster()
  saveOrderMaster: SaveOrderMaster = new SaveOrderMaster()
  returnOrderMaster: ReturnOrderMaster[] = []
  status: SelectItem[] = [
    { label: this.translate.instant('Status.Status1'), value: 1 },
    { label: this.translate.instant('Status.Status2'), value: 2 },
    { label: this.translate.instant('Status.Status3'), value: 3 },
    { label: this.translate.instant('Status.Status4'), value: 4 },
    { label: this.translate.instant('Status.Status5'), value: 5 },
    { label: this.translate.instant('Status.Status6'), value: 6 },
    { label: this.translate.instant('Status.Status7'), value: 7 },
    { label: this.translate.instant('Status.Status8'), value: 8 },
  ];
  displayColumns: string[] = [
    "",
    "RequestsScreen.OrderNumber",
    "RequestsScreen.CustomerName",
    "RequestsScreen.Mobile",
    "RequestsScreen.OrderDate",
    "RequestsScreen.ShipFees",
    "RequestsScreen.ItemsCount",
    "RequestsScreen.OrderTotal",
    "RequestsScreen.DateOfDelivery",
    "RequestsScreen.PolicyDate",
    "RequestsScreen.AqusdByDlvry",
    "RequestsScreen.RecievedAmount",
    "RequestsScreen.Status"
  ]
  dialogDisplayColumns: string[] = [
    "RequestsScreen.Count",
    "RequestsScreen.PieceName",
    "RequestsScreen.SizeOrColor",
    "RequestsScreen.SKU",
    "RequestsScreen.Price",
    "RequestsScreen.DeliveryDateFromShein",
    "RequestsScreen.OrderNumberInShein",
    "RequestsScreen.Sorted",

  ]
  selectedCountry: string = "";
  constructor(public translate: TranslateService, public router: Router, public service: GenericServiceService, public messageService: MessageService) {
    console.log(router.url)
  }
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    this.initFormGroup()
    this.ReturnOrderMaster()
    // this.searchOrderMaster.OrderByDirection = null
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.searchOrderMaster.Name, [Validators.required]),
      Mobile: new FormControl(this.searchOrderMaster.Mobile, [Validators.required]),
      MinOrderDate: new FormControl(this.searchOrderMaster.MinOrderDate, [Validators.required]),
      MaxOrderDate: new FormControl(this.searchOrderMaster.MaxOrderDate, [Validators.required]),
      MinAqusdByDlvry: new FormControl(this.searchOrderMaster.MinAqusdByDlvry, [Validators.required]),
      MaxAqusdByDlvry: new FormControl(this.searchOrderMaster.MaxAqusdByDlvry, [Validators.required]),
      Status: new FormControl(this.searchOrderMaster.Status, [Validators.required]),

    })
    this.formGroupDialog = new FormGroup({
      Status: new FormControl(this.saveOrderMaster.Status, [Validators.required]),
      ReceivedAmount: new FormControl(this.saveOrderMaster.ReceivedAmount, [Validators.required]),
      OrderDate: new FormControl(this.saveOrderMaster.OrderDate, [Validators.required]),
      AqusdByDlvry: new FormControl(this.saveOrderMaster.AqusdByDlvry, [Validators.required]),

    })
  }
  submit() {
    console.log(this.formGroup.get('CustomerName')?.value + "    " + this.formGroup?.get('PhoneNumber')?.value)
  }
  Reset() {
    this.searchOrderMaster = new SearchOrderMaster()
    this.formGroup.reset()
    this.initFormGroup()
  }
  showDialog() {
    this.visible = true;
  }
  totalrows: number = 0

  async ReturnOrderMaster() {
    this.ShowSpinner = true
    let data = await this.service.Services(this.searchOrderMaster, API.ReturnOrderMaster).subscribe((data: ReturnOrderMaster[]) => {
      this.totalrows = data[0].TotalRows

      this.returnOrderMaster = data
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);
  }
  customSort(event: any) {

    if (this.searchOrderMaster.OrderByDirection) {
      this.searchOrderMaster.OrderByDirection = "DESC"
    }
    this.searchOrderMaster.OrderBy = event.field?.substring(event.field?.indexOf('.') + 1, event.field?.length)
    this.searchOrderMaster.OrderByDirection = this.searchOrderMaster.OrderByDirection == "ASC" ? "DESC" : "ASC"
    this.ReturnOrderMaster()
  }


  onPageChange(event: any) {
    this.searchOrderMaster.PageIndex = event.first / 5 + 1

    this.ReturnOrderMaster()
  }
  async OpenDialog(event: any) {
    console.log("event=====>", event);

    await this.returnOrderMaster.forEach(element => {
      if (element.EntityID == event) {
        this.saveOrderMaster.Status = element.Status
        this.saveOrderMaster.ReceivedAmount = element.ReceivedAmount
        this.saveOrderMaster.OrderDate = new Date(element.OrderDate)
        this.saveOrderMaster.AqusdByDlvry = new Date(element.AqusdByDlvry)


        this.saveOrderMaster.EntityID = element.EntityID
        this.saveOrderMaster.Customer = element.Customer
        this.saveOrderMaster.OrderTotal = element.OrderTotal
        this.saveOrderMaster.DueDate = new Date(element.DueDate)
        this.saveOrderMaster.ShipToAddress = element.ShipToAddress
        this.saveOrderMaster.ShipMethod = element.ShipMethod
        this.saveOrderMaster.ShipFees = element.ShipFees
        this.saveOrderMaster.ShipReference = element.ShipReference

        this.saveOrderMaster.ReceivedAmount = element.ReceivedAmount
        this.saveOrderMaster.ConcernedWithReceiving = element.ConcernedWithReceiving
        this.saveOrderMaster.ConcernedWithReceivingPhone = element.ConcernedWithReceivingPhone
        this.saveOrderMaster.ListPrinted = element.ListPrinted
      }
    })
    this.visible = true;
  }
  async SaveOrderMaster() {
    this.saveOrderMaster.Action = Actions.Update
    let data = await this.service.Services(this.saveOrderMaster, API.SaveOrderMaster).subscribe(async (data: any[]) => {
      let obj = await this.service.Notification(data[0].QueryResult)
      await this.messageService.add({ severity: obj[1], detail: obj[0] })

      if (obj[1] == "success") {
        this.visible = false;
        this.ReturnOrderMaster()
      }
    })
  }
  PrintPDF() {
    console.log("PDF", this.searchOrderMaster)
  }
  PrintExcel() {
    console.log("Excel", this.searchOrderMaster)
  }
  PrintLabel() {
    console.log("Label", this.searchOrderMaster , "    ID:" , this.choosedId)
  }
}
