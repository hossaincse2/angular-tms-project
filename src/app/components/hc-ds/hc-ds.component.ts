import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { ResponseStatus, DemandStatus } from '../../common/QSEnums';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';
import { HygineAndChemicalDemandService } from '../../services/hygineAndChemicalDemandService';
import { VMHygineAndChemicalDemand } from '../../models/smModels/vmHygineAndChemicalDemand';
import { HygineAndChemicalDemandDetail } from '../../models/smModels/HygineAndChemicalDemandDetail';
import { MessageHelper } from '../../common/helper/messageHelper';
import { HygineAndChemicalDemand } from '../../models/smModels/HygineAndChemicalDemand';
import { Item } from '../../models/smModels/item';
import { ItemService } from '../../services/itemService';
declare var $: any;

@Component({
  selector: 'app-hc-ds',
  templateUrl: './hc-ds.component.html',
  styleUrls: ['./hc-ds.component.css'],
  providers: [HygineAndChemicalDemandService, UnitService, ItemService]
})
export class HcDsComponent implements OnInit {
  public objVMUnitDemand: VMHygineAndChemicalDemand = new VMHygineAndChemicalDemand();
  public objHygineAndChemicalDemand: HygineAndChemicalDemand = new HygineAndChemicalDemand();
  public lstVMUnitDemand: VMHygineAndChemicalDemand[] = new Array<VMHygineAndChemicalDemand>();
  public lstDemandDetail: HygineAndChemicalDemandDetail[] = new Array<HygineAndChemicalDemandDetail>();
  
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objQueryObject: QueryObject = new QueryObject();
  lstItem: Item[] = new Array<Item>();

  constructor(private unitDemandService: HygineAndChemicalDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService, private ItemService: ItemService) { }

  ngOnInit() {
    this.lstVMUnit = [];
    this.getAllUnit();
    this.getAllItem();
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }


  approveUnitDemand() {
    // this.unitDemandService.saveUnitDemand(this.objVMUnitDemand).subscribe((response) => {
    //   if (response.StatusCode == ResponseStatus.success) {
    //     this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
    //     this.objUnitDemand = new UnitDemand();
    //     this.objUnitDemandResourceDetail = new UnitDemandResourceDetail();

    //     this.lstUnitDemandDetail = [];
    //     this.objVMUnitDemand = new VMUnitDemand();
    //   } else {
    //     this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
    //   }
    // });

  }


  getAllUnitDemandByFilter() {
    this.unitDemandService.getFilteredHygineAndChemicalDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.HygineAndChemicalDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == demad.HygineAndChemicalDemand.Status)[0];
          if (unit) {
            demad.HygineAndChemicalDemand.UnitName = unit.Unit.UnitName;
            demad.HygineAndChemicalDemand.StatusName = rStatus.name;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    
    });
  }

  getAllUnitDemand() {
    this.unitDemandService.getAllUnitDemand().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.HygineAndChemicalDemand.FromUnitID)[0];
          if (unit) {
            demad.HygineAndChemicalDemand.UnitName = unit.Unit.UnitName;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        console.log(this.lstVMUnit);
       // this.getAllUnitDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  demandDetail(vmDemand) {    
    // this.lstDemandDetail = vmDemand.lstHygineAndChemicalDemandDetail;
    // $('#unitDemandDetailModal').modal("show");
    this.lstDemandDetail = vmDemand.lstHygineAndChemicalDemandDetail;
    this.lstDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    $('#unitDemandDetailModal').modal("show");    
  }

  distributeDemand(vmDemand) {
    this.objVMUnitDemand.HygineAndChemicalDemand = vmDemand.HygineAndChemicalDemand;
    this.lstDemandDetail = vmDemand.lstHygineAndChemicalDemandDetail;
    this.lstDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    console.log(this.lstDemandDetail);
    $('#unitDemandModal').modal("show");
  }



  saveDistribution() {
    this.objVMUnitDemand.lstHygineAndChemicalDemandDetail = this.lstDemandDetail;
    this.unitDemandService.saveHygineAndChemicalDistribution(this.objVMUnitDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        $('#unitDemandModal').modal("hide");
        this.getAllUnitDemandByFilter();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

}
