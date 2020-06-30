import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-generatelicense',
  templateUrl: './generatelicense.component.html',
  styleUrls: ['./generatelicense.component.scss']
})
export class GeneratelicenseComponent implements OnInit {
  loginForm: FormGroup;
  generate
  amounttps
  checked = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    axios.get(`${environment.URL_API}/license`)
      .then(res => {
        this.generate = res.data.license
        this.amounttps = res.data.tps
        this.checked = res.data.status
      })
    this.loginForm = this.formBuilder.group({
      token: [null, Validators.compose([])]
    });
  }
  async Change(event) {
    console.log(event.checked.toString())
    let status
    if (event.checked == true) {
      status = 1
    } else {
      status = 0
    }
    let param = {
      "status": status,
      "user": sessionStorage.getItem('user')
    }
    await axios.post(`${environment.URL_API}/updatestastus`, param)
      .then(res => {

        Swal.fire({
          icon: 'success',
          text: res.data.mess,
        })
        return false
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }
  async onSubmit() {
    let param = {
      "token": this.loginForm.value.token
    }
    await axios.post(`${environment.URL_API}/updatelicense`, param)
      .then(res => {

        Swal.fire({
          icon: 'success',
          text: res.data.mess,
        })
        window.location.reload();
        return false
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }
}
