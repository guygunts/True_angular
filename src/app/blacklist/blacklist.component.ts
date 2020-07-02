import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
  data: [];
  col: [];
  value
  today = new Date();
  dataexecl: [];
  colexecl: [];
  selectedFiles: FileList;
  currentFile: File;
  selectedCars3: [];
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    axios.post(`${environment.URL_API}/Blacklistlist`)
      .then(res => {
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
    let dates = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let dateTime = dates + ' ' + '23:59:59';
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.value = dateTime
  }
  selectCarWithButton(data) {
    console.log(data)
  }

  async add() {
    let param = {
      "msisdn": (<HTMLInputElement>document.getElementById("MSISDN")).value,
      "user": sessionStorage.getItem('user')
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
    let param = {
      "msisdn": (<HTMLInputElement>document.getElementById("MSISDN")).value
    }
    await axios.post(`${environment.URL_API}/blacklistdelete`, param)
      .then(res => {
        axios.post(`${environment.URL_API}/blacklist`, param)
          .then(ress => {
            this.col = ress.data.column
            this.data = ress.data.data
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message
            })
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

  async search() {
    let param = {
      "msisdn": (<HTMLInputElement>document.getElementById("MSISDN")).value
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






  async uploadfile() {
    let formData = new FormData();
    this.currentFile = this.selectedFiles.item(0)
    formData.append('file', this.currentFile);
    formData.append('time', this.value);
    formData.append('user', sessionStorage.getItem('user'));
    await axios.post(`${environment.URL_API}/Blacklistfile`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
          text: err.message
        })
      })
    // axios({
    //   method: 'post',
    //   url: `${environment.URL_API}/Blacklistfile`,
    //   data: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });

  }
  changeListener(event) {
    this.selectedFiles = event;
  }
}
