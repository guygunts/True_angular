import { Component, OnInit, Input } from '@angular/core';
import { planoffersService } from './plan-offers.service'
@Component({
  selector: 'app-plan-offers',
  templateUrl: './plan-offers.component.html',
  styleUrls: ['./plan-offers.component.scss']
})
export class PlanOffersComponent {
  cols: any[];
  data: any[];
  _selectedColumns: any[];

  constructor(private offers: planoffersService) {

  }

  ngOnInit() {
    this.offers.offerslist().then(res => {
      this.cols = res.columnname
      this.data = res.data
      this._selectedColumns = this.cols
    })
  }
  @Input() get selectedColumns(): any[] {

    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

}
