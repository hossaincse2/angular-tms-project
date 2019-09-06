import { Component, OnInit } from '@angular/core';
import { VMUnit } from '../../models/smModels/vmUnit';
import { HygineAndChemicalDemand } from '../../models/smModels/HygineAndChemicalDemand';
import { HygineAndChemicalDemandDetail } from '../../models/smModels/HygineAndChemicalDemandDetail';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemService } from '../../services/itemService';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, DemandItemType, DemandStatus, UnitOfMeasure, SMS_USER_LEVEL } from '../../common/QSEnums';
import { Item } from '../../models/smModels/item';
import { QueryObject } from '../../models/queryObject';
import { VMHygineAndChemicalDemand } from '../../models/smModels/vmHygineAndChemicalDemand';
import { HygineAndChemicalDemandService } from '../../services/hygineAndChemicalDemandService';
import { LocalStorageService } from 'angular-web-storage';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
declare var $: any;

@Component({
  selector: 'app-hc-dmd',
  templateUrl: './hc-dmd.component.html',
  styleUrls: ['./hc-dmd.component.css'],
  providers: [ItemService, UnitService, HygineAndChemicalDemandService,SupplyPlaceService]
})
export class HcDmdComponent implements OnInit {

  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();
  lstFreshItem: Item[] = new Array<Item>();
  lstItem: Item[] = new Array<Item>();
  public lstUnitOfMeasure: any[];
  public objItem: Item = new Item();
  objQueryObject: QueryObject = new QueryObject();
  totalDemand: number = 0;
  showEntry: boolean = false;
  userLevel: number = 0;
  public objVMHygineAndChemicalDemand: VMHygineAndChemicalDemand = new VMHygineAndChemicalDemand();

  public lstVMUnitDemand: VMHygineAndChemicalDemand[] = new Array<VMHygineAndChemicalDemand>();
  public objHygineAndChemicalDemand: HygineAndChemicalDemand = new HygineAndChemicalDemand();
  public objHygineAndChemicalDemandDetail: HygineAndChemicalDemandDetail = new HygineAndChemicalDemandDetail();
  public lstHygineAndChemicalDemandDetail: HygineAndChemicalDemandDetail[] = new Array<HygineAndChemicalDemandDetail>();
  constructor(private messageHelper: MessageHelper, private ItemService: ItemService
    , private UnitService: UnitService, private localStorageService: LocalStorageService,
    private hygineAndChemicalDemandService: HygineAndChemicalDemandService, private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.getAllSupplyPlace();
    this.lstUnitOfMeasure = UnitOfMeasure;
    this.objHygineAndChemicalDemand.NumberOfPeople = 0;
    this.userLevel = this.localStorageService.get("userLevel");
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
        console.log("Unit", this.lstVMUnit);
        this.lstVMUnit = response.ResponseObj;

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });

  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }


  calculateTotal() {
    this.totalDemand=0;
    this.lstHygineAndChemicalDemandDetail.forEach(demandDetail => {
      if (demandDetail.itemCheck) {
        demandDetail.Total = (demandDetail.Quantity * this.objHygineAndChemicalDemand.NumberOfPeople) / 1000;
        this.totalDemand += demandDetail.Total;
      }
      else {
        demandDetail.Total = 0;
      }
    })
  }

  public loadItem() {
    this.lstHygineAndChemicalDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[6].id);


    this.lstFreshItem.forEach(item => {
      this.objHygineAndChemicalDemandDetail = new HygineAndChemicalDemandDetail();
      this.objHygineAndChemicalDemandDetail.ItemID = item.ItemID;
      this.objHygineAndChemicalDemandDetail.ItemName = item.ItemName;
      this.objHygineAndChemicalDemandDetail.Quantity = item.FreeScale;
      this.lstHygineAndChemicalDemandDetail.push(this.objHygineAndChemicalDemandDetail);
    })
  }


  editDemand(vmHygineAndChemicalDemand) {
    this.totalDemand = 0;
    this.objHygineAndChemicalDemand = vmHygineAndChemicalDemand.HygineAndChemicalDemand;

    this.lstHygineAndChemicalDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[6].id);

    this.lstFreshItem.forEach(item => {
      var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];

      this.objHygineAndChemicalDemandDetail = vmHygineAndChemicalDemand.lstHygineAndChemicalDemandDetail.filter(c => c.ItemID == item.ItemID)[0];

      if (this.objHygineAndChemicalDemandDetail) {
        this.objHygineAndChemicalDemandDetail.ItemName = item.ItemName;
        this.objHygineAndChemicalDemandDetail.itemCheck = true;
        this.totalDemand += this.objHygineAndChemicalDemandDetail.Total;
        this.lstHygineAndChemicalDemandDetail.push(this.objHygineAndChemicalDemandDetail);
      }
      else {
        var newObjHygineAndChemicalDemandDetail = new HygineAndChemicalDemandDetail();
        newObjHygineAndChemicalDemandDetail.ItemID = item.ItemID;
        newObjHygineAndChemicalDemandDetail.ItemName = item.ItemName;
        newObjHygineAndChemicalDemandDetail.Quantity = item.FreeScale;
        newObjHygineAndChemicalDemandDetail.itemCheck = false;
        newObjHygineAndChemicalDemandDetail.Total = 0;
        this.lstHygineAndChemicalDemandDetail.push(newObjHygineAndChemicalDemandDetail);

      }
    })



    this.showEntry = true;
  }

  addNew() {
    this.objItem = new Item();
    this.showEntry = true;
    this.totalDemand = 0;
    this.lstHygineAndChemicalDemandDetail = [];
    this.objHygineAndChemicalDemand = new HygineAndChemicalDemand();
  }

  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }


  demandDetail(vmHygineAndChemicalDemand) {
    this.lstHygineAndChemicalDemandDetail = vmHygineAndChemicalDemand.lstHygineAndChemicalDemandDetail;

    this.lstHygineAndChemicalDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })

    $('#unitDemandModal').modal("show");
  }

  getFilteredCondementDemand() {


    this.hygineAndChemicalDemandService.getFilteredHygineAndChemicalDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {


        this.lstVMUnitDemand = response.ResponseObj;


        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.HygineAndChemicalDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.HygineAndChemicalDemand.Status)[0];
          if (unit) {
            v.HygineAndChemicalDemand.UnitName = unit.Unit.UnitName;
            v.HygineAndChemicalDemand.StatusName = rStatus.name;
          }

          console.log("list", this.lstVMUnitDemand);

          //for uni approver
          if (v.HygineAndChemicalDemand.Status == DemandStatus[0].id
            && (this.userLevel >= SMS_USER_LEVEL[1].id && this.userLevel < SMS_USER_LEVEL[5].id)) {
            v.HygineAndChemicalDemand.showApproval = true;
            console.log("unit admin");
          }
          else if (v.HygineAndChemicalDemand.Status == DemandStatus[1].id && this.userLevel == SMS_USER_LEVEL[5].id) {
            v.HygineAndChemicalDemand.showApproval = true;
            console.log("SSD admin");
          }
          else if (v.HygineAndChemicalDemand.Status == DemandStatus[2].id && this.userLevel == SMS_USER_LEVEL[6].id) {
            v.HygineAndChemicalDemand.showApproval = true;
            console.log("OC SSD");
          }
          else {
            v.HygineAndChemicalDemand.showApproval = false;
          }
        })
      }
    });
  }

  saveHygineAndChemicalDemand() {
    this.objVMHygineAndChemicalDemand.HygineAndChemicalDemand = this.objHygineAndChemicalDemand;
    this.objVMHygineAndChemicalDemand.lstHygineAndChemicalDemandDetail = this.lstHygineAndChemicalDemandDetail;
    this.hygineAndChemicalDemandService.saveHygineAndChemicalDemand(this.objVMHygineAndChemicalDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objHygineAndChemicalDemand = new HygineAndChemicalDemand();
        this.objHygineAndChemicalDemandDetail = new HygineAndChemicalDemandDetail();
        this.lstHygineAndChemicalDemandDetail = [];
        this.objVMHygineAndChemicalDemand = new VMHygineAndChemicalDemand();
        this.totalDemand = 0;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  approveCondimentDemand() {
    if (confirm("Do you want to approve this demand?")) {
      this.objVMHygineAndChemicalDemand.HygineAndChemicalDemand = this.objHygineAndChemicalDemand;
      this.objVMHygineAndChemicalDemand.lstHygineAndChemicalDemandDetail = this.lstHygineAndChemicalDemandDetail;
      this.hygineAndChemicalDemandService.approveHygineAndChemicalDemand(this.objVMHygineAndChemicalDemand).subscribe((response) => {
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
        this.hygineAndChemicalDemandService.approveHygineAndChemicalDemand(vmDemand).subscribe((response) => {
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
      this.objHygineAndChemicalDemand = vmDemand.HygineAndChemicalDemand;
      this.lstHygineAndChemicalDemandDetail = vmDemand.lstHygineAndChemicalDemandDetail;
      this.lstHygineAndChemicalDemandDetail.forEach(c => {
        var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
        if (item != null) {
          c.ItemName = item.ItemName;
        }
      })
      $('#adminApprovalModal').modal("show");
    }
  }


}
