import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { GeneratelicenseService } from './generatelicense.service';
@Component({
  selector: 'app-generatelicense',
  templateUrl: './generatelicense.component.html',
  styleUrls: ['./generatelicense.component.scss']
})
export class GeneratelicenseComponent implements OnInit {
  user = sessionStorage.getItem('user')
  loginForm: FormGroup;
  loginFormfps: FormGroup;
  generate
  amounttps
  checked = false;
  constructor(private formBuilder: FormBuilder, private service: GeneratelicenseService) { }

  ngOnInit() {
    this.user
    this.service.license().then(res => {
      this.generate = res.data.license
      this.amounttps = res.data.tps
      this.checked = res.data.status
    })
    this.loginForm = this.formBuilder.group({
      token: [, Validators.compose([Validators.required])],
    });
    this.loginFormfps = this.formBuilder.group({
      tokentps: [, Validators.compose([Validators.required])],
    });
  }
  async Change(event) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to change this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.value == undefined) {
        if (event.checked == true) {

          event.source._checked = false;
        } else {
          event.source._checked = true;
        }
      }
      if (result.value) {
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
        this.service.updatestastus(param).then(res => {
          Swal.fire(
            'Change!',
            'success'
          )
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        })
      }
    })
  }

  async onSubmit() {
    let param = {
      "token": this.loginForm.value.token
    }
    this.service.updatelicense(param).then(res => {
      Swal.fire({
        icon: 'success',
        text: res.data.mess,
      })
      window.location.reload();
      return false
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })
  }



  async onSubmittps() {
    let param = {
      "token": this.loginFormfps.value.tokentps
    }
    this.service.generatelicense(param).then(res => {
      Swal.fire({
        icon: 'success',
        text: res.data.token,
      })
      return false
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })
  }

}
