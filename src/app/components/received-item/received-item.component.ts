import { Component, OnInit } from '@angular/core';
import { ReceiveItem } from '../../models/smModels/receiveItem';
import { ReceiveItemDetail } from '../../models/smModels/ReceiveItemDetail';
import { ReceiveItemService } from '../../services/receiveItemService';
import { ItemType } from '../../models/smModels/itemType';
import { Item } from '../../models/smModels/item';
import { ItemService } from '../../services/itemService';
import { ItemTypeService } from '../../services/itemTypeService';
import { ResponseStatus } from '../../common/QSEnums';
import { VMReceiveItem } from '../../models/smModels/vmReceiveItem';
import { MessageHelper } from '../../common/helper/messageHelper';
import { QueryObject } from '../../models/queryObject';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
declare var $: any;

@Component({
  selector: 'app-received-item',
  templateUrl: './received-item.component.html',
  styleUrls: ['./received-item.component.css'],
  providers: [ReceiveItemService, ItemTypeService, ItemService,
    MessageHelper, UnitOfMeasureService]
})
export class ReceivedItemComponent implements OnInit {

  public objVMReceiveItem: VMReceiveItem = new VMReceiveItem();
  public lstVMReceiveItem: VMReceiveItem[] = new Array<VMReceiveItem>();

  public objQueryObject: QueryObject = new QueryObject();

  showEntry = false;
  public objReceiveItem: ReceiveItem = new ReceiveItem();
  public objReceiveItemDetail: ReceiveItemDetail = new ReceiveItemDetail();
  public lstReceiveItemDetail: ReceiveItemDetail[] = new Array<ReceiveItemDetail>();
  lstItemType: ItemType[] = new Array<ItemType>();
  lstItem: Item[] = new Array<Item>();
  lstFilterItem: Item[] = new Array<Item>();


  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();


  constructor(public recevieItemService: ReceiveItemService, private messageHelper: MessageHelper,
    private itemTypeService: ItemTypeService, private itemService: ItemService,
    private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.getAllItemType();
    this.getAllItem();
    this.getAllUnitOfMeasure();
    this.showEntry = false;
    // this.lstUnitOfMeasure = UnitOfMeasure;
    this.objReceiveItemDetail = new ReceiveItemDetail();
    this.lstReceiveItemDetail.push(this.objReceiveItemDetail);
  }
  getAllItemType() {
    this.itemTypeService.getAllItemType().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemType = response.ResponseObj;
      }
    });
  }

  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
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

  LoadItemName(i) {
    var itemType = this.lstReceiveItemDetail[i].ItemTypeID;
    if (itemType > 0) {
      this.lstFilterItem = this.lstItem.filter(i => i.ItemTypeID == itemType);
    }

  }

  addNew() {
    this.showEntry = true;
  }

  close() {
    this.showEntry = false;
  }
  addItem() {
    this.objReceiveItemDetail = new ReceiveItemDetail();
    this.lstReceiveItemDetail.push(this.objReceiveItemDetail);
  }

  removeItem(index) {
    if (this.lstReceiveItemDetail.length > 1)
      this.lstReceiveItemDetail.pop();
  }

  saveReceiveItem() {
    this.objVMReceiveItem.ReceiveItem = this.objReceiveItem;
    this.objVMReceiveItem.lstReceiveItemDetail = this.lstReceiveItemDetail;
    this.recevieItemService.saveReceiveItem(this.objVMReceiveItem).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMReceiveItem = new VMReceiveItem();
        this.objReceiveItem = new ReceiveItem();
        this.lstReceiveItemDetail = [];
        this.objReceiveItemDetail = new ReceiveItemDetail();
        this.lstReceiveItemDetail.push(this.objReceiveItemDetail);
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
      }
      else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to saved receive item");
      }
    });
  }


  getFilteredReceiveItem() {
    this.recevieItemService.getFilteredReceiveItem(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMReceiveItem = response.ResponseObj;
      }
      else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });
  }

  receiveDetail(vmReceiveItem) {

    console.log(vmReceiveItem);

    this.lstReceiveItemDetail = vmReceiveItem.lstReceiveItemDetail;

    this.lstReceiveItemDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      var unitOfMeasure = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == c.UnitOfMeasure)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
      if (unitOfMeasure) {
        c.UnitOfMeasureName = unitOfMeasure.Name;
      }
    })

    $('#unitDemandModal').modal("show");
  }

  editReceive(vmReceiveItem) {
    this.objReceiveItem = vmReceiveItem.ReceiveItem;
    this.lstReceiveItemDetail = vmReceiveItem.lstReceiveItemDetail;
    this.showEntry = true;
  }





}
