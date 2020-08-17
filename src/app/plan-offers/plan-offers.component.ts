import { Component, OnInit, Input } from '@angular/core';
import { planoffersService } from './plan-offers.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-plan-offers',
  templateUrl: './plan-offers.component.html',
  styleUrls: ['./plan-offers.component.scss']
})
export class PlanOffersComponent {
  cols: any[];
  data: any[];
  loginForm: FormGroup;
  _selectedColumns: any[];
  first = 0
  displayDialog: boolean;
  selectedCars3: [];
  dataedit = {}
  action: String
  idedit
  planIdoptions = []
  PaymentTypeoptions = []
  formofoptions = []
  constructor(private offers: planoffersService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      Payment_Type: [, [Validators.required]],
      Company: [],
      promoMessage_th: [],
      promoMessage_en: [],
      planName_th: [],
      planName_en: [],
      planId: [[Validators.required]],
      units: [],
      formOfPayment: [],
    });

  }

  ngOnInit() {
    this.formofoptions = [{
      "label": "ADD_TO_BILL",
      "value": "ADD_TO_BILL"
    }, {
      "label": "WALLET_BALANCE",
      "value": "WALLET_BALANCE"
    }, {
      "label": "CREDIT_CARD_ON_FILE",
      "value": "CREDIT_CARD_ON_FILE"
    }, {
      "label": "LOAN",
      "value": "LOAN"
    }]
    this.PaymentTypeoptions = [{
      "label": "Postpaid",
      "value": "Postpaid"
    }, {
      "label": "Prepaid",
      "value": "Prepaid"
    }, {
      "label": "All",
      "value": "All"
    }]
    this.offers.offerslist().then(res => {
      console.log(res)
      this.cols = res.columnname
      this.data = res.data
      res.dropdown.forEach(element => {
        this.planIdoptions.push(element)
      });



      this._selectedColumns = this.cols
    })

  }
  @Input() get selectedColumns(): any[] {

    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  showDialogToAdd() {
    this.action = "add"
    this.idedit = null
    this.loginForm.reset();
    this.displayDialog = true;
  }

  onSubmit() {
    this.loginForm.value['user'] = sessionStorage.getItem('user')

    if (this.loginForm.value.formOfPayment == null) {
      this.loginForm.value.formOfPayment = 'ADD_TO_BILL'
    }
    if (this.loginForm.value.Payment_Type == 'Postpaid') {
      this.loginForm.value.Payment_Type = 0
    } else if (this.loginForm.value.Payment_Type == 'Prepaid') {
      this.loginForm.value.Payment_Type = 1
    } else if (this.loginForm.value.Payment_Type == 'All') {
      this.loginForm.value.Payment_Type = 2
    }
    if (this.idedit !== null) {
      this.loginForm.value['id'] = this.idedit
      this.offers.offeredit(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.offers.offerslist().then(res => {
          this.cols = res.columnname
          this.data = res.data
          this._selectedColumns = this.cols
        })
      })
    } else {
      this.offers.offerinsert(this.loginForm.value).then(res => {
        if (res.code) {
          Swal.fire({
            icon: 'error',
            text: res.sqlMessage,
          })
        } else {
          Swal.fire({
            icon: 'success',
            text: res.mess,
          })
          this.displayDialog = false;
          this.offers.offerslist().then(res => {
            this.cols = res.columnname
            this.data = res.data
            this._selectedColumns = this.cols
          })
        }


      })
    }

  }

  onRowSelect(event) {
    this.dataedit = {}
    this.action = "edit"
    // if (event[0].Payment_Type == 'Postpaid') {
    //   event[0].Payment_Type = 0
    // } else if (event[0].Payment_Type == 'Prepaid') {
    //   event[0].Payment_Type = 1
    // } else if (event[0].Payment_Type == 'All') {
    //   event[0].Payment_Type = 2
    // }
    delete event[0].no;
    this.dataedit = this.cloneCar(event[0]);


    this.loginForm.setValue(this.dataedit)
    this.displayDialog = true;
  }

  cloneCar(data) {
    let dataclone = {};
    for (let prop in data) {
      dataclone[prop] = data[prop];
    }
    return dataclone;
  }

  deltedata(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.offers.offerdelete(data).then(res => {
          Swal.fire({
            icon: 'success',
            text: res.mess,
          })
          this.displayDialog = false;
          this.offers.offerslist().then(res => {
            this.cols = res.columnname
            this.data = res.data
            this._selectedColumns = this.cols
          })
        })
      }
    })


  }
}
