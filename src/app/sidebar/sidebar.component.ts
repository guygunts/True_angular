import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  constructor() { }
  user = ''
  items
  menu

  object: object
  async ngOnInit() {
    this.user = sessionStorage.getItem('user')
    await axios.get(`${environment.URL_API}/menu?user=${this.user}`)
      .then(res => {
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.menu.length; i++) {
            if (i == 0) {
              this.object = {
                [i]: res.data.menu[i]
              }
              continue
            }
            this.object = { ...this.object, [i]: res.data.menu[i] }
          }
          console.log(this.object)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }
}
