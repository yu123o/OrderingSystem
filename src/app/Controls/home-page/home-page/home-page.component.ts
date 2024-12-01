import { Component } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, MaxValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReturnCustomer } from 'src/app/Cors/Models/CustomerInfo/ReturnCustomer';
import { SearchCustomer } from 'src/app/Cors/Models/CustomerInfo/SearchCustomer';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';
import { LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MessageService]
})
export class HomePageComponent {
  displayColumns: string[] = [
    "CustomersScreen.Name",
    "CustomersScreen.Mobile1",
    "CustomersScreen.Mobile2",
    "CustomersScreen.DeliveryName",
    "CustomersScreen.DeliveryMobile",
    ""
  ]
  ShowSpinner: boolean = false
  customers: ReturnCustomer[] = [];
  formGroup: FormGroup = new FormGroup({})
  searchCustomer: SearchCustomer = new SearchCustomer()
  returnCustomer: ReturnCustomer[] = []
  constructor(public translate: TranslateService, public router: Router, public service: GenericServiceService, public messageService: MessageService) {
  }
  ngOnInit() {
    this.searchCustomer.PageIndex = 1
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.initFormGroup()
    this.ReturnCustomer()
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.searchCustomer.Name, [Validators.required]),
      Mobile: new FormControl(this.searchCustomer.Mobile, [Validators.required])
    })
  }
  submit() {
  }
  Reset() {
    this.searchCustomer = new SearchCustomer()
    this.formGroup.reset()
    this.initFormGroup()
  }
  totalrows: number = 0
  async ReturnCustomer() {
    if (this.searchCustomer.PageIndex == null) {
      this.searchCustomer.PageIndex = 1
    }
    this.searchCustomer.PageSize = 5
    this.searchCustomer.PageIndex = null
    this.searchCustomer.PageSize = null

    this.ShowSpinner = true


    let data = await this.service.Services(this.searchCustomer, API.ReturnCustomer).subscribe((data: ReturnCustomer[]) => {
      this.totalrows = data[0].TotalRows
      this.returnCustomer = data
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);

  }
  customSort(event: any) {

    if (!this.searchCustomer.OrderByDirection) {
      this.searchCustomer.OrderByDirection = "DESC"
    }
    this.searchCustomer.OrderBy = event.field?.substring(event.field?.indexOf('.') + 1, event.field?.length)
    this.searchCustomer.OrderByDirection = this.searchCustomer.OrderByDirection == "ASC" ? "DESC" : "ASC"
    this.ReturnCustomer()
  }
  onPageChange(event: any) {
    this.searchCustomer.PageIndex = event.first / 5 + 1

    this.ReturnCustomer()
  }

  items: any[];

  selectedItem: any;

  suggestions: any[];

  search(e: any) {


    e.selectionStart = 1
    e.selectionEnd = 3

    console.log('hh', e)
  }
}
