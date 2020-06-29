import { Component, } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import axios from "axios";
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'True';
  user = '';
  dataport = []
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router, private http: HttpClient) { }
  async summit() {
    // this.router.navigate(['/menu'])

    await axios.post(`${environment.URL_API}/login`, this.profileForm.value)
      .then(res => {

        if (res.data.code == 200) {
          sessionStorage.setItem('user', res.data.user)
          this.user = sessionStorage.getItem('user')
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data.msg,
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
  }




}
