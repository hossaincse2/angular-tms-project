import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { ResponseStatus } from '../../common/QSEnums';
import { VMHospitalDemand } from '../../models/smModels/vmHospitalDemand';
import { HospitalItemDemandDetail } from '../../models/smModels/hospitalItemDemandDetail';
import { VMUnit } from '../../models/smModels/vmUnit';
import { HospitalDemandService } from '../../services/hospitalDemandService';
import { UnitService } from '../../services/unitService';
import { MessageHelper } from '../../common/helper/messageHelper';
declare var $: any;

@Component({
  selector: 'app-hospital-items-ds',
  templateUrl: './hospital-items-ds.component.html',
  styleUrls: ['./hospital-items-ds.component.css']
})
export class HospitalItemsDsComponent implements OnInit {

  public totalResource: number = 0;

  public objVMUnitDemand: VMHospitalDemand = new VMHospitalDemand();
  public lstVMUnitDemand: VMHospitalDemand[] = new Array<VMHospitalDemand>();
  public lstDemandDetail: HospitalItemDemandDetail[] = new Array<HospitalItemDemandDetail>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objQueryObject: QueryObject = new QueryObject();

  constructor(private unitDemandService: HospitalDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService) { }

  ngOnInit() {
    this.lstVMUnit = [];
    this.getAllUnit();
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
    this.unitDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.HospitalItemDemand.FromUnitID)[0];
          if (unit) {
            demad.HospitalItemDemand.UnitName = unit.Unit.UnitName;
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
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.HospitalItemDemand.FromUnitID)[0];
          if (unit) {
            demad.HospitalItemDemand.UnitName = unit.Unit.UnitName;
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
        this.getAllUnitDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  demandDetail(vmDemand) {
    this.lstDemandDetail = vmDemand.lstHospitalDemandDetail;
    $('#unitDemandModal').modal("show");
  }

}
