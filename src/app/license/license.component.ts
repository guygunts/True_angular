import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      token: [null, Validators.compose([])]
    });
  }

  async onSubmit() {
    let param = {
      "token": this.loginForm.value.token
    }
    await axios.post(`${environment.URL_API}/generatelicense`, param)
      .then(res => {

        Swal.fire({
          icon: 'success',
          text: res.data.token,
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

}
