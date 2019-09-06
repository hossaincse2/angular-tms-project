import { Component, OnInit } from '@angular/core';
import { FreshDemandDetail } from '../../models/smModels/freshDemandDetail';
import { VMFreshDemand } from '../../models/smModels/vmFreshDemand';
import { VMUnit } from '../../models/smModels/vmUnit';
import { QueryObject } from '../../models/queryObject';
import { ResponseStatus, DemandItemType, UnitOfMeasure, DemandStatus } from '../../common/QSEnums';
import { UnitService } from '../../services/unitService';
import { FreshDemandService } from '../../services/freshDemandService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { FreshDemand } from '../../models/smModels/freshDemand';
import { Item } from '../../models/smModels/item';
import { LocalStorageService } from 'angular-web-storage';
import { ItemService } from '../../services/itemService';
import { VMItemSummary } from '../../models/smModels/vmItemSummary';
declare var $: any;

@Component({
  selector: 'app-fresh-rat-ds',
  templateUrl: './fresh-rat-ds.component.html',
  styleUrls: ['./fresh-rat-ds.component.css'],
  providers: [FreshDemandService, UnitService, ItemService],
})
export class FreshRatDsComponent implements OnInit {
  public objFreshDemand: FreshDemand = new FreshDemand();
  public objFreshDemandDetail: FreshDemandDetail = new FreshDemandDetail();
  public lstFreshDemandDetail: FreshDemandDetail[] = new Array<FreshDemandDetail>();
  public lstItemSummary: VMItemSummary[] = new Array<VMItemSummary>();
  public objVMUnitDemand: VMFreshDemand = new VMFreshDemand();
  public lstVMUnitDemand: VMFreshDemand[] = new Array<VMFreshDemand>();
  //public lstDemandDetail: FreshDemandDetail[] = new Array<FreshDemandDetail>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objQueryObject: QueryObject = new QueryObject();
  lstItem: Item[] = new Array<Item>();
  userLevel: number = 0;
  lstFreshItem: Item[] = new Array<Item>();
  public lstUnitOfMeasure: any[];
  totalDemand: number = 0;

  constructor(private unitDemandService: FreshDemandService, private messageHelper: MessageHelper, private itemService: ItemService,
    private UnitService: UnitService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.userLevel = this.localStorageService.get("userLevel");
    this.lstUnitOfMeasure = UnitOfMeasure;
  }


  distributeDemandInvoice(vmDemand) {
    this.lstFreshDemandDetail = [];
    this.unitDemandService.getFilteredDemandByID(vmDemand.FreshDemand.FreshDemandID).subscribe((response) => {

      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;

        console.log("print object", this.objVMUnitDemand);

        this.objVMUnitDemand.lstFreshDemandDetail.forEach(detail => {
          if (detail.ApprovedQty > 0)
            this.lstFreshDemandDetail.push(detail);
        })


        this.objFreshDemand = this.objVMUnitDemand.FreshDemand;

        var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == this.objFreshDemand.FromUnitID)[0];
        if (unit) {
          this.objFreshDemand.UnitName = unit.Unit.UnitName;
        }

        this.generateBarcode("00000" + this.objFreshDemand.FreshDemandID.toString());

        $('#Invoice').modal("show");
      }

    })
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

  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }

  getAllUnitDemandSummary() {
    this.unitDemandService.getAllUnitDemadSummary(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemSummary = response.ResponseObj;
        $('#demandSummaryModal').modal("show");
      }
    });
  }

  getAllUnitDemandByFilter() {

    this.unitDemandService.getFilteredUnitDemand(this.objQueryObject).subscribe((response) => {

      if (response.StatusCode == ResponseStatus.success) {
        console.log("unit Demand", response.ResponseObj);
        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(v => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == v.FreshDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == v.FreshDemand.Status)[0];

          if (unit) {
            v.FreshDemand.UnitName = unit.Unit.UnitName;
            v.FreshDemand.StatusName = rStatus.name;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });

  }

  getAllUnitDemand() {
    this.unitDemandService.getAllUnitDemand().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        console.log("unit Demand", response.ResponseObj);
        this.lstVMUnitDemand = response.ResponseObj;
        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.FreshDemand.FromUnitID)[0];
          if (unit) {
            demad.FreshDemand.UnitName = unit.Unit.UnitName;
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
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to load");
      }
    });
  }

  demandDetail(freshDemandID) {
    this.unitDemandService.getVMFreshDemand(freshDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;
        this.lstFreshDemandDetail = this.objVMUnitDemand.lstFreshDemandDetail;
        $('#unitDemandModal').modal("show");

      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });
  }

  enableEntry(index) {
    if (this.lstFreshDemandDetail[index].itemCheck) {
      this.lstFreshDemandDetail[index].itemDisable = false;
    }
    else {
      this.lstFreshDemandDetail[index].itemDisable = true;
      this.lstFreshDemandDetail[index].ApprovedQty = 0;
    }
  }

  distributeDemand(vmFreshDemand) {


    this.unitDemandService.getVMFreshDemand(vmFreshDemand.FreshDemand.FreshDemandID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMUnitDemand = response.ResponseObj;
       // this.lstFreshDemandDetail = this.objVMUnitDemand.lstFreshDemandDetail;


        this.objVMUnitDemand.FreshDemand = this.objVMUnitDemand.FreshDemand;
        this.totalDemand = 0;
        this.objFreshDemand = this.objVMUnitDemand.FreshDemand;
        this.lstFreshDemandDetail = this.objVMUnitDemand.lstFreshDemandDetail;
        this.lstFreshDemandDetail = [];
        this.lstFreshItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[3].id);
        this.lstFreshItem.forEach(item => {
          var unit = this.lstUnitOfMeasure.filter(u => u.id == item.UnitOfMesure)[0];

          this.objFreshDemandDetail = this.objVMUnitDemand.lstFreshDemandDetail.filter(c => c.ItemID == item.ItemID)[0];
          if (this.objFreshDemandDetail) {
            this.objFreshDemandDetail.showInDemand = item.ShownInDistribution;
            this.objFreshDemandDetail.ItemName = item.ItemName;
            this.totalDemand += this.objFreshDemandDetail.Total;
            this.objFreshDemandDetail.itemDisable = true;
            this.lstFreshDemandDetail.push(this.objFreshDemandDetail);
          }
          else {
            var newObjFreshDemandDetail = new FreshDemandDetail();
            newObjFreshDemandDetail.showInDemand = item.ShownInDistribution;
            newObjFreshDemandDetail.ItemID = item.ItemID;
            newObjFreshDemandDetail.ItemName = item.ItemName;
            newObjFreshDemandDetail.Quantity = item.FreeScale;
            newObjFreshDemandDetail.itemCheck = false;
            newObjFreshDemandDetail.itemDisable = true;
            newObjFreshDemandDetail.Total = 0;
            this.lstFreshDemandDetail.push(newObjFreshDemandDetail);
          }
        })
        $('#unitDistributionModal').modal("show");


      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });





  }



  saveUnitfreshDemand() {
    this.objVMUnitDemand.lstFreshDemandDetail = this.lstFreshDemandDetail.filter(x => x.ApprovedQty > 0 || x.Quantity > 0);

    this.unitDemandService.distributeUnitDemand(this.objVMUnitDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Distributed successfully");
        this.objVMUnitDemand = new VMFreshDemand();
        $('#unitDemandModal').modal("hide");
        $('#unitDistributionModal').modal("hide");
        this.getAllUnitDemandByFilter();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to distribute demand");
      }
    });

  }

}
