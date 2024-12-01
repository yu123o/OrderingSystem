import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { ReturnCustomer } from 'src/app/Cors/Models/CustomerInfo/ReturnCustomer';
import { SaveCustomer } from 'src/app/Cors/Models/CustomerInfo/SaveCustomer';
import { SearchCustomer } from 'src/app/Cors/Models/CustomerInfo/SearchCustomer';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';
import { Actions } from 'src/app/Cors/enums/Actions/Actions';
declare var $: any;

@Component({
  selector: 'app-view-customer-info',
  templateUrl: './view-customer-info.component.html',
  styleUrls: ['./view-customer-info.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ViewCustomerInfoComponent {
  customers: [] = [];
  formGroup: FormGroup = new FormGroup({})
  saveCustomer: SaveCustomer = new SaveCustomer()
  AddButton: boolean = false
  EditButton: boolean = false
  title: string = ""
  ShowSpinner: boolean = false

  countries: any[] = [{ name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }];

  selectedCountry: string = "";
  showField: boolean = false
  constructor(public translate: TranslateService, public router: Router, public activatedRoute: ActivatedRoute, public service: GenericServiceService, public route: ActivatedRoute, public confirmationService: ConfirmationService, public messageService: MessageService) {
    console.log(router.url)
  }
  ngOnInit() {

    (() => {
      'use strict'
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          form.classList.add('was-validated')
        }, false)
      })
    })()

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.initFormGroup()
    this.searchCustomer.EntityID = Number(this.route.snapshot.paramMap.get("Id").substring(1))
    this.CheckMode()
    this.saveCustomer.EntityID = Number(this.route.snapshot.paramMap.get("Id")?.substring(1))

  }
  CheckMode() {
    if (this.router.url.includes('AddCustomerInfo')) {
      this.title = "PageTitle.AddCustomerInfo"
      this.AddButton = true
      this.saveCustomer.Action = Actions.Insert
      // this.EditButton = false
    }
    else {
      this.title = "PageTitle.EditCustomerInfo"
      this.ReturnCustomer()
      this.saveCustomer.Action = Actions.Update
      // this.AddButton = false
      this.EditButton = true
    }
  }
  submit() {
    console.log(this.formGroup.get('CustomerName')?.value + "    " + this.formGroup?.get('PhoneNumber')?.value)
  }
  searchCustomer: SearchCustomer = new SearchCustomer()
  searchCustomerByName: SearchCustomer = new SearchCustomer()
  searchCustomerByMobile: SearchCustomer = new SearchCustomer()
  returnCustomerByName: ReturnCustomer[] = []

  async ReturnCustomer() {
    // this.searchCustomer.PageIndex = 1
    this.ShowSpinner = true

    let data = await this.service.Services(this.searchCustomer, API.ReturnCustomer).subscribe((data: ReturnCustomer[]) => {
      this.saveCustomer.Name = data[0].Name
      this.saveCustomer.Mobile = data[0].Mobile
      this.saveCustomer.Mobile2 = data[0].Mobile2
      this.saveCustomer.DeliveryName = data[0].DeliveryName
      this.saveCustomer.DeliveryMobile = data[0].DeliveryMobile
      this.saveCustomer.Notes = data[0].Notes
      this.saveCustomer.Address = data[0].Address
      this.saveCustomer.DeliveryFees = data[0].DeliveryFees
      // this.suggestions.push(this.saveCustomer)
      setTimeout(() => {
        this.ShowSpinner = false
      }, 500);
    })
    setTimeout(() => {
      this.ShowSpinner = false
    }, 1000);
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.saveCustomer.Name, [Validators.required]),
      Mobile: new FormControl(this.saveCustomer.Mobile, [Validators.required]),
      Mobile2: new FormControl(this.saveCustomer.Mobile2, [Validators.required]),
      DeliveryName: new FormControl(this.saveCustomer.DeliveryName, [Validators.required]),
      DeliveryMobile: new FormControl(this.saveCustomer.DeliveryMobile, [Validators.required]),
      Address: new FormControl(this.saveCustomer.Address, [Validators.required]),
      Notes: new FormControl(this.saveCustomer.Notes, [Validators.required]),
      DeliveryFees: new FormControl(this.saveCustomer.DeliveryFees, [Validators.required]),
    })
  }
  Reset() {
    this.saveCustomer = new SaveCustomer()
    this.formGroup.reset()
    this.initFormGroup()
  }
  suggestions: any[];

  async search(event: any) {

    if (this.saveCustomer.Name.length == 3) {
      await this.ReturnCustomerByName(event)


    }
    else{
    this.onSearchChange()}
  }
  async ReturnCustomerByName(event: any) {
    // this.searchCustomer.PageIndex = 1
    this.searchCustomerByName.Name = this.saveCustomer.Name
    let data = await this.service.Services(this.searchCustomerByName, API.ReturnCustomer).subscribe(async (data: ReturnCustomer[]) => {
      this.returnCustomerByName = await data
      // this.suggestions = await this.returnCustomerByName.map(item => item.Name.includes(event.query) ? item : null);
      this.onSearchChange()
      this.showField = true
    })
  }
  async ReturnCustomerByMobile() {
    // this.searchCustomer.PageIndex = 1
    this.searchCustomerByMobile.Mobile = this.saveCustomer.Mobile
    let data = await this.service.Services(this.searchCustomerByMobile, API.ReturnCustomer).subscribe((data: ReturnCustomer[]) => {
      this.returnCustomerByName = data
      if (data) {
        // this.saveCustomer = <SaveCustomer>data[0]
        this.saveCustomer.EntityID = data[0].EntityID
        this.saveCustomer.Name = data[0].Name
        this.saveCustomer.Mobile = data[0].Mobile
        this.saveCustomer.Mobile2 = data[0].Mobile2
        this.saveCustomer.DeliveryName = data[0].DeliveryName
        this.saveCustomer.DeliveryMobile = data[0].DeliveryMobile
        this.saveCustomer.Notes = data[0].Notes
        this.saveCustomer.Address = data[0].Address
        this.saveCustomer.DeliveryFees = data[0].DeliveryFees
      }
    })
  }
  async SaveCustomer() {


    this.confirmationService.confirm({
      message: this.translate.instant('Messages.ConfirmMessage'),
      header: this.translate.instant('Messages.Confirmation'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('Messages.Yes'),
      rejectLabel: this.translate.instant('Messages.No'),
      accept: async () => {
        this.ShowSpinner = true
        let data = await this.service.Services(this.saveCustomer, API.SaveCustomer).subscribe(async (data: any) => {
          console.log(data)
          let obj = await this.service.Notification(data[0].QueryResult)
          this.messageService.add({ severity: obj[1], detail: obj[0] })

          setTimeout(() => {
            this.ShowSpinner = false
            if (obj[1] == "success")
              this.router.navigateByUrl('/Systems/HomePage')
          }, 1000);
        })
      },
      reject: (type: any) => {

      }
    });
    // this.searchCustomer.PageIndex = 1

  }
  SelectName(event: any) {
    console.log(event);
    this.saveCustomer.EntityID = event.EntityID
    this.showField = false
    // this.saveCustomer = <SaveCustomer>event
    this.saveCustomer.Name = event.Name
    this.saveCustomer.Mobile = event.Mobile
    this.saveCustomer.Mobile2 = event.Mobile2
    this.saveCustomer.DeliveryName = event.DeliveryName
    this.saveCustomer.DeliveryMobile = event.DeliveryMobile
    this.saveCustomer.Notes = event.Notes
    this.saveCustomer.Address = event.Address
    this.saveCustomer.DeliveryFees = event.DeliveryFees
  }


  async onSearchChange() {

    let names: any[] = []
    await this.returnCustomerByName.forEach(element => {
      names.push({value:element.Name,id:element.EntityID})
    })
    var self = this;
      $("#autocomplete").autocomplete({
        source: names,
        focus: function () { return false; },
        select: function (event, ui) { debugger
          self.searchCustomer.EntityID = ui.item.id
          self.ReturnCustomer()
        } ,
        open: function (event, ui) {
          
          var firstElement = $(this).data("uiAutocomplete").menu.element[0].children[0]
            , inpt = $('#autocomplete')
            , original = inpt.val()
            , firstElementText = $(firstElement).text();

          /*
             here we want to make sure that we're not matching something that doesn't start
             with what was typed in 
          */
          if (firstElementText.toLowerCase().indexOf(original.toLowerCase()) === 0) {
            
            inpt.val(firstElementText);//change the input to the first match

            inpt[0].selectionStart = original.length; //highlight from end of input
            inpt[0].selectionEnd = firstElementText.length;//highlight to the end
          }
        }

      });
    //   $("#autocomplete").autocomplete({
    //     source: [
    //         "ActionScript",
    //         "AppleScript",
    //         "Asp",
    //         "BASIC",
    //         "C",
    //         "C++",
    //         "Clojure",
    //         "COBOL",
    //         "ColdFusion",
    //         "Erlang",
    //         "Fortran",
    //         "Groovy",
    //         "Haskell",
    //         "Java",
    //         "JavaScript",
    //         "Lisp",
    //         "Perl",
    //         "PHP",
    //         "Python",
    //         "Ruby",
    //         "Scala",
    //         "Scheme"
    //     ],
    //     focus: function() { return false; },
    //     open: function() {
    //        var firstElement = $(this).data("autocomplete").menu.element[0].children[0]
    //            , inpt = $('#autocomplete')
    //            , original = inpt.val()
    //            , firstElementText = $(firstElement).text();

    //         /*
    //            here we want to make sure that we're not matching something that doesn't start
    //            with what was typed in 
    //         */
    //         if(firstElementText.toLowerCase().indexOf(original.toLowerCase()) === 0){
    //             inpt.val(firstElementText);//change the input to the first match

    //             inpt[0].selectionStart = original.length; //highlight from end of input
    //             inpt[0].selectionEnd = firstElementText.length;//highlight to the end
    //         }
    //     }
    // });



    // var input = $('#username');
    // var list = $('#myList');
    // let fruits = [];
    // if (input.val().length > 3) {

    //   for (let i = 0; i < 50000; i++) {
    //     fruits.push(i.toString() + 'Customer' + ';' + i.toString());
    //   }

    //   const filter = input.val().toLowerCase();
    //   const matches = fruits.filter(fruit => fruit.toLowerCase().startsWith(filter));
    //   debugger;
    //   list.innerHTML = '';
    //   matches.forEach(match => {
    //     const item = document.createElement('div');

    //     const myArray = match.split(";");

    //     item.textContent = myArray[0];
    //     item.setAttribute("aid",myArray[1]);
    //     item.addEventListener('click', function() {
    //       const myArray2 = match.split(";");
    //       input.value = myArray2[0];
    //       // input.setAttribute("aid",myArray2[1]);
    //       list.innerHTML = '';
    //     });
    //     list.append(item);
    //   });


    //   if (matches.length === 0) {
    //     list.innerHTML = '<div class="no-results">No results found</div>';
    //   }
    // else
    // {
    // fruits = [];
    // list.innerHTML = '';
    // }

    // }

  }

}

