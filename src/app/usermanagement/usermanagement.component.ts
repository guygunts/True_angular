import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsermanagementService } from './usermanagement.service'
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  cols = []
  data = []
  selecteddata = []
  first = 0;
  loginForm: FormGroup;
  action
  idedit: number
  displayDialog: boolean
  dataoptions = []
  dataedit = {}
  constructor(private usermanagement: UsermanagementService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [, Validators.compose([Validators.required])],
      password: [, Validators.compose([Validators.required])],
      role_id: [, Validators.compose([Validators.required])],
    });
    this.usermanagement.usermanagementlist().then(res => {
      this.cols = res.columnname
      this.data = res.data
      res.dropdown.forEach(element => {
        this.dataoptions.push(element)
      });
    });

  }


  showDialogToAdd() {
    this.action = "add"
    this.idedit = null
    this.loginForm.reset();
    this.displayDialog = true;
  }
  onSubmit() {

    this.loginForm.value['user'] = sessionStorage.getItem('user')
    if (this.idedit !== null) {
      this.loginForm.value['user_id'] = this.idedit
      this.usermanagement.usermanagementedit(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.usermanagement.usermanagementlist().then(res => {
          this.cols = res.columnname
          this.data = res.data
        })
      })
    } else {
      this.usermanagement.usermanagementinsert(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.usermanagement.usermanagementlist().then(res => {
          this.cols = res.columnname
          this.data = res.data
        })
      })
    }
  }

  onRowSelect(event) {
    this.dataedit = {}
    this.action = "edit"
    this.usermanagement.usermanagementgetdata(event).then(res => {
      this.dataedit = this.clonedata(res.data[0]);
      this.idedit = this.dataedit['user_id']
      delete this.dataedit['user_id'];
      this.loginForm.setValue(this.dataedit)
      this.displayDialog = true;
    })

  }

  clonedata(data) {
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
        this.usermanagement.usermanagementdelete(data).then(res => {
          Swal.fire({
            icon: 'success',
            text: res.mess,
          })
          this.selecteddata = []
          this.displayDialog = false;
          this.usermanagement.usermanagementlist().then(res => {
            this.cols = res.columnname
            this.data = res.data

          })
        })
      }
    })


  }

}
