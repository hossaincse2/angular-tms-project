import { Component, OnInit } from '@angular/core';
import { ResponseStatus, UnitOfMeasure, DemandItemType, DemandStatus } from '../../common/QSEnums';
import { Item } from '../../models/smModels/item';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemTypeService } from '../../services/itemTypeService';
import { ItemService } from '../../services/itemService';
import { ItemType } from '../../models/smModels/itemType';
import { FreshDemandService } from '../../services/freshDemandService';
import { FreshDemand } from '../../models/smModels/freshDemand';
import { FreshDemandDetail } from '../../models/smModels/freshDemandDetail';
import { VMFreshDemand } from '../../models/smModels/vmFreshDemand';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';
import { QueryObject } from '../../models/queryObject';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
declare var $: any;

@Component({
  selector: 'app-fresh-rat-dmd',
  templateUrl: './fresh-rat-dmd.component.html',
  styleUrls: ['./fresh-rat-dmd.component.css'],
  providers: [ItemService, FreshDemandService, UnitService, SupplyPlaceService]
})
export class FreshRatDmdComponent implements OnInit {
  public objFreshDemand: FreshDemand = new FreshDemand();
  public objFreshDemandDetail: FreshDemandDetail = new FreshDemandDetail();
  public lstFreshDemandDetail: FreshDemandDetail[] = new Array<FreshDemandDetail>();
  public objVMFreshDemand: VMFreshDemand = new VMFreshDemand();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  showEntry: boolean = false;
  lstItemType: ItemType[] = new Array<ItemType>();
  lstItem: Item[] = new Array<Item>();
  lstFreshItem: Item[] = new Array<Item>();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();
  totalDemand: number = 0;
  public lstUnitOfMeasure: any[];
  public objItem: Item = new Item();
  objQueryObject: QueryObject = new QueryObject();
  public lstVMUnitDemand: VMFreshDemand[] = new Array<VMFreshDemand>();

  constructor(private messageHelper: MessageHelper, private ItemService: ItemService
    , private freshDemandService: FreshDemandService, private UnitService: UnitService, private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.objFreshDemand.NumberOfPeople = 0;
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.getAllSupplyPlace();
    this.lstUnitOfMeasure = UnitOfMeasure;
    // this.objFreshDemandDetail = new FreshDemandDetail();
    // this.lstFreshDemandDetail.push(this.objFreshDemandDetail);

  }

  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
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

  loadItem() {
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[3].id && i.IsDemandItem);
    this.lstFreshDemandDetail = [];
    this.lstFreshItem.forEach(item => {
      this.objFreshDemandDetail = new FreshDemandDetail();
      this.objFreshDemandDetail.ItemID = item.ItemID;
      this.objFreshDemandDetail.ItemName = item.ItemName;
      this.objFreshDemandDetail.Quantity = item.FreeScale;
      this.objFreshDemandDetail.itemCheck = false;
      this.lstFreshDemandDetail.push(this.objFreshDemandDetail);
    })
  }

  calculateTotal() {
    this.totalDemand = 0;
    this.lstFreshDemandDetail.forEach(demandDetail => {
      if (demandDetail.itemCheck) {
        demandDetail.Total = (demandDetail.Quantity * this.objFreshDemand.NumberOfPeople) / 1000;
        this.totalDemand += demandDetail.Total;
      }
      else {
        demandDetail.Total = 0;
      }
    })


    // if (this.lstFreshDemandDetail[index].itemCheck) {
    //   this.lstFreshDemandDetail[index].Total = (this.lstFreshDemandDetail[index].Quantity * this.objFreshDemand.NumberOfPeople) / 1000;
    // }
  }

  editItemType(item) {
    this.objItem = item;
    this.showEntry = true;
  }

  addNew() {
    this.objItem = new Item();
    this.showEntry = true;
    this.totalDemand = 0;
    this.lstFreshDemandDetail = [];
    this.objFreshDemand = new FreshDemand();
  }
  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }

  deleteItemType(itemType) {

  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }

  getFilteredFreshDemand() {
    this.lstVMUnitDemand = [];
    this.freshDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        console.log(this.lstVMUnitDemand);
        if (this.objQueryObject.SupplyPlaceID > 0) {
          this.lstVMUnitDemand = this.lstVMUnitDemand.filter(d => d.FreshDemand.SupplyPlaceID == this.objQueryObject.SupplyPlaceID);
        }

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.FreshDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.FreshDemand.Status)[0];
          var supplyPalce = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == v.FreshDemand.SupplyPlaceID)[0];

          if (supplyPalce) {
            v.FreshDemand.SupplyPlaceName = supplyPalce.SupplyPlaceName;
          }

          if (unit) {
            v.FreshDemand.UnitName = unit.Unit.UnitName;
            v.FreshDemand.StatusName = rStatus.name;
          }
        })


      }


    });
  }




  editDemand(vmFrshDemand) {

    this.freshDemandService.getVMFreshDemand(vmFrshDemand.FreshDemand.FreshDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMFreshDemand = response.ResponseObj;
        this.totalDemand = 0;
        this.objFreshDemand = this.objVMFreshDemand.FreshDemand;
        this.lstFreshDemandDetail = this.objVMFreshDemand.lstFreshDemandDetail;
        this.lstFreshDemandDetail = [];
        this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[3].id && i.IsDemandItem);
        this.lstFreshItem.forEach(item => {
          var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];
          this.objFreshDemandDetail = this.objVMFreshDemand.lstFreshDemandDetail.filter(c => c.ItemID == item.ItemID)[0];
    
          if (this.objFreshDemandDetail) {
            this.objFreshDemandDetail.ItemName = item.ItemName;
            this.objFreshDemandDetail.itemCheck = true;
            this.totalDemand += this.objFreshDemandDetail.Total;
            this.lstFreshDemandDetail.push(this.objFreshDemandDetail);
          }
          else {
            var newObjFreshDemandDetail = new FreshDemandDetail();
            newObjFreshDemandDetail.ItemID = item.ItemID;
            newObjFreshDemandDetail.ItemName = item.ItemName;
            newObjFreshDemandDetail.Quantity = item.FreeScale;
            newObjFreshDemandDetail.itemCheck = false;
            newObjFreshDemandDetail.Total = 0;
            this.lstFreshDemandDetail.push(newObjFreshDemandDetail);
          }
        })
        console.log(this.lstFreshDemandDetail);
        this.showEntry = true;

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });


    



  }



  demandDetail(vmFrshDemand) {

    this.freshDemandService.getVMFreshDemand(vmFrshDemand.FreshDemand.FreshDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMFreshDemand = response.ResponseObj;
        this.lstFreshDemandDetail = this.objVMFreshDemand.lstFreshDemandDetail;
        $('#unitDemandModal').modal("show");

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });


    // this.lstFreshDemandDetail = vmFrshDemand.lstFreshDemandDetail;
    // this.lstFreshDemandDetail.forEach(c => {
    //   var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
    //   if (item != null) {
    //     c.ItemName = item.ItemName;
    //   }
    // })
    // $('#unitDemandModal').modal("show");
  }

  deleteDemand(freshDemandID) {
    if (confirm("Are you sure to delete this record?")) {
      this.freshDemandService.deleteFreshDemand(freshDemandID).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Successfully Deleted");
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to delete");
        }
      });
    }
  }

  saveUnitfreshDemand() {
    if (!this.lstFreshDemandDetail.filter(c => c.itemCheck)) {
      this.messageHelper.showMessage(ResponseStatus.fail, "Please select item for demand");
    }

    this.objVMFreshDemand.FreshDemand = this.objFreshDemand;
    this.objVMFreshDemand.lstFreshDemandDetail = this.lstFreshDemandDetail.filter(c => c.itemCheck);
    this.freshDemandService.saveUnitDemand(this.objVMFreshDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objFreshDemand = new FreshDemand();
        this.objFreshDemandDetail = new FreshDemandDetail();

        this.lstFreshDemandDetail = [];
        this.objVMFreshDemand = new VMFreshDemand();
        this.totalDemand = 0;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  generateBarcode(value: string) {
    $(document).ready(function () {

      var btype = 'code39';
      var renderer = 'css';

      var settings = {
        output: renderer,
        bgColor: '#FFFFFF',
        color: '#000000',
        barWidth: '1',
        barHeight: '50',
        moduleSize: '10',
        showHRI: false,
        posX: '0',
        posY: '0',
        addQuietZone: '1'
      };

      $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    });
  }


  generatePrint() {
    $('.printMe').click(function () {
      $("#InvoicePrint").print({
        globalStyles: true,
        mediaPrint: false,
        stylesheet: null,
        noPrintSelector: ".noprint",
        iframe: true,
        append: null,
        prepend: null,
        manuallyCopyFormValues: true,
        deferred: $.Deferred(),
        timeout: 750,
        title: null,
        doctype: '<!doctype html>'
      });

    });
  }


}
