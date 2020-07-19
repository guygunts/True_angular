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
  dataedit={}
  action:String
  idedit
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
    this.action="add"
     this.idedit =null
    this.loginForm.reset();
    this.displayDialog = true;
  }

  onSubmit() {
    let today = new Date(this.loginForm.value.expireTime);
    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    this.loginForm.value.expireTime = dateTime
    this.loginForm.value['user']=sessionStorage.getItem('user')
    console.log(this.idedit)
    if(this.idedit !== null){
      this.loginForm.value['id']=this.idedit
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
    }else{
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

  onRowSelect(event) {
    this.dataedit={}
    this.action="edit"
    this.dataedit = this.cloneCar(event[0]);
    this.idedit=this.dataedit['id']
     delete this.dataedit['id'];
     delete this.dataedit['create_dt'];
     delete this.dataedit['create_by'];
     delete this.dataedit['update_dt'];
     delete this.dataedit['update_by'];

     let today = new Date(this.dataedit['expireTime']);
    this.dataedit['expireTime']=today
    this.loginForm.setValue(this.dataedit)
    this.displayDialog = true;
}

cloneCar(data) {
  let car = {};
  for (let prop in data) {
      car[prop] = data[prop];
  }
  return car;
}

deltedata(data){
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
