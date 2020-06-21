import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  constructor() { }
  items;
  menu;
  object: {[key: number]: object} = {2: {"menu":"/AdjustSpeed","name":"Adjust Speed"}, 1: {"menu":"/Generatelicense","name":"generate license"}};
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  ngOnInit() {

  }
}
