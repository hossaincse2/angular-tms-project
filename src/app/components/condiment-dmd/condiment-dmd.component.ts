import { Component, OnInit } from '@angular/core';
import { VMCondimentDemand } from '../../models/smModels/vmCondimentDemand';
import { CondimentDemand } from '../../models/smModels/condimentDemand';
import { CondimentDemandDetail } from '../../models/smModels/condimentDemandDetail';
import { CondimentDemandService } from '../../services/condimentDemandService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemService } from '../../services/itemService';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';
import { Item } from '../../models/smModels/item';
import { UnitOfMeasure, ResponseStatus, DemandItemType, DemandStatus, SMS_USER_LEVEL } from '../../common/QSEnums';
import { QueryObject } from '../../models/queryObject';
import { LocalStorageService } from 'angular-web-storage';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
import { Users } from '../../models/user';
declare var $: any;

@Component({
  selector: 'app-condiment-dmd',
  templateUrl: './condiment-dmd.component.html',
  styleUrls: ['./condiment-dmd.component.css'],
  providers: [CondimentDemandService, ItemService, UnitService, SupplyPlaceService],
})
export class CondimentDmdComponent implements OnInit {

  public objVMCondimentDemand: VMCondimentDemand = new VMCondimentDemand();
  public objCondimentDemand: CondimentDemand = new CondimentDemand();
  public lstCondimentDemandDetail: CondimentDemandDetail[] = new Array<CondimentDemandDetail>();
  public objCondimentDemandDetail: CondimentDemandDetail = new CondimentDemandDetail();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();
  public objVMUnitDemand: VMCondimentDemand = new VMCondimentDemand();
  public lstVMUnitDemand: VMCondimentDemand[] = new Array<VMCondimentDemand>();
  showApproveButton: boolean = false;
  objQueryObject: QueryObject = new QueryObject();
  totalDemand: number = 0;
  showEntry: boolean = false;
  lstItem: Item[] = new Array<Item>();
  lstFreshItem: Item[] = new Array<Item>();
  userLevel: number = 0;
  public lstUnitOfMeasure: any[];
  public objItem: Item = new Item();
  public totalDay: number = 1;
  public objUser: Users = new Users();
  constructor(private messageHelper: MessageHelper, private ItemService: ItemService,
    private UnitService: UnitService, private condimentDemandService: CondimentDemandService,
    private localStorageService: LocalStorageService, private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.lstVMUnit = [];
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();

    this.getAllItem();
    this.getAllUnit();
    this.getAllSupplyPlace();
    this.lstUnitOfMeasure = UnitOfMeasure;
    this.userLevel = this.localStorageService.get("userLevel");
    this.generatePrint();

  }

  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
      }
    });
  }

  generatePrint() {
    $('.printMe').click(function () {
      $("#adminApprovalModalPrint").print({
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
  getAllUnit() {

    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        console.log("Unit", this.lstVMUnit);
        this.lstVMUnit = response.ResponseObj;

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });

  }



  loadItem() {
    this.lstCondimentDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[1].id);

    this.lstFreshItem.forEach(item => {
      var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];
      this.objCondimentDemandDetail = new CondimentDemandDetail();
      this.objCondimentDemandDetail.ItemID = item.ItemID;
      this.objCondimentDemandDetail.ItemName = item.ItemName;
      this.objCondimentDemandDetail.Quantity = item.FreeScale;
      this.lstCondimentDemandDetail.push(this.objCondimentDemandDetail);
    })
  }

  calculateTotal() {
    this.totalDemand = 0;
    this.lstCondimentDemandDetail.forEach(demandDetail => {
      if (demandDetail.itemCheck) {

        // this.totalDay = (this.totalDay == 0) ? 1 : this.totalDay;
        // demandDetail.Pradhikar = (demandDetail.Quantity * this.objCondimentDemand.NumberOfPeople * this.totalDay) / 1000;

        this.objCondimentDemand.TotalDays = (this.objCondimentDemand.TotalDays== 0) ? 1 : this.objCondimentDemand.TotalDays;
        demandDetail.Pradhikar = (demandDetail.Quantity * this.objCondimentDemand.NumberOfPeople * this.objCondimentDemand.TotalDays) / 1000;


        demandDetail.Pradhikar =  parseFloat((demandDetail.Pradhikar).toFixed(2));
        this.totalDemand += demandDetail.Pradhikar;
      }
      else {
        demandDetail.Pradhikar = 0;
      }
    })
  }

  CalculateTotalDemand() {
    this.lstCondimentDemandDetail.forEach(demandDetail => {
      if (demandDetail.itemCheck && demandDetail.Stock > 0) {
        demandDetail.Total = parseFloat((demandDetail.Pradhikar - demandDetail.Stock).toFixed(2));

      }
    })
  }

  editItemType(item) {
    this.objItem = item;
    this.showEntry = true;
  }

  editDemand(vmCondimentDemand) {

    this.totalDemand = 0;
    this.objCondimentDemand = vmCondimentDemand.CondimentDemand;

    this.lstCondimentDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[1].id);

    this.lstFreshItem.forEach(item => {
      var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];

      this.objCondimentDemandDetail = vmCondimentDemand.lstCondimentDemandDetail.filter(c => c.ItemID == item.ItemID)[0];

      if (this.objCondimentDemandDetail) {
        this.objCondimentDemandDetail.ItemName = item.ItemName;
        this.objCondimentDemandDetail.itemCheck = true;
        this.totalDemand += this.objCondimentDemandDetail.Total;
        this.lstCondimentDemandDetail.push(this.objCondimentDemandDetail);
      }
      else {
        var newObjCondimentDemandDetail = new CondimentDemandDetail();
        newObjCondimentDemandDetail.ItemID = item.ItemID;
        newObjCondimentDemandDetail.ItemName = item.ItemName;
        newObjCondimentDemandDetail.Quantity = item.FreeScale;
        newObjCondimentDemandDetail.itemCheck = false;
        newObjCondimentDemandDetail.Total = 0;
        this.lstCondimentDemandDetail.push(newObjCondimentDemandDetail);

      }

    })

    this.showEntry = true;
  }

  addNew() {
    this.objItem = new Item();
    this.showEntry = true;
    this.totalDemand = 0;
    this.lstCondimentDemandDetail = [];
    this.objCondimentDemand = new CondimentDemand();
    this.objCondimentDemand.DemandDate = new Date();
    this.objCondimentDemand.FromDate = new Date();
    this.objCondimentDemand.ToDate = new Date();
  }

  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }

  deleteDemand(vmCondimentDemand) {

  }

  onDateChange() {
    // var diff = this.objDryItemDemand.DemandTo.valueOf() - this.objDryItemDemand.DemandFrom.valueOf();
    console.log("Demand To", this.objCondimentDemand.ToDate);

    console.log("Demand From", this.objCondimentDemand.FromDate);

    var dt1 = new Date(this.objCondimentDemand.FromDate);
    var dt2 = new Date(this.objCondimentDemand.ToDate);
    var daysCount = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate() + 1) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    console.log("daycount", daysCount);

    if (daysCount) {
      this.totalDay = daysCount;
    }
    else {
      this.totalDay = 1;
    }

    this.objCondimentDemand.TotalDays = this.totalDay;


    this.lstCondimentDemandDetail.forEach(c => {
      c.itemCheck = false;
      c.Total = 0;
    })

  }


  calculateTotalDays() {

  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }


  demandDetail(vmCondimentDemand) {
    this.lstCondimentDemandDetail = vmCondimentDemand.lstCondimentDemandDetail;

    this.lstCondimentDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })

    $('#unitDemandModal').modal("show");
  }
  demandDetailPrint(vmCondimentDemand) {

    this.objVMUnitDemand = vmCondimentDemand;
    this.lstCondimentDemandDetail = vmCondimentDemand.lstCondimentDemandDetail;

    this.lstCondimentDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })

    $('#adminApprovalModalPrint').modal("show");
  }

  getFilteredCondementDemand() {
    this.showApproveButton = false;
    this.condimentDemandService.getFilteredCondimentDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        console.log("demandList", this.lstVMUnitDemand);
        if (this.objQueryObject.SupplyPlaceID > 0) {
          this.lstVMUnitDemand = this.lstVMUnitDemand.filter(d => d.CondimentDemand.SupplyPlaceID == this.objQueryObject.SupplyPlaceID);
        }

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.CondimentDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.CondimentDemand.Status)[0];
          if (unit) {
            v.CondimentDemand.UnitName = unit.Unit.UnitName;
            v.CondimentDemand.StatusName = rStatus.name;
          }

          var supplyPalce = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == v.CondimentDemand.SupplyPlaceID)[0];

          if (supplyPalce) {
            v.CondimentDemand.SupplyPlaceName = supplyPalce.SupplyPlaceName;
          }

          //for uni approver
          if (v.CondimentDemand.Status == DemandStatus[0].id
            && (this.userLevel >= SMS_USER_LEVEL[1].id && this.userLevel < SMS_USER_LEVEL[5].id)) {
            v.CondimentDemand.showApproval = true;
            // console.log("unit admin");
          }
          else if (v.CondimentDemand.Status == DemandStatus[1].id && this.userLevel == SMS_USER_LEVEL[5].id) {
            v.CondimentDemand.showApproval = true;
            //  console.log("SSD admin");
          }
          else if (v.CondimentDemand.Status == DemandStatus[2].id && this.userLevel == SMS_USER_LEVEL[6].id) {
            v.CondimentDemand.showApproval = true;
            //    console.log("OC SSD");
          }
          else {
            v.CondimentDemand.showApproval = false;
          }
        })
      }
    });
  }

  saveUnitcondimentDemand() {
    this.objVMCondimentDemand.CondimentDemand = this.objCondimentDemand;
    this.objVMCondimentDemand.lstCondimentDemandDetail = this.lstCondimentDemandDetail.filter(i => i.itemCheck);

    if (this.objVMCondimentDemand.lstCondimentDemandDetail.length > 0) {
      this.condimentDemandService.saveCondimentDemand(this.objVMCondimentDemand).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
          this.objCondimentDemand = new CondimentDemand();
          this.objCondimentDemandDetail = new CondimentDemandDetail();
          this.lstCondimentDemandDetail = [];
          this.objVMCondimentDemand = new VMCondimentDemand();
          this.totalDemand = 0;
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
        }
      });
    }
    else {
      this.messageHelper.showMessage(ResponseStatus.fail, "Please check item for demand");
    }
  }

  approveCondimentDemand() {
    if (confirm("Do you want to approve this demand?")) {
      this.objVMCondimentDemand.CondimentDemand = this.objCondimentDemand;
      this.objVMCondimentDemand.lstCondimentDemandDetail = this.lstCondimentDemandDetail;
      this.condimentDemandService.approveCondimentDemand(this.objVMCondimentDemand).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
          $('#adminApprovalModal').modal("hide");
          this.getFilteredCondementDemand();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
        }
      });
    }
  }


  approveDemand(vmDemand) {

    if (this.userLevel < SMS_USER_LEVEL[5].id) {
      if (confirm("Do you want to approve this demand?")) {
        this.condimentDemandService.approveCondimentDemand(vmDemand).subscribe((response) => {
          if (response.StatusCode == ResponseStatus.success) {
            this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
            this.getFilteredCondementDemand();
          } else {
            this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
          }
        });
      }
    }
    else {
      this.objCondimentDemand = vmDemand.CondimentDemand;

      this.lstCondimentDemandDetail = vmDemand.lstCondimentDemandDetail;
      this.lstCondimentDemandDetail.forEach(c => {
        var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
        if (item != null) {
          c.ItemName = item.ItemName;
        }
      })
      $('#adminApprovalModal').modal("show");
    }
  }

}
