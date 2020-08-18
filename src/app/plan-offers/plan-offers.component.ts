import { Component, OnInit, Input } from '@angular/core';
import { planoffersService } from './plan-offers.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AppService } from '../app.service';
import { saveAs } from 'file-saver';
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
  selectedFiles: FileList;
  datafromfile = []
  first = 0
  displayDialog: boolean;
  selectedCars3: [];
  dataedit = {}
  action: String
  idedit
  planIdoptions = []
  PaymentTypeoptions = []
  formofoptions = []
  constructor(private offers: planoffersService, private appService: AppService, private formBuilder: FormBuilder) {
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

  changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files[0];
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      this.datafromfile = []
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let lines = [];
        let datasplit = csv.split(/\r\n/);
        // let datajson = []
        // let datahearder = datasplit[0].split(',');

        const result = [];
        const headers = datasplit[0].split(",");
        for (let i = 1; i < datasplit.length; i++) {
          const obj = {};
          const currentline = datasplit[i].split(",");
          if (currentline[0] != '') {
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
              if (obj[headers[j]] == obj['Payment_Type']) {
                if (currentline[j] == 'Postpaid') {
                  obj[headers[j]] = 0
                } else if (currentline[j] == 'Prepaid') {
                  obj[headers[j]] = 1
                } else if (currentline[j] == 'All') {
                  obj[headers[j]] = 2
                }
              }
            }
            obj['user'] = sessionStorage.getItem('user')
            result.push(obj);
          }
        }
        this.offers.offerinsertfile(result).then(res => {
          this.appService.downloadFile(res.result, 'ResultInsertFile', ['planId', 'status']);
        })

      }
    }
  }
}
