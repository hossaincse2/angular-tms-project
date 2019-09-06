import { Component, OnInit } from '@angular/core';
import { VMPOLDemand } from '../../models/smModels/vmPOLDemand';
import { QueryObject } from '../../models/queryObject';
import { VMUnit } from '../../models/smModels/vmUnit';

@Component({
  selector: 'app-pol-dmd-list',
  templateUrl: './pol-dmd-list.component.html',
  styleUrls: ['./pol-dmd-list.component.css']
})
export class PolDmdListComponent implements OnInit {

  lstVMPOLDemand: VMPOLDemand[] = new Array<VMPOLDemand>();
  public objQueryObject: QueryObject = new QueryObject();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  constructor() { }

  ngOnInit() {
  }

  close() {

  }
  searchByDate() {

  }

  getAllUnitDemandByFilter() {

  }

}
