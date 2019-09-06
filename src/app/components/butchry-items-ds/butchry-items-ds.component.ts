import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { ButcheryDemandService } from '../../services/ButcheryDemandService';
import { UnitService } from '../../services/unitService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { VMButcheryDemand } from '../../models/smModels/vmButcheryDemand';
import { ResponseStatus, DemandStatus, DemandItemType } from '../../common/QSEnums';
import { VMUnit } from '../../models/smModels/vmUnit';
import { ButcheryDemandDetail } from '../../models/smModels/ButcheryDemandDetail';
import { LocalStorageService } from 'angular-web-storage';
import { UserService } from '../../services/userService';
import { Users } from '../../models/user';
import { ButcheryDemand } from '../../models/smModels/butcheryDemand';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { VMItemSummary } from '../../models/smModels/vmItemSummary';
declare var $: any;

@Component({
  selector: 'app-butchry-items-ds',
  templateUrl: './butchry-items-ds.component.html',
  styleUrls: ['./butchry-items-ds.component.css'],
  providers: [ButcheryDemandService, UnitService, UserService, ItemService]
})
export class ButchryItemsDsComponent implements OnInit {

  userLevel: number = 0;
  public objVMUnitDemand: VMButcheryDemand = new VMButcheryDemand();
  public lstVMUnitDemand: VMButcheryDemand[] = new Array<VMButcheryDemand>();
  public lstDemandDetail: ButcheryDemandDetail[] = new Array<ButcheryDemandDetail>();

  public lstAllDemandDetail: ButcheryDemandDetail[] = new Array<ButcheryDemandDetail>();
  public lstItemSummary: VMItemSummary[] = new Array<VMItemSummary>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objButcheryDemand: ButcheryDemand = new ButcheryDemand();
  public objQueryObject: QueryObject = new QueryObject();
  public userID: string;
  public objUser: Users = new Users();
  lstItem: Item[] = new Array<Item>();
  lstButcheryItem: Item[] = new Array<Item>();

  constructor(private unitDemandService: ButcheryDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService, private localStorageService: LocalStorageService,
    private userService: UserService, private ItemService: ItemService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllUnit();
    this.getAllItem();
    this.objVMUnitDemand = new VMButcheryDemand();
    // this.distributeDemandInvoice('sd');
    // this.generatePrint();

    this.userID = this.localStorageService.get("userID")
    this.userLevel = this.localStorageService.get("userLevel");
  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }
  getUserByID() {
    this.userService.getUserByID(this.userID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        console.log("user", this.objUser);
        this.objUser = response.ResponseObj;
      }
    });
  }

  distributeDemandInvoice(vmButcherDemand) {
    this.unitDemandService.getVMButcheryDemand(vmButcherDemand.ButcheryDemand.ButcheryDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;

        this.lstDemandDetail = this.objVMUnitDemand.lstButcheryDemandDetail.filter(d => d.ApprovedQty > 0);
        this.objButcheryDemand = this.objVMUnitDemand.ButcheryDemand;

        var unit = this.lstVMUnit.filter(v => v.Unit.UnitID == this.objButcheryDemand.FromUnitID)[0];
        if (unit) {
          this.objButcheryDemand.UnitName = unit.Unit.UnitName;
        }

        this.generateBarcode("0000" + this.objButcheryDemand.ButcheryDemandID);
        $('#Invoice').modal("show");
      }
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

  approveUnitDemand() {
    // this.unitDemandService.saveUnitDemand(this.objVMUnitDemand).subscribe((response) => {
    //   if (response.StatusCode == ResponseStatus.success) {
    //     this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
    //     this.objUnitDemand = new UnitDemand();
    //     this.objUnitDemandResourceDetail = new UnitDemandResourceDetail();

    //     this.lstUnitDemandDetail = [];
    //     this.objVMUnitDemand = new VMUnitDemand();
    //   } else {
    //     this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
    //   }
    // });

  }


  getAllUnitDemandByFilter() {
    this.unitDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.ButcheryDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == demad.ButcheryDemand.Status)[0];
          if (unit) {
            demad.ButcheryDemand.UnitName = unit.Unit.UnitName;
            demad.ButcheryDemand.StatusName = rStatus.name;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });
  }

  getUnitDemandSummary() {
    this.unitDemandService.getAllUnitDemadSummary(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemSummary = response.ResponseObj;
        $('#demandSummaryModal').modal("show");
      }
    });
  }

  getAllUnitDemand() {
    this.unitDemandService.getAllUnitDemand().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.ButcheryDemand.FromUnitID)[0];
          if (unit) {
            demad.ButcheryDemand.UnitName = unit.Unit.UnitName;
          }
        })
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

  demandDetail(butcheryDemandID) {
    this.unitDemandService.getVMButcheryDemand(butcheryDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;
        this.lstDemandDetail = [];
        this.lstDemandDetail = this.objVMUnitDemand.lstButcheryDemandDetail.filter(d => d.Total > 0 || d.ApprovedQty > 0);
        $('#unitDemandModal').modal("show");
      }
    });
  }

  distributeDemand(vmButcheryDemand) {

    this.unitDemandService.getVMButcheryDemand(vmButcheryDemand.ButcheryDemand.ButcheryDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;
        this.objVMUnitDemand.ButcheryDemand = this.objVMUnitDemand.ButcheryDemand;
        this.lstDemandDetail = this.objVMUnitDemand.lstButcheryDemandDetail;
        this.lstButcheryItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[4].id && i.ShownInDistribution);//implement later.
        this.lstButcheryItem.forEach(element => {
          var item = this.lstDemandDetail.filter(b => b.ItemID == element.ItemID)[0];
          if (!item) {
            if (element.ShownInDistribution) {
              var demandDetail = new ButcheryDemandDetail();
              demandDetail.ItemID = element.ItemID;
              demandDetail.ItemName = element.ItemName;
              demandDetail.NumberOfPeople = 0;
              demandDetail.Quantity = element.FreeScale;
              demandDetail.Total = 0;
              demandDetail.showInDemand = element.ShownInDistribution;
              this.lstDemandDetail.push(demandDetail);
            }
          }
          else {
            if (element.ShownInDistribution)
              item.showInDemand = true;
          }
        });

        $('#unitDistributionModal').modal("show");

      }
    });





  }

  calculateTotalPeople() {
    this.lstDemandDetail.forEach(detail => {
      console.log("showDemand", detail.showInDemand);
      if (detail.showInDemand) {
        detail.NumberOfPeople = 0;
      }
      if (detail.ApprovedQty > 0) {
        detail.Total = detail.ApprovedQty;
      }
      if (detail.ApprovedQty > 0) {
        detail.NumberOfPeople = Math.round((detail.ApprovedQty * 1000) / detail.Quantity);

      }
    })
  }

  getFilteredButcheryDemand() {

    this.unitDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.ButcheryDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.ButcheryDemand.Status)[0];
          if (unit) {
            v.ButcheryDemand.UnitName = unit.Unit.UnitName;
            v.ButcheryDemand.StatusName = rStatus.name;
          }
        })

      }
    });
  }


  showDemandItemDetail() {
    // lstAllDemandDetail
  }




  saveButchryDemand() {
    this.objVMUnitDemand.lstButcheryDemandDetail = this.lstDemandDetail.filter(d => d.Total > 0);
    console.log("Demand Detial", this.objVMUnitDemand);

    this.unitDemandService.distributeUnitDemand(this.objVMUnitDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Distributed successfully");
        this.objVMUnitDemand = new VMButcheryDemand();
        $('#unitDistributionModal').modal("hide");
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });
  }

}
