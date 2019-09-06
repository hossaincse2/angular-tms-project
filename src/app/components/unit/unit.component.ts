import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/smModels/unit';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, ResourceType } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitResourceDetail } from '../../models/smModels/unitResourceDetail';
import { VMUnit } from '../../models/smModels/vmUnit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
  providers: [UnitService]
})
export class UnitComponent implements OnInit {

  showEntry: boolean = false;
  objVMUnit: VMUnit = new VMUnit();
  public objUnit: Unit = new Unit();
  lstResourceType: any[];
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objUnitResourceDetail: UnitResourceDetail = new UnitResourceDetail();
  lstUnitResourceDetail: UnitResourceDetail[] = new Array<UnitResourceDetail>();

  constructor(private messageHelper: MessageHelper, private UnitService: UnitService) { }

  ngOnInit() {
    this.showEntry = false;
    console.log(this.lstUnitResourceDetail);

    this.lstResourceType = ResourceType;
    this.getAllUnit();
  }

  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        console.log("unit List", this.lstVMUnit);

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  addNew() {
    this.objUnit = new Unit();
    this.lstUnitResourceDetail = [];
    this.objUnitResourceDetail = new UnitResourceDetail();
    this.lstUnitResourceDetail.push(this.objUnitResourceDetail);
    this.showEntry = true;
  }
  close() {
    this.objUnit = new Unit();
    this.lstUnitResourceDetail = [];
    this.showEntry = false;
  }

  addResource() {
    this.objUnitResourceDetail = new UnitResourceDetail();
    this.lstUnitResourceDetail.push(this.objUnitResourceDetail);
  }
  removeResource() {
    this.lstUnitResourceDetail.pop();
  }

  editUnit(vmUnit) {
    this.objUnit = vmUnit.Unit;
    this.showEntry = true;
  }

  deleteUnit(vmUnit) {
    if (confirm("Are you sure to delete this record?")) {
      this.UnitService.deleteUnit(vmUnit).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
          this.objUnit = new Unit();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, response.Message);
        }
      });
    }
  }

  saveUnit() {
    this.objVMUnit.Unit = this.objUnit;
    this.objVMUnit.lstUnitResourceDetail = this.lstUnitResourceDetail;
    this.UnitService.saveUnit(this.objVMUnit).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objUnit = new Unit();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

}
