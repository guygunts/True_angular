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
  constructor(private offers: planoffersService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Payment_Type: [, Validators.compose([Validators.required])],
      offer_promoMessage: [, Validators.compose([])],
      operatorBrandName: [, Validators.compose([])],
      planName: [, Validators.compose([])],
      planId: [, Validators.compose([])],
      planDescription: [, Validators.compose([])],
      promoMessage: [, Validators.compose([])],
      languageCode: [, Validators.compose([])],
      overusagePolicy: [, Validators.compose([])],
      maxRateKbps: [, Validators.compose([])],
      currencyCode: [, Validators.compose([])],
      units: [, Validators.compose([])],
      nanos: [, Validators.compose([])],
      duration: [, Validators.compose([])],
      offerContext: [, Validators.compose([])],
      trafficCategories: [, Validators.compose([])],
      connectionType: [, Validators.compose([])],
      refreshPeriod: [, Validators.compose([])],
      quotaBytes: [, Validators.compose([])],
      quotaMinutes: [, Validators.compose([])],
      expireTime: [, Validators.compose([])],
      formOfPayment: [, Validators.compose([])],
      user: sessionStorage.getItem('user')
    });
    this.offers.offerslist().then(res => {
      console.log(res)
      this.cols = res.columnname
      this.data = res.data
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
    this.displayDialog = true;
  }

  onSubmit() {
    let today = new Date(this.loginForm.value.expireTime);
    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    this.loginForm.value.expireTime = dateTime
    this.offers.offerinsert(this.loginForm.value).then(res => {
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

}
