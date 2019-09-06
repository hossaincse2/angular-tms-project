import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/smModels/unit';
import { VMUnit } from '../../models/smModels/vmUnit';
import { POLReceiveDetail } from '../../models/smModels/POLReceiveDetail';
import { POLReceive } from '../../models/smModels/POLReceive';
import { ResponseStatus, DemandItemType, DemandStatus, POL_RECEIVESTATUS } from '../../common/QSEnums';
import { QueryObject } from '../../models/queryObject';
import { VMPOLReceive } from '../../models/smModels/vmPOLReceive';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { POLReceiveService } from '../../services/polReceiveService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitService } from '../../services/unitService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
declare var $: any;

@Component({
  selector: 'app-pol-receive',
  templateUrl: './pol-receive.component.html',
  styleUrls: ['./pol-receive.component.css'],
  providers: [ItemService, POLReceiveService, UnitService, UnitOfMeasureService]
})
export class PolReceiveComponent implements OnInit {

  public objQueryObject: QueryObject = new QueryObject();
  public objUnit: Unit = new Unit();
  public objVMPOLReceive: VMPOLReceive = new VMPOLReceive();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objPOLReceive: POLReceive = new POLReceive();
  public objPOLReceiveDetail: POLReceiveDetail = new POLReceiveDetail();
  public lstPOLReceiveDetail: POLReceiveDetail[] = new Array<POLReceiveDetail>();
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public lstVMPOLReceive: VMPOLReceive[] = new Array<VMPOLReceive>();
  public lstItem: Item[] = new Array<Item>();
  public lstPOLItem: Item[] = new Array<Item>();
  showEntry: boolean = false;
  constructor(private itemService: ItemService, private polReceiveService: POLReceiveService, private UnitService: UnitService,
    private messageHelper: MessageHelper, private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.getAllItem();
    this.getAllUnit();
    this.getAllUnitOfMeasure();
    this.objPOLReceiveDetail = new POLReceiveDetail();
    this.lstPOLReceiveDetail.push(this.objPOLReceiveDetail);
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

  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
        this.lstPOLItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[2].id);
      }
    });
  }
  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  addNewPOL() {
    this.showEntry = true;
  }
  close() {
    this.objPOLReceive = new POLReceive();
    this.lstPOLReceiveDetail = [];
    this.showEntry = false;

  }

  addNew() {
    this.objPOLReceiveDetail = new POLReceiveDetail();
    this.lstPOLReceiveDetail.push(this.objPOLReceiveDetail);
  }

  savePOLReceive() {
    this.objVMPOLReceive.POLReceive = this.objPOLReceive;
    this.objVMPOLReceive.lstPOLReceiveDetail = this.lstPOLReceiveDetail;
    console.log(this.objVMPOLReceive);

    this.polReceiveService.savePOLReceive(this.objVMPOLReceive).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPOLReceive = new POLReceive();

        this.lstPOLReceiveDetail = [];
        this.objVMPOLReceive = new VMPOLReceive();

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getFilteredPOLReceive() {
    this.polReceiveService.getFilteredPOLReceive(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMPOLReceive = response.ResponseObj;
      }
    });
  }


  addResource() {
    this.objPOLReceiveDetail = new POLReceiveDetail();
    this.lstPOLReceiveDetail.push(this.objPOLReceiveDetail);
  }

  removeResource() {
    this.lstPOLReceiveDetail.pop();
  }


  editPOLReceive(vmPOLReceive) {
    this.polReceiveService.getPOLReceiveByID(vmPOLReceive).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMPOLReceive = response.ResponseObj;
        this.objPOLReceive = this.objVMPOLReceive.POLReceive;
        this.lstPOLReceiveDetail = this.objVMPOLReceive.lstPOLReceiveDetail;
        this.showEntry = true;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  deletePOLReceive(vmPOLReceive) {
    this.objVMPOLReceive.POLReceive = this.objPOLReceive;

    this.polReceiveService.deletePOLReceive(this.objVMPOLReceive).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPOLReceive = new POLReceive();
        this.lstPOLReceiveDetail = [];
        this.objVMPOLReceive = new VMPOLReceive();
        this.getFilteredPOLReceive();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  apovePOLReceive(vmPOLReceive) {
    this.polReceiveService.approvePOLReceive(vmPOLReceive).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPOLReceive = new POLReceive();
        this.lstPOLReceiveDetail = [];
        this.objVMPOLReceive = new VMPOLReceive();
        this.getFilteredPOLReceive();

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });

  }

  polReceiveDetail(vmPOLReceive) {
    this.lstPOLReceiveDetail = vmPOLReceive.lstPOLReceiveDetail;

   

    this.lstPOLReceiveDetail.forEach(detail => {
      var item = this.lstItem.filter(i => i.ItemID == detail.ItemID)[0];

      var unitOfMeasure = this.lstUnitOfMeasure.filter(i => i.UnitOfMeasureID == detail.UnitOfMeasure)[0];

   

      if (item) {
        detail.ItemName = item.ItemName;
      }
      if (unitOfMeasure) {
        detail.UnitOfMeasureName = unitOfMeasure.Name;
      }
    })

    $('#adminApprovalModal').modal("show");
  }
}
