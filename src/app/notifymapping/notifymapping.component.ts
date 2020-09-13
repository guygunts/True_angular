import { Component, OnInit, Input } from '@angular/core';
import { notifymappingService } from './notifymapping.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-notifymapping',
  templateUrl: './notifymapping.component.html',
  styleUrls: ['./notifymapping.component.scss']
})
export class NotifymappingComponent implements OnInit {
  cols: any[];
  data: any[];
  loginForm: FormGroup;
  _selectedColumns: any[];
  cus_typepeoptions=[]
  selectedCars3 = []
  displayDialog
  dataedit = {}
  action: String
  idedit
  constructor(private notifymapping: notifymappingService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      Event_id: [{ value: '' }, Validators.required],
      moduleName_en: [{ value: '' }],
      moduleName_th: [{ value: '' }],
      trafficCategories: [{ value: '' }],
      overUsagePolicy: [{ value: '' }],
      description_en: [{ value: '' }],
      description_th: [{ value: '' }],
      coarseBalanceLevel: [{ value: '' }],
      title_en: [{ value: '' }],
      title_th: [{ value: '' }],
      cus_type: [{ value: '' }, Validators.required],
    }) }

  ngOnInit() {
    this.cus_typepeoptions = [{
      "label": "Postpaid",
      "value": "Postpaid"
    }, {
      "label": "Prepaid",
      "value": "Prepaid"
    }, {
      "label": "All",
      "value": "All"
    }]
    this.notifymapping.notifymappingslist().then(res => {
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
    this.action = "add"
    this.idedit = null
    this.loginForm.reset();
    this.displayDialog = true;
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
        this.notifymapping.notifymappingdelete(data).then(res => {
          Swal.fire({
            icon: 'success',
            text: res.mess,
          })
          this.displayDialog = false;
          window.location.reload();
        })
      }
    })
  }

  onRowSelect(event) {
    this.dataedit = {}
    this.action = "edit"
    this.idedit = event[0].id
    delete event[0].id
    this.dataedit = this.clonedata(event[0]);
    this.loginForm.setValue(this.dataedit)
    this.displayDialog = true;
  }

  clonedata(data) {
    let dataclone = {};
    for (let prop in data) {
      dataclone[prop] = data[prop];
    }
    return dataclone;
  }

  onSubmit() {
    this.loginForm.value['user'] = sessionStorage.getItem('user')
    if (this.loginForm.value.cus_type == 'Postpaid') {
      this.loginForm.value.cus_type = 0
    } else if (this.loginForm.value.cus_type == 'Prepaid') {
      this.loginForm.value.cus_type = 1
    } else if (this.loginForm.value.cus_type == 'All') {
      this.loginForm.value.cus_type = 2
    }

    if (this.idedit !== null) {
      this.loginForm.value['id'] = this.idedit
      this.notifymapping.notifymappingedit(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.notifymapping.notifymappingslist().then(res => {
          this.cols = res.columnname
          this.data = res.data
          this._selectedColumns = this.cols
          window.location.reload();
        })
      })
    } else {
      this.notifymapping.notifymappinginsert(this.loginForm.value).then(res => {
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
          this.notifymapping.notifymappingslist().then(res => {
            this.cols = res.columnname
            this.data = res.data
            this._selectedColumns = this.cols
          })
        }


      })
    }
  }
}
