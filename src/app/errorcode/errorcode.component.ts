import { Component, OnInit, Input } from '@angular/core';
import { errorcodeService } from './errorcode.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  selectedCars3 = []
  displayDialog
  action: String
  idedit
  constructor(private errorcode: errorcodeService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({})
  }

  ngOnInit() {
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

  }

  deltedata() {

  }

  onRowSelect() {

  }

  onSubmit() {

  }
}
