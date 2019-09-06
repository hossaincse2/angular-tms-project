import { Component, OnInit } from '@angular/core';

import { VMUnit } from '../../models/smModels/vmUnit';
import { Unit } from '../../models/smModels/unit';
import { POLAllotment } from '../../models/smModels/polAllotment';
import { POLAllotmentDetail } from '../../models/smModels/polAllotmentDetail';
import { ResponseStatus, DemandItemType, AllotmentType } from '../../common/QSEnums';
import { QueryObject } from '../../models/queryObject';
import { VMPOLAllotment } from '../../models/smModels/vmPOLAllotment';
import { UnitService } from '../../services/unitService';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { POLAllotmentService } from '../../services/polAllotmentService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';

@Component({
  selector: 'app-pol-allotment',
  templateUrl: './pol-allotment.component.html',
  styleUrls: ['./pol-allotment.component.css'],
  providers: [UnitService, ItemService, POLAllotmentService,
    UnitOfMeasureService]
})
export class PolAllotmentComponent implements OnInit {
  showEntry = false;
  public objQueryObject: QueryObject = new QueryObject();
  public objPOLAlltment: POLAllotment = new POLAllotment();
  public objUnit: Unit = new Unit();
  public objVMPOLAllotment: VMPOLAllotment = new VMPOLAllotment();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public lstUnitOfMeasure: UnitOfMeasure[]=new Array<UnitOfMeasure>();
  public objPOLAllotment: POLAllotment = new POLAllotment();
  public lstPOLAllotmentDetail: POLAllotmentDetail[] = new Array<POLAllotmentDetail>();
  public objPOLAllotmentDetail: POLAllotmentDetail = new POLAllotmentDetail();
  public allotmentType: any[];
  public lstItem: Item[] = new Array<Item>();
  public lstPOLItem: Item[] = new Array<Item>();
  public lstVMPOLAllotment: VMPOLAllotment[] = new Array<VMPOLAllotment>();
  constructor(private unitService: UnitService, private itemService: ItemService,
    private polAllotmentService: POLAllotmentService, private messageHelper: MessageHelper,
    private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.showEntry = false;
  
    this.getAllUnit();
    this.getAllItem();
    this.getAllUnitOfMeasure();
    this.allotmentType = AllotmentType;
    this.objPOLAllotmentDetail = new POLAllotmentDetail();
    this.lstPOLAllotmentDetail.push(this.objPOLAllotmentDetail);
  }

  getAllUnitOfMeasure() {
    this.unitOfMeasureService.getAllUnitOfMeasure().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstUnitOfMeasure = response.ResponseObj;
        console.log("unit List", this.lstUnitOfMeasure);
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }



  addNew() {
    this.objPOLAllotment = new POLAllotment();
    this.showEntry = true;
  }

  getAllUnit() {
    this.unitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
      }
    });
  }

  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
        this.lstPOLItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[2].id);
      }
    });
  }



  addItem() {
    this.objPOLAllotmentDetail = new POLAllotmentDetail();
    this.lstPOLAllotmentDetail.push(this.objPOLAllotmentDetail);
  }

  removeItem() {
    this.lstPOLAllotmentDetail.pop();
  }
  saveAllotment() {
    this.objVMPOLAllotment.POLAllotment = this.objPOLAllotment;
    this.objVMPOLAllotment.lstPOLAllotmentDetail = this.lstPOLAllotmentDetail;
    console.log(this.objVMPOLAllotment);

    this.polAllotmentService.savePOLAllotment(this.objVMPOLAllotment).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPOLAllotment = new POLAllotment();

        this.lstPOLAllotmentDetail = [];
        this.objVMPOLAllotment = new VMPOLAllotment();

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  close() {
    this.objPOLAllotment = new POLAllotment();
    this.lstPOLAllotmentDetail = [];
    this.showEntry = false;

  }
  getFilteredPOLAllotment() {
    this.polAllotmentService.getFilteredPOLAllotment(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMPOLAllotment = response.ResponseObj;
        if (this.lstVMPOLAllotment.length > 0) {
          this.lstVMPOLAllotment.forEach(v => {
            var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.POLAllotment.UnitID)[0];
            var rStatus = AllotmentType.filter(d => d.id == v.POLAllotment.AllotmentType)[0];
            if (unit) {
              v.POLAllotment.UnitName = unit.Unit.UnitName;
              v.POLAllotment.AllotmentTypeName = rStatus.name;
            }
          })
        }
      }
    });
  }
  editPOLAllotment(vmPOLAllotment) {
    this.polAllotmentService.getPOLAllotmentByID(vmPOLAllotment).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMPOLAllotment = response.ResponseObj;
        this.objPOLAllotment = this.objVMPOLAllotment.POLAllotment;
        this.lstPOLAllotmentDetail = this.objVMPOLAllotment.lstPOLAllotmentDetail;
        this.showEntry = true;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  apovePOLAllotment(vmPOLAllotment) {
    this.polAllotmentService.approvePOLAllotment(vmPOLAllotment).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPOLAllotment = new POLAllotment();
        this.lstPOLAllotmentDetail = [];
        this.objVMPOLAllotment = new VMPOLAllotment();

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });

  }
  calculateTotal() {
    this.lstPOLAllotmentDetail.forEach(detail => {
      detail.TotalQuantity = ((detail.Quantity * detail.Price)).toFixed(2);


    })
  }

}
