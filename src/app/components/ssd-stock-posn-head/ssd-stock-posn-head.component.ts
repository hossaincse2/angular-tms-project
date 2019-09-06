import { Component, OnInit } from '@angular/core';
import { VMStock } from '../../models/smModels/vmStock';
import { QueryObject } from '../../models/queryObject';
import { DryItemDemandService } from '../../services/DryItemDemandService';
import { ResponseStatus,SSDList } from '../../common/QSEnums';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';
import { MessageHelper } from '../../common/helper/messageHelper';

 
@Component({
  selector: 'app-ssd-stock-posn-head',
  templateUrl: './ssd-stock-posn-head.component.html',
  styleUrls: ['./ssd-stock-posn-head.component.css'],
  providers:[DryItemDemandService,UnitService]
})
export class SsdStockPosnHeadComponent implements OnInit {

  public lstSSDList: any[];
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objQueryObject: QueryObject = new QueryObject();
  public lstVMStock: VMStock[] = new Array<VMStock>();
  constructor(private dryItemDemandService: DryItemDemandService,private UnitService: UnitService, private messageHelper: MessageHelper) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstSSDList = SSDList;
    this. getAllUnit();
  }
  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        console.log( this.lstVMUnit);
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getFilteredStock() {

    this.dryItemDemandService.getStockReport(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMStock = response.ResponseObj;
        this.lstVMStock.forEach(stock => {

        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });
  }




}
