import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { speedmapingService } from './speedmapping.service'
@Component({
  selector: 'app-speedmapping',
  templateUrl: './speedmapping.component.html',
  styleUrls: ['./speedmapping.component.scss']
})
export class SpeedmappingComponent implements OnInit {
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
  constructor(private speedmap: speedmapingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      sbm_speed_min: [, Validators.compose([])],
      sbm_speed_max: [, Validators.compose([])],
      max_bit_rate: [, Validators.compose([])],
      video_quality: [, Validators.compose([])]
    });
    this.speedmap.maxratelist().then(res => {
      this.cols = res.columnname
      this.data = res.data
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
      this.loginForm.value['id'] = this.idedit
      this.speedmap.maxrateedit(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.speedmap.maxratelist().then(res => {
          this.cols = res.columnname
          this.data = res.data
        })
      })
    } else {
      this.speedmap.maxrateinsert(this.loginForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          text: res.mess,
        })
        this.displayDialog = false;
        this.speedmap.maxratelist().then(res => {
          this.cols = res.columnname
          this.data = res.data
        })
      })
    }
  }

  onRowSelect(event) {
    this.dataedit = {}
    this.action = "edit"
    this.speedmap.maxrategetdata(event).then(res => {
      this.dataedit = this.clonedata(res.data[0]);
      this.idedit = this.dataedit['id']
      delete this.dataedit['id'];
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
        this.speedmap.maxratedelete(data).then(res => {
          Swal.fire({
            icon: 'success',
            text: res.mess,
          })
          this.selecteddata = []
          this.displayDialog = false;
          this.speedmap.maxratelist().then(res => {
            this.cols = res.columnname
            this.data = res.data

          })
        })
      }
    })


  }
}
