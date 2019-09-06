import { Component, OnInit, ɵConsole } from '@angular/core';
import { ResponseStatus, DemandItemType, DemandStatus } from '../../common/QSEnums';
import { Item } from '../../models/smModels/item';
import { ButcheryDemandDetail } from '../../models/smModels/ButcheryDemandDetail';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ButcheryDemandService } from '../../services/ButcheryDemandService';
import { ItemService } from '../../services/itemService';
import { UnitService } from '../../services/unitService';
import { ItemType } from '../../models/smModels/itemType';
import { VMUnit } from '../../models/smModels/vmUnit';
import { VMButcheryDemand } from '../../models/smModels/vmButcheryDemand';
import { ButcheryDemand } from '../../models/smModels/ButcheryDemand';
import { QueryObject } from '../../models/queryObject';
import { LocalStorageService } from 'angular-web-storage';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
declare var $: any;

@Component({
  selector: 'app-butchry-items-dmd',
  templateUrl: './butchry-items-dmd.component.html',
  styleUrls: ['./butchry-items-dmd.component.css'],
  providers: [ItemService, ButcheryDemandService, UnitService,
    UnitOfMeasureService, SupplyPlaceService]
})
export class ButchryItemsDmdComponent implements OnInit {


  public objButcheryDemand: ButcheryDemand = new ButcheryDemand();
  public objButcheryDemandDetail: ButcheryDemandDetail = new ButcheryDemandDetail();
  public lstButcheryDemandDetail: ButcheryDemandDetail[] = new Array<ButcheryDemandDetail>();
  public objVMButcheryDemand: VMButcheryDemand = new VMButcheryDemand();
  public lstVMUnitDemand: VMButcheryDemand[] = new Array<VMButcheryDemand>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  objQueryObject: QueryObject = new QueryObject();
  showEntry: boolean = false;
  lstItemType: ItemType[] = new Array<ItemType>();
  lstItem: Item[] = new Array<Item>();
  lstFreshItem: Item[] = new Array<Item>();
  totalDemand: number = 0;
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public objItem: Item = new Item();
  userLevel: number = 0;
  public lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();

  constructor(private messageHelper: MessageHelper, private ItemService: ItemService
    , private ButcheryDemandService: ButcheryDemandService, private UnitService: UnitService,
    private localStorageService: LocalStorageService, private unitOfMeasureService: UnitOfMeasureService,
    private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.getAllUnitOfMeasure();
    this.getAllSupplyPlace();
    this.userLevel = this.localStorageService.get("userLevel");
    console.log("user Level", this.userLevel);
  }

  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
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

    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[4].id && i.IsDemandItem);//implement later.

    this.lstButcheryDemandDetail = [];
    this.lstFreshItem.forEach(item => {
      var unit = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == item.UnitOfMesure)[0];
      this.objButcheryDemandDetail = new ButcheryDemandDetail();
      this.objButcheryDemandDetail.ItemID = item.ItemID;
      this.objButcheryDemandDetail.ItemName = item.ItemName;
      this.objButcheryDemandDetail.NumberOfPeople = 0;
      this.objButcheryDemandDetail.Quantity = item.FreeScale;
      if (unit) {
        this.objButcheryDemandDetail.UnitOfMesureName = item.FreeScale + '' + unit.Name;
      }
      this.lstButcheryDemandDetail.push(this.objButcheryDemandDetail);
    })
  }



  calculateTotal() {
    this.totalDemand = 0;
    this.lstButcheryDemandDetail.forEach(demandDetail => {
      if (demandDetail.itemCheck) {

        var item = this.lstFreshItem.filter(f => f.ItemID == demandDetail.ItemID)[0];
        if (item) {
          var unitOfMeasure = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == item.UnitOfMesure)[0];


          if (unitOfMeasure.ParentUnitOfMeasure > 0) {
            demandDetail.Total = (demandDetail.Quantity * demandDetail.NumberOfPeople) / 1000;
            this.totalDemand += demandDetail.Total;
          }
          else {
            demandDetail.Total = (demandDetail.Quantity * demandDetail.NumberOfPeople);
            this.totalDemand += demandDetail.Total;
          }
        }
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
    this.lstButcheryDemandDetail = [];
    this.objButcheryDemand = new ButcheryDemand();
  }
  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }


  getFilteredButcheryDemand() {

    this.ButcheryDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        if (this.objQueryObject.SupplyPlaceID > 0) {
          this.lstVMUnitDemand = this.lstVMUnitDemand.filter(d => d.ButcheryDemand.SupplyPlaceID == this.objQueryObject.SupplyPlaceID);
        }

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.ButcheryDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.ButcheryDemand.Status)[0];
          var supplyPalce = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == v.ButcheryDemand.SupplyPlaceID)[0];

          if (supplyPalce) {
            v.ButcheryDemand.SupplyPlaceName = supplyPalce.SupplyPlaceName;
          }


          if (unit) {
            v.ButcheryDemand.UnitName = unit.Unit.UnitName;
            v.ButcheryDemand.StatusName = rStatus.name;
          }
        })
      }
    });
  }



  deleteItemType(itemType) {

  }


  editDemand(vmButDemand) {

    this.ButcheryDemandService.getVMButcheryDemand(vmButDemand.ButcheryDemand.ButcheryDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMButcheryDemand = response.ResponseObj;
        this.totalDemand = 0;
        this.objButcheryDemand = this.objVMButcheryDemand.ButcheryDemand;
        this.lstButcheryDemandDetail = this.objVMButcheryDemand.lstButcheryDemandDetail;
        this.lstButcheryDemandDetail = [];
        this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[4].id);

        this.lstFreshItem.forEach(item => {
          var unit = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == item.UnitOfMesure)[0];
          this.objButcheryDemandDetail = this.objVMButcheryDemand.lstButcheryDemandDetail.filter(c => c.ItemID == item.ItemID)[0];

          if (this.objButcheryDemandDetail) {
            this.objButcheryDemandDetail.ItemName = item.ItemName;
            this.objButcheryDemandDetail.itemCheck = true;
            this.totalDemand += this.objButcheryDemandDetail.Total;
            this.lstButcheryDemandDetail.push(this.objButcheryDemandDetail);
          }
          else {
            var newobjButcheryDemandDetail = new ButcheryDemandDetail();
            newobjButcheryDemandDetail.ItemID = item.ItemID;
            newobjButcheryDemandDetail.ItemName = item.ItemName;
            newobjButcheryDemandDetail.Quantity = item.FreeScale;
            newobjButcheryDemandDetail.itemCheck = false;
            newobjButcheryDemandDetail.Total = 0;
            this.lstButcheryDemandDetail.push(newobjButcheryDemandDetail);
          }
        })
        this.showEntry = true;
      }
    });



  }
  demandDetail(vmButcheryDemand) {

    this.ButcheryDemandService.getVMButcheryDemand(vmButcheryDemand.ButcheryDemand.ButcheryDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMButcheryDemand = response.ResponseObj;
        this.lstButcheryDemandDetail = [];
        this.lstButcheryDemandDetail = this.objVMButcheryDemand.lstButcheryDemandDetail.filter(d => d.Total > 0 || d.ApprovedQty > 0);
        $('#unitDemandModal').modal("show");
      }
    });

    // this.lstButcheryDemandDetail = vmButcheryDemand.lstButcheryDemandDetail;

    // this.lstButcheryDemandDetail.forEach(c => {
    //   var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
    //   if (item != null) {
    //     c.ItemName = item.ItemName;
    //   }
    // })
    // $('#unitDemandModal').modal("show");


  }



  deleteDemand(butcheryDemandID) {
    if (confirm("Are you sure to delete this record?")) {
      this.ButcheryDemandService.deleteButcheryDemand(butcheryDemandID).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Successfully Deleted");
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to delete");
        }
      });
    }
  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }
  saveButchryDemand() {
    if (!this.lstButcheryDemandDetail.filter(c => c.itemCheck)) {
      this.messageHelper.showMessage(ResponseStatus.fail, "Please check item for demand");
    }
    this.objVMButcheryDemand.ButcheryDemand = this.objButcheryDemand;
    this.objVMButcheryDemand.lstButcheryDemandDetail = this.lstButcheryDemandDetail.filter(c => c.itemCheck)
    this.ButcheryDemandService.saveUnitDemand(this.objVMButcheryDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objButcheryDemand = new ButcheryDemand();
        this.objButcheryDemandDetail = new ButcheryDemandDetail();
        this.totalDemand = 0;
        this.lstButcheryDemandDetail = [];
        this.objVMButcheryDemand = new VMButcheryDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


}
