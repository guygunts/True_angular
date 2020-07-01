import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
  data: [];
  col: [];
  datafromfile = []
  selectedCars3: [];
  totalRecords = 10;
  first = 1
  last = 10
  totalpage = 5
  constructor() { }

  ngOnInit() {

  }
  async add() {
    let param = {
      "msisdn": (<HTMLInputElement>document.getElementById("MSISDN")).value
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






  uploadfile() {
    console.log(JSON.stringify(this.datafromfile))
  }
  changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      this.datafromfile = []
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.datafromfile.push(csv)
      }
    }
  }
}
