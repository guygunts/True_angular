import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import axios from "axios";
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener("window:onbeforeunload", ["$event"]) onBeforeUnload(event) {
    sessionStorage.clear();

  }
  title = environment.title;
  user = sessionStorage.getItem('user')
  dataport = []
  profileForm: FormGroup;


  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user')
    this.profileForm = this.formBuilder.group({
      username: [null, Validators.compose([])],
      password: [null, Validators.compose([Validators.required])],
    });

  }

  async summit() {
    // this.router.navigate(['/menu'])

    await axios.post(`/login`, this.profileForm.value)
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
