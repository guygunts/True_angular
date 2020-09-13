import { Component, OnInit, Input } from '@angular/core';
import { errorcodeService } from './errorcode.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-errorcode',
  templateUrl: './errorcode.component.html',
  styleUrls: ['./errorcode.component.scss']
})
export class ErrorcodeComponent implements OnInit {
  cols: any[];
  data: any[];
  loginForm: FormGroup;
  _selectedColumns: any[];
  dataedit = {}
  selectedCars3 = []
  displayDialog
  action: String
  idedit
  cus_typepeoptions = []
  constructor(private errorcode: errorcodeService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      code: [{ value: '' }, Validators.required],
      http_status_code: [{ value: '' },Validators.required],
      cause: [{ value: '' },Validators.required],
      error_message_th: [{ value: '' }],
      error_message_en: [{ value: '' }],
      sbm_error_desc: [{ value: '' }],
      cus_type: [{ value: '' }, Validators.required],
    })
  }

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
    this.errorcode.errorcodeslist().then(res => {
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
        this.errorcode.errorcodedelete(data).then(res => {
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
      this.errorcode.errorcodeedit(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.errorcode.errorcodeslist().then(res => {
          this.cols = res.columnname
          this.data = res.data
          this._selectedColumns = this.cols
          window.location.reload();
        })
      })
    } else {
      this.errorcode.errorcodeinsert(this.loginForm.value).then(res => {
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
          this.errorcode.errorcodeslist().then(res => {
            this.cols = res.columnname
            this.data = res.data
            this._selectedColumns = this.cols
          })
        }


      })
    }
  }
}
