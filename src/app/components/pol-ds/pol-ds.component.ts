import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/smModels/unit';
import { VMUnit } from '../../models/smModels/vmUnit';
import { POLDistribution } from '../../models/smModels/POLDistribution';
import { POLDistributionDetail } from '../../models/smModels/POLDistributionDetail';
import { QueryObject } from '../../models/queryObject';
import { VMPOLDemand } from '../../models/smModels/vmPOLDemand';

@Component({
  selector: 'app-pol-ds',
  templateUrl: './pol-ds.component.html',
  styleUrls: ['./pol-ds.component.css']
})
export class PolDsComponent implements OnInit {

  public objQueryObject: QueryObject = new QueryObject();
  public objUnit: Unit = new Unit();
  public objPOLDistribution: POLDistribution = new POLDistribution();
  public lstPOLDistributionDetail: POLDistributionDetail[] = new Array<POLDistributionDetail>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();

  public lstVMUnitDemand: VMPOLDemand[] = new Array<VMPOLDemand>();

  constructor() { }

  ngOnInit() {

    
  }

  close() {

  }

  showEntry() {

  }

  savePODDistribution() {

  }
  getAllUnitDemandByFilter() {

  }
  approveUnitDemand() {

  }

}
