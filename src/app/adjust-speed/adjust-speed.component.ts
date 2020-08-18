import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AppService } from '../app.service';
import { AdjustSpeedService } from './adjust-speed.service';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-adjust-speed',
  inputs: ['name'],
  templateUrl: './adjust-speed.component.html',
  styleUrls: ['./adjust-speed.component.scss']
})
export class AdjustSpeedComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  con = true
  datafromfile = []
  MyCSV = []
  statusdownload: number
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private AdjustSpeed: AdjustSpeedService
  ) {

  }


  ngOnInit() {
    this.statusdownload = 0
    this.loginForm = this.formBuilder.group({
      type: ['CPID'],
      CPID: [null, Validators.compose([])],
      MSISDN: ['66'],
      maxMediaRateKbps: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.max(9999999)])],
      cpidState: ['None'],
      day: [0],
      hr: [0],
      min: [0]
    });
  }

  counter(i: number) {
    return new Array(i).map(x => i + 1);
  }


  changedata(): void {
    if (this.loginForm.value.type == 'CPID') {
      this.con = true
    } else {
      this.con = false
    }

  }

  async onSubmit() {

    let dataday: number = 0
    let CPID: string
    if (this.loginForm.value.type == 'MSISDN') {
      CPID = this.loginForm.value.MSISDN
    } else if (this.loginForm.value.type == 'CPID') {
      CPID = this.loginForm.value.CPID
    }
    dataday = + ((+this.loginForm.value.day * 1440) + (+this.loginForm.value.hr * 60) + (+this.loginForm.value.min))
    let params = {
      "maxMediaRateKbps": this.loginForm.value.maxMediaRateKbps,
      "expirationTime": dataday,
      "cpidState": this.loginForm.value.cpidState,
      "CPID": CPID,
      "type": this.loginForm.value.type,
      "user": sessionStorage.getItem('user')
    }

    await this.AdjustSpeed.adjustspeed(params).then(res => {
      if (res.code == '200') {
        Swal.fire({
          icon: 'success',
          text: "Success",
        })
        return false
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error
      })
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    })

  }

  async uploadfile() {
    console.log(this.datafromfile)
    await this.AdjustSpeed.uploadadjustspeed(this.datafromfile).then(res => {
      res.result.forEach(element => {
        this.MyCSV.push(element)
      });
      Swal.fire({
        icon: 'success',
        text: "Success",
      })
      this.statusdownload = 1
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    })
  }


  changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      this.datafromfile = []
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let datasplit = csv.split(/\r\n|\n/);
        for (let i = 0; i < datasplit.length; i++) {
          var datasplits = datasplit[i].split(',');
          let data =
          {
            "type": datasplits[0],
            "CPID": datasplits[1],
            "expirationTime": datasplits[2],
            "maxMediaRateKbps": datasplits[3],
            "cpidState": datasplits[4]
          }
          this.datafromfile.push(data)
        }
      }
    }
  }

  changedataday(): void {
    if (this.loginForm.value.day == 90) {
      (<HTMLInputElement>document.getElementById("hr")).disabled = true;
      (<HTMLInputElement>document.getElementById("min")).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById("hr")).disabled = false;
      (<HTMLInputElement>document.getElementById("min")).disabled = false;
    }

  }

  download() {
    console.log(this.MyCSV)
    this.appService.downloadFile(this.MyCSV, 'Result', ['type', 'CPID', 'expirationTime', 'maxMediaRateKbps', 'cpidState', 'status']);
  }

}