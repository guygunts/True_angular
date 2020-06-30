import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
  cars: any[];
  cols: any[];
  datafromfile = []
  selectedCars3: any[];
  first = 0;
  rows = 10;
  constructor() { }

  ngOnInit() {
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
