import { Component, OnInit } from '@angular/core';
import { DryItemDemandService } from '../../services/DryItemDemandService';
import { VMDryItemDemand } from '../../models/smModels/vmDryItemDemand';
import { ResponseStatus, DemandType, MaterialsType, SSDList } from '../../common/QSEnums';
import { VMUnit } from '../../models/smModels/vmUnit';
import { UnitService } from '../../services/unitService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { DryItemDemandDetail } from '../../models/smModels/dryItemDemandDetail';
import { DryItemDemandResourceDetail } from '../../models/smModels/dryItemDemandResourceDetail';
import { DryItemDemandFamilyDetail } from '../../models/smModels/dryItemDemandFamilyDetail';
import { DryItemDemand } from '../../models/smModels/dryItemDemand';
import { QueryObject } from '../../models/queryObject';
declare var $: any;


@Component({
  selector: 'app-unit-demand-list',
  templateUrl: './unit-demand-list.component.html',
  styleUrls: ['./unit-demand-list.component.css'],
  providers: [UnitService, DryItemDemandService]
})
export class DryItemDemandListComponent implements OnInit {
  public objQueryObject: QueryObject = new QueryObject();
  public lstVMDryItemDemand: VMDryItemDemand[] = new Array<VMDryItemDemand>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public lstDemandType: any[];
  public lstMaterialsType: any[];
  public totalResource = 0;
  public totalDay = 1;
  public netResource = 0;
  public bellow3ChildTotal = 0;
  public netChildTotal = 0;
  public objVMDryItemDemand: VMDryItemDemand = new VMDryItemDemand();
  public lstSSDList: any[];

  public objDryItemDemand: DryItemDemand = new DryItemDemand();
  public lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();
  public objDryItemDemandResourceDetail: DryItemDemandResourceDetail = new DryItemDemandResourceDetail();
  public lstDryItemDemandFamilyDetail: DryItemDemandFamilyDetail[] = new Array<DryItemDemandFamilyDetail>();


  constructor(private DryItemDemandService: DryItemDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService) { }

  ngOnInit() {
    this.getAllUnit();
  }

  approveDryItemDemand() {
    this.objVMDryItemDemand.DryItemDemand = this.objDryItemDemand;
    this.objVMDryItemDemand.lstDryItemDemandDetail = this.lstDryItemDemandDetail;
    this.objVMDryItemDemand.DryItemDemandResourceDetail = this.objDryItemDemandResourceDetail;
    this.objVMDryItemDemand.lstDryItemDemandFamilyDetail = this.lstDryItemDemandFamilyDetail;
    this.objVMDryItemDemand.DryItemDemand.ToSSDID = 1;
    this.DryItemDemandService.saveDryItemDemand(this.objVMDryItemDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objDryItemDemand = new DryItemDemand();
        this.objDryItemDemandResourceDetail = new DryItemDemandResourceDetail();

        this.lstDryItemDemandDetail = [];
        this.objVMDryItemDemand = new VMDryItemDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });

  }

  
  getAllDryItemDemandByFilter() {
    this.DryItemDemandService.getFilteredDryItemDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMDryItemDemand = response.ResponseObj;

        this.lstVMDryItemDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.DryItemDemand.DryItemDemandID)[0];
          if (unit) {
            demad.DryItemDemand.UnitName = unit.Unit.UnitName;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });
  }

  getAllDryItemDemand() {
    this.DryItemDemandService.getAllDryItemDemand().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMDryItemDemand = response.ResponseObj;

        this.lstVMDryItemDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.DryItemDemand.DryItemDemandID)[0];
          if (unit) {
            demad.DryItemDemand.UnitName = unit.Unit.UnitName;
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
        this.lstDemandType = DemandType;
        this.lstMaterialsType = MaterialsType;
        this.getAllDryItemDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  demandDetail(vmDemand) {

    console.log("unit Demand", this.objVMDryItemDemand.DryItemDemand);
    this.lstSSDList = SSDList;
    this.objVMDryItemDemand = vmDemand;
    this.objDryItemDemand = this.objVMDryItemDemand.DryItemDemand;
    this.objDryItemDemandResourceDetail = this.objVMDryItemDemand.DryItemDemandResourceDetail;
    this.lstDryItemDemandDetail = this.objVMDryItemDemand.lstDryItemDemandDetail;
    this.lstDryItemDemandFamilyDetail = this.objVMDryItemDemand.lstDryItemDemandFamilyDetail;
    $('#DryItemDemandModal').modal("show");
  }
}
