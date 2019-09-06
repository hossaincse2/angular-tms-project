import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/smModels/unit';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, ResourceType } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitResourceDetail } from '../../models/smModels/unitResourceDetail';
import { VMUnit } from '../../models/smModels/vmUnit';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.css'],
  providers: [UnitService, UnitOfMeasureService]
})
export class UnitOfMeasureComponent implements OnInit {
  showEntry: boolean = false;
  objVMUnit: VMUnit = new VMUnit();
  public objUnitOfMeasure: UnitOfMeasure = new UnitOfMeasure();
  lstResourceType: any[];
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public objUnitResourceDetail: UnitResourceDetail = new UnitResourceDetail();
  lstUnitResourceDetail: UnitResourceDetail[] = new Array<UnitResourceDetail>();
  constructor(private messageHelper: MessageHelper, private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.showEntry = false;
    console.log(this.lstUnitResourceDetail);
    this.getAllUnitOfMeasure();
    this.lstResourceType = ResourceType;

  }


  getAllUnitOfMeasure() {
    this.unitOfMeasureService.getAllUnitOfMeasure().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstUnitOfMeasure = response.ResponseObj;

        this.lstUnitOfMeasure.forEach(unit => {
          var parentUnit = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == unit.ParentUnitOfMeasure)[0]
          if (parentUnit) {
            unit.ParentUnitOfMeasureName = parentUnit.Name;
          }
          else {
            unit.ParentUnitOfMeasureName = "N/A";
          }
        })

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  addNew() {
    this.objUnitOfMeasure = new UnitOfMeasure();
    this.lstUnitResourceDetail = [];
    this.objUnitResourceDetail = new UnitResourceDetail();
    this.lstUnitResourceDetail.push(this.objUnitResourceDetail);
    this.showEntry = true;
  }
  close() {
    this.objUnitOfMeasure = new UnitOfMeasure();
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

  editUnit(unitOfMeasure) {
    this.objUnitOfMeasure = unitOfMeasure;
    this.showEntry = true;
  }

  deleteUnit() {

  }

  saveUnit() {
    this.unitOfMeasureService.saveUnitOfMeasure(this.objUnitOfMeasure).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objUnitOfMeasure = new UnitOfMeasure();
        this.getAllUnitOfMeasure();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


}
