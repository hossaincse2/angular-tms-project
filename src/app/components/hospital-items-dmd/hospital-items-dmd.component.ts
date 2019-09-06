import { Component, OnInit } from '@angular/core';
import { HospitalItemDemand } from '../../models/smModels/hospitalItemDemand';
import { HospitalItemDemandDetail } from '../../models/smModels/hospitalItemDemandDetail';
import { VMUnit } from '../../models/smModels/vmUnit';
import { Item } from '../../models/smModels/item';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemService } from '../../services/itemService';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, DemandItemType, DemandStatus, UnitOfMeasure, SMS_USER_LEVEL } from '../../common/QSEnums';
import { VMHospitalDemand } from '../../models/smModels/vmHospitalDemand';
import { HospitalDemandService } from '../../services/hospitalDemandService';
import { QueryObject } from '../../models/queryObject';
import { LocalStorageService } from 'angular-web-storage';
import { HospitalScaleDetail } from '../../models/smModels/hospitalScaleDetail';
import { HospitalItemDemandDiteDetail } from '../../models/smModels/hospitalItemDetamDiteDetail';
import { HospitalItemScaleService } from '../../services/hospitalItemScaleService';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
declare var $: any;
@Component({
  selector: 'app-hospital-items-dmd',
  templateUrl: './hospital-items-dmd.component.html',
  styleUrls: ['./hospital-items-dmd.component.css'],
  providers: [ItemService, UnitService, HospitalDemandService,
    HospitalItemScaleService, SupplyPlaceService]
})
export class HospitalItemsDmdComponent implements OnInit {
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  lstFreshItem: Item[] = new Array<Item>();
  lstItem: Item[] = new Array<Item>();
  totalDemand: number = 0;
  public objVMHospitalItem: VMHospitalDemand = new VMHospitalDemand();
  public lstVMUnitDemand: VMHospitalDemand[] = new Array<VMHospitalDemand>();
  public objHospitalItemDemand: HospitalItemDemand = new HospitalItemDemand();
  public objHospitalItemDemandDetail: HospitalItemDemandDetail = new HospitalItemDemandDetail();
  objQueryObject: QueryObject = new QueryObject();
  public lstHospitalItemDemandDetail: HospitalItemDemandDetail[] = new Array<HospitalItemDemandDetail>();
  public objItem: Item = new Item();
  public objHospitalScaleDetail: HospitalScaleDetail = new HospitalScaleDetail();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();

  public lstHospitalScaleDetail: HospitalScaleDetail[] = new Array<HospitalScaleDetail>();

  public objHospitalItemDemandDiteDetail: HospitalItemDemandDiteDetail = new HospitalItemDemandDiteDetail();

  public lstUnitOfMeasure: any[];
  showEntry: boolean = false;
  public userLevel: number = 0;
  public totalResource = 0;
  public totalDays: number = 1;
  public netResource = 0;
  constructor(private messageHelper: MessageHelper, private ItemService: ItemService
    , private UnitService: UnitService, private hospitalDemandService: HospitalDemandService,
    private localStorageService: LocalStorageService, private hospitalScaleService: HospitalItemScaleService, private supplyPlaceService: SupplyPlaceService) { }


  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.getAllHospitalItemScale();
    this.getAllSupplyPlace();

    this.lstUnitOfMeasure = UnitOfMeasure
    this.userLevel = this.localStorageService.get("userLevel");

    this.objHospitalItemDemandDiteDetail.HighCalorie = 0;
    this.objHospitalItemDemandDiteDetail.Standard = 0;
    this.objHospitalItemDemandDiteDetail.Children = 0;
    this.objHospitalItemDemandDiteDetail.Carbohydrate = 0;
    this.objHospitalItemDemandDiteDetail.Infant = 0;
    this.objHospitalItemDemandDiteDetail.Soft = 0;
    this.objHospitalItemDemandDiteDetail.FatRestricted = 0;
    this.objHospitalItemDemandDiteDetail.ProteinRestricted = 0;
    this.objHospitalItemDemandDiteDetail.Liquid = 0;
  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }
  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
      }
    });
  }

  getAllHospitalItemScale() {
    this.hospitalScaleService.getAllHospitalItemScale().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstHospitalScaleDetail = response.ResponseObj;

        console.log("Scale Detail", this.lstHospitalScaleDetail);
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

  calculateTotal() {
    // this.objHospitalItemDemand.NumberOfPeople = this.totalResource;

    this.lstHospitalItemDemandDetail.forEach(demandDetail => {

      demandDetail.PradikarNo = 0;
      demandDetail.Stock = 0;
      demandDetail.Quantity = 0;
    })

    this.lstHospitalItemDemandDetail.forEach(demandDetail => {

      if (demandDetail.itemCheck) {

        //console.log("Detail", this.objHospitalItemDemandDiteDetail);

        var hospitalScaleDetail = this.lstHospitalScaleDetail.filter(s => s.ItemID == demandDetail.ItemID)[0];

        // console.log("Scale", this.lstHospitalScaleDetail);
        if (hospitalScaleDetail) {
          demandDetail.PradikarNo = 0;
          demandDetail.Total = 0;

          console.log("number of People", this.objHospitalItemDemand.NumberOfPeople);

          if (this.objHospitalItemDemand.NumberOfPeople > 0) {
            if (hospitalScaleDetail.HighCalorie > 0) {
              console.log("People", this.objHospitalItemDemandDiteDetail.HighCalorie);
              console.log("scale", hospitalScaleDetail.HighCalorie);
              demandDetail.PradikarNo += (hospitalScaleDetail.HighCalorie * this.objHospitalItemDemandDiteDetail.HighCalorie * this.totalDays);

            }
            if (hospitalScaleDetail.Standard > 0) {
              console.log("People", this.objHospitalItemDemandDiteDetail.HighCalorie);
              console.log("scale", hospitalScaleDetail.Standard);

              demandDetail.PradikarNo += (hospitalScaleDetail.Standard * this.objHospitalItemDemandDiteDetail.Standard * this.totalDays);
            }
            if (hospitalScaleDetail.Children > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.Children * this.objHospitalItemDemandDiteDetail.Children * this.totalDays);
              // demandDetail.Total += demandDetail.Quantity;
            }
            if (hospitalScaleDetail.Carbohydrate > 0) {
              // demandDetail.PradikarNo += (hospitalScaleDetail.Carbohydrate * this.objHospitalItemDemandDiteDetail.Carbohydrate);
              // demandDetail.Total += demandDetail.Quantity;
            }
            if (hospitalScaleDetail.Infant > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.Infant * this.objHospitalItemDemandDiteDetail.Infant * this.totalDays);
              // demandDetail.Total += demandDetail.Quantity;
            }
            if (hospitalScaleDetail.Soft > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.Soft * this.objHospitalItemDemandDiteDetail.Soft * this.totalDays);
              // demandDetail.Total += demandDetail.Quantity;
            }
            if (hospitalScaleDetail.FatRestricted > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.FatRestricted * this.objHospitalItemDemandDiteDetail.FatRestricted * this.totalDays);
              //demandDetail.Total += demandDetail.Quantity;
            }
            if (hospitalScaleDetail.ProteinRestricted > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.ProteinRestricted * this.objHospitalItemDemandDiteDetail.ProteinRestricted * this.totalDays);
              // demandDetail.Total += demandDetail.Quantity;
            }

            if (hospitalScaleDetail.Liquid > 0) {
              demandDetail.PradikarNo += (hospitalScaleDetail.Liquid * this.objHospitalItemDemandDiteDetail.Liquid * this.totalDays);
              //demandDetail.Total += demandDetail.Quantity;
            }
          }



        }

      }
      else {
        demandDetail.Total = 0;
      }
    })
  }

  addNew() {
    this.objItem = new Item();
    this.showEntry = true;
    this.totalDemand = 0;
    this.lstHospitalItemDemandDetail = [];
    this.objHospitalItemDemand = new HospitalItemDemand();
    this.objHospitalItemDemand.DemandDate = new Date();
    this.objHospitalItemDemand.FromDate = new Date();
    this.objHospitalItemDemand.ToDate = new Date();

    this.objHospitalItemDemand.NumberOfPeople = 0;
  }
  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }

  getFilteredHospitalDemand() {

    this.hospitalDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.HospitalItemDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.HospitalItemDemand.Status)[0];
          if (unit) {
            v.HospitalItemDemand.UnitName = unit.Unit.UnitName;
            v.HospitalItemDemand.StatusName = rStatus.name;
          }


          //for uni approver
          if (v.HospitalItemDemand.Status == DemandStatus[0].id
            && (this.userLevel >= SMS_USER_LEVEL[1].id && this.userLevel < SMS_USER_LEVEL[5].id)) {
            v.HospitalItemDemand.showApproval = true;
            // console.log("unit admin");
          }
          else if (v.HospitalItemDemand.Status == DemandStatus[1].id && this.userLevel == SMS_USER_LEVEL[5].id) {
            v.HospitalItemDemand.showApproval = true;
            //  console.log("SSD admin");
          }
          else if (v.HospitalItemDemand.Status == DemandStatus[2].id && this.userLevel == SMS_USER_LEVEL[6].id) {
            v.HospitalItemDemand.showApproval = true;
            //    console.log("OC SSD");
          }
          else {
            v.HospitalItemDemand.showApproval = false;
          }
        })
      }
    });
  }

  editDemand(vmhospitalDemand) {

    this.totalDemand = 0;
    this.objHospitalItemDemand = vmhospitalDemand.HospitalItemDemand;
    this.lstHospitalItemDemandDetail = vmhospitalDemand.lstHospitalItemDemandDetail;
    this.lstHospitalItemDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[5].id);

    this.lstFreshItem.forEach(item => {
      var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];
      this.objHospitalItemDemandDetail = vmhospitalDemand.lstHospitalItemDemandDetail.filter(c => c.ItemID == item.ItemID)[0];

      if (this.objHospitalItemDemandDetail) {
        this.objHospitalItemDemandDetail.ItemName = item.ItemName;
        this.objHospitalItemDemandDetail.itemCheck = true;
        this.totalDemand += this.objHospitalItemDemandDetail.Total;
        this.lstHospitalItemDemandDetail.push(this.objHospitalItemDemandDetail);
      }
      else {
        var newObjHospitalItemDemandDetail = new HospitalItemDemandDetail();
        newObjHospitalItemDemandDetail.ItemID = item.ItemID;
        newObjHospitalItemDemandDetail.ItemName = item.ItemName;
        newObjHospitalItemDemandDetail.Quantity = item.FreeScale;
        newObjHospitalItemDemandDetail.itemCheck = false;
        newObjHospitalItemDemandDetail.Total = 0;
        this.lstHospitalItemDemandDetail.push(newObjHospitalItemDemandDetail);
      }
    })
    this.showEntry = true;
  }

  demandDetail(vmHospitalDemand) {
    this.lstHospitalItemDemandDetail = vmHospitalDemand.lstHospitalItemDemandDetail;

    this.lstHospitalItemDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    $('#unitDemandModal').modal("show");
  }
  deleteDemand(vmHospitalDemand) {

  }

  public loadItem() {
    this.lstHospitalItemDemandDetail = [];
    this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[5].id);
    this.lstFreshItem.forEach(item => {
      this.objHospitalItemDemandDetail = new HospitalItemDemandDetail();
      this.objHospitalItemDemandDetail.itemCheck = false;
      this.objHospitalItemDemandDetail.ItemID = item.ItemID;
      this.objHospitalItemDemandDetail.ItemName = item.ItemName;
      //this.objHospitalItemDemandDetail.Quantity = item.FreeScale;
      this.lstHospitalItemDemandDetail.push(this.objHospitalItemDemandDetail);
    })
  }


  saveUnithospitalDemand() {
    if (!this.lstHospitalItemDemandDetail.filter(c => c.itemCheck)) {
      this.messageHelper.showMessage(ResponseStatus.fail, "Please check item for demand");
    }
    this.objVMHospitalItem.HospitalItemDemand = this.objHospitalItemDemand;
    this.objVMHospitalItem.lstHospitalItemDemandDetail = this.lstHospitalItemDemandDetail.filter(c => c.itemCheck);;
    this.hospitalDemandService.saveUnitDemand(this.objVMHospitalItem).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objHospitalItemDemand = new HospitalItemDemand();
        this.objHospitalItemDemandDetail = new HospitalItemDemandDetail();

        this.lstHospitalItemDemandDetail = [];
        this.objVMHospitalItem = new VMHospitalDemand();
        this.totalResource = 0;
        this.objHospitalItemDemandDiteDetail.HighCalorie = 0;
        this.objHospitalItemDemandDiteDetail.Standard = 0;
        this.objHospitalItemDemandDiteDetail.Children = 0;
        this.objHospitalItemDemandDiteDetail.Carbohydrate = 0;
        this.objHospitalItemDemandDiteDetail.Infant = 0;
        this.objHospitalItemDemandDiteDetail.Soft = 0;
        this.objHospitalItemDemandDiteDetail.FatRestricted = 0;
        this.objHospitalItemDemandDiteDetail.ProteinRestricted = 0;
        this.objHospitalItemDemandDiteDetail.Liquid = 0;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  approveCondimentDemand() {
    if (confirm("Do you want to approve this demand?")) {
      this.objVMHospitalItem.HospitalItemDemand = this.objHospitalItemDemand;
      this.objVMHospitalItem.lstHospitalItemDemandDetail = this.lstHospitalItemDemandDetail;
      this.hospitalDemandService.approveHospitalDemand(this.objHospitalItemDemand).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
          $('#adminApprovalModal').modal("hide");
          this.getFilteredHospitalDemand();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
        }
      });
    }
  }


  approveDemand(vmDemand) {

    if (this.userLevel < SMS_USER_LEVEL[5].id) {
      if (confirm("Do you want to approve this demand?")) {
        this.hospitalDemandService.approveHospitalDemand(vmDemand).subscribe((response) => {
          if (response.StatusCode == ResponseStatus.success) {
            this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
            this.getFilteredHospitalDemand();
          } else {
            this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
          }
        });
      }
    }
    else {
      this.objHospitalItemDemand = vmDemand.HospitalItemDemand;

      this.lstHospitalItemDemandDetail = vmDemand.lstHospitalItemDemandDetail;
      this.lstHospitalItemDemandDetail.forEach(c => {
        var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
        if (item != null) {
          c.ItemName = item.ItemName;
        }
      })
      $('#adminApprovalModal').modal("show");
    }
  }



  onResourceChange() {
    this.totalResource = 0;
    this.totalResource += this.objHospitalItemDemandDiteDetail.HighCalorie;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Standard;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Children;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Carbohydrate;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Infant;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Soft;
    this.totalResource += this.objHospitalItemDemandDiteDetail.FatRestricted;
    this.totalResource += this.objHospitalItemDemandDiteDetail.ProteinRestricted;
    this.totalResource += this.objHospitalItemDemandDiteDetail.Liquid;

    var dt1 = new Date(this.objHospitalItemDemand.FromDate);
    var dt2 = new Date(this.objHospitalItemDemand.ToDate);
    var daysCount = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate() + 1) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));

    this.totalDays = daysCount;
    this.objHospitalItemDemand.NumberOfPeople = this.totalResource * daysCount;

    // if (daysCount > 1)
    //   this.totalResource = this.totalResource * daysCount;
  }

}
