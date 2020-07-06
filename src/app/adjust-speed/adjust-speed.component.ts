import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
import { AppService } from '../app.service';
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
    private authenticationService: AuthenticationService,
    private appService: AppService
  ) {

  }


  ngOnInit() {
    this.statusdownload = 0
    this.loginForm = this.formBuilder.group({
      type: ['CPID'],
      CPID: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
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

    let dataday: number
    let CPID: string
    if (this.loginForm.value.day) {
      dataday = this.loginForm.value.day * 1440
      if (dataday == 129600) {
        this.loginForm.value.hr = 0
        this.loginForm.value.min = 0
      }
    }
    if (this.loginForm.value.hr) {
      dataday += this.loginForm.value.hr * 60
    }
    if (this.loginForm.value.min) {
      dataday += this.loginForm.value.min
    }
    if (this.loginForm.value.type == 'MSISDN') {
      CPID = this.loginForm.value.MSISDN
    } else if (this.loginForm.value.type == 'CPID') {
      CPID = this.loginForm.value.CPID
    }
    let params = {
      "maxMediaRateKbps": this.loginForm.value.maxMediaRateKbps,
      "expirationTime": dataday,
      "cpidState": this.loginForm.value.cpidState,
      "CPID": CPID,
      "type": this.loginForm.value.type,
      "user": sessionStorage.getItem('user')
    }
    //http://192.168.38.201:4200
    await axios.post(`${environment.URL_API}/adjustspeed`, params)
      .then(res => {
        if (res.data.code == '200') {
          Swal.fire({
            icon: 'success',
            text: "Success",
          })
          return false
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.error
        })
        console.log(res)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        })
      })
  }

  async uploadfile() {
    console.log(this.datafromfile)
    await axios.post(`http://192.168.38.201:4200/uploadadjustspeed`, this.datafromfile)
      .then(res => {
        res.data.result.forEach(element => {
          this.MyCSV.push(element)
        });
        Swal.fire({
          icon: 'success',
          text: "Success",
        })
        this.statusdownload = 1
      })
      .catch(err => {
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
    this.appService.downloadFile(this.MyCSV, 'Result');
  }

}