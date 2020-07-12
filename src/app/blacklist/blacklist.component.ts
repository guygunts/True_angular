import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
  loginForm: FormGroup;
  data: [];
  col: [];
  dateTime
  value
  today = new Date();
  dataexecl: [];
  colexecl: [];
  selectedFiles: FileList;
  currentFile: File;
  selectedCars3: [];
  items: [{ label: string; icon: string; command: () => void; }, { label: string; icon: string; command: () => void; }];
  ////////msisdn table//////////////
  totalRecords = 10;
  first = 1
  last = 10
  totalpage = 5
  //////////msisdn table///////////

  ////////execl table//////////////
  totalRecordsexecl = 10;
  firstexecl = 1
  lastexecl = 10
  totalpageexecl = 5
  //////////execl table///////////

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    axios.post(`${environment.URL_API}/Blacklistlist`)
      .then(res => {
        console.log(res.data)
        this.colexecl = res.data.column
        this.dataexecl = res.data.data
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error
        })
      })
    let date: Date = new Date();
    let dates = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    this.dateTime = dates + ' ' + '23:59:59';


    this.items = [
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.remove();
        }
      },
      {
        label: 'Search', icon: 'pi pi-search', command: () => {
          this.search();
        }
      }
    ];

    this.loginForm = this.formBuilder.group({
      MSISDN: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
    });
  }


  async add() {
    let param = {
      "msisdn": this.loginForm.value.MSISDN,
      "user": sessionStorage.getItem('user')
    }
    let spit = this.loginForm.value.MSISDN.split('')
    if (spit[0] !== "6" || spit[1] !== "6") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'format is wrong'
      })
      return false
    }

    await axios.post(`${environment.URL_API}/blacklistadd`, param)
      .then(res => {
        Swal.fire({
          icon: 'success',
          text: "Success",
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error
        })
      })
  }

  async remove() {
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

        let param = {
          "msisdn": this.loginForm.value.MSISDN
        }
        let spit = this.loginForm.value.MSISDN.split('')
        if (spit[0] !== "6" || spit[1] !== "6") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'format is wrong'
          })
          return false
        }
        axios.post(`${environment.URL_API}/blacklistdelete`, param)
          .then(res => {
            axios.post(`${environment.URL_API}/blacklist`, param)
              .then(ress => {
                this.col = ress.data.column
                this.data = ress.data.data
              })
            Swal.fire(
              'Deleted!',
              'Your number has been deleted.',
              'success'
            )
          })
      }
    })


  }

  async removefortable(data) {
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
        let param = {
          "msisdn": data.msisdn
        }
        let spit = data.msisdn.split('')
        if (spit[0] !== "6" || spit[1] !== "6") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'format is wrong'
          })
          return false
        }
        axios.post(`${environment.URL_API}/blacklistdelete`, param)
          .then(res => {
            axios.post(`${environment.URL_API}/blacklist`, param)
              .then(ress => {
                this.col = ress.data.column
                this.data = ress.data.data
              }
              )
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
      }
    })



  }



  async search() {
    let param = {
      "msisdn": this.loginForm.value.MSISDN
    }
    let spit = this.loginForm.value.MSISDN.split('')
    if (spit[0] !== "6" || spit[1] !== "6") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'format is wrong'
      })
      return false
    }
    await axios.post(`${environment.URL_API}/blacklist`, param)
      .then(res => {
        this.col = res.data.column
        this.data = res.data.data
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }

  async removefile(data) {
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
        axios.post(`${environment.URL_API}/Blacklistfiledelete`, data)
          .then(res => {
            axios.post(`${environment.URL_API}/Blacklistlist`)
              .then(res => {
                this.colexecl = res.data.column
                this.dataexecl = res.data.data
                Swal.fire(
                  'Deleted!',
                  'Your number has been deleted.',
                  'success'
                )
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.error
                })
              })
          })
      }
    })


  }




  async uploadfile() {
    let today = new Date(this.value);
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let formattaime
    if (this.value == undefined) {
      formattaime = this.dateTime
    } else {
      formattaime = dateTime
    }
    let formData = new FormData();
    this.currentFile = this.selectedFiles.item(0)
    formData.append('file', this.currentFile);
    formData.append('time', formattaime);
    formData.append('user', sessionStorage.getItem('user'));
    await axios.post(`${environment.URL_API}/Blacklistfile`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        axios.post(`${environment.URL_API}/Blacklistlist`)
          .then(res => {
            console.log(res.data)
            this.colexecl = res.data.column
            this.dataexecl = res.data.data
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.error
            })
          })
        Swal.fire({
          icon: 'success',
          text: "Success",
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })

  }
  changeListener(event) {
    this.selectedFiles = event;
  }

  async selectCarWithButton(data) {
    let formData = {
      'file': data.result_file
    }
    await axios.post(`${environment.URL_API}/Blacklistdownload`, formData)
      .then(res => {
        let blob = new Blob(['\ufeff', res.data], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Result.csv");
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
