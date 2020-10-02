import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customdescriptionService } from './customdescription.service'
@Component({
  selector: 'app-customdescription',
  templateUrl: './customdescription.component.html',
  styleUrls: ['./customdescription.component.scss']
})
export class CustomdescriptionComponent implements OnInit {
  cols: any[];
  data: any[];
  loginForm: FormGroup;
  _selectedColumns: any[];
  dataedit = {}
  selectedCars3 = []
  selectedtable
  table = []
  displayDialog
  action: String
  idedit
  cus_typepeoptions = []
  filter
  constructor(private custom: customdescriptionService) {
    this.table = [
      { label: 'Select Table', value: null },
      { label: 'TB_M_Package', value: { table: 'packagelist', edit: 'packagedit', filter: 'code' } },
      { label: 'TB_M_Price_Plan', value: { table: 'priceplanlist', edit: 'priceplanedit', filter: 'code' } },
      { label: 'TB_M_Service_Type_Mapping', value: { table: 'servicelist', edit: 'serviceedit', filter: 'service_type' } },
    ];
  }

  ngOnInit() {
  }
  @Input() get selectedColumns(): any[] {

    return this._selectedColumns;
  }

  changedata(data, table) {
    table.filters = []
    if (table.filteredValue) {
      delete table.filteredValue
    }

    if (data.selectedtable == null) {
      this.cols = []
      this.data = []
      this._selectedColumns = this.cols
      return false
    }
    (<HTMLInputElement>document.getElementById("filter")).value = ''
    this.filter = data.selectedtable.filter
    this.custom.customdescriptionlist(data.selectedtable).then(res => {
      this.cols = res.columnname
      this.data = res.data
      this._selectedColumns = this.cols
    })
  }
  onRowSelect(event) {
    this.dataedit = {}
    this.idedit = event[0].id
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
  }
}
