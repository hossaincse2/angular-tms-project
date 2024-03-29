import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { ResponseStatus, DemandStatus } from '../../common/QSEnums';
import { UnitService } from '../../services/unitService';
import { CondimentDemandService } from '../../services/condimentDemandService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { VMUnit } from '../../models/smModels/vmUnit';
import { VMCondimentDemand } from '../../models/smModels/vmCondimentDemand';
import { CondimentDemandDetail } from '../../models/smModels/condimentDemandDetail';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { Users } from '../../models/user';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
import { SupplyPlace } from '../../models/smModels/supplyPlace';

declare var $: any;

@Component({
  selector: 'app-condiment-ds',
  templateUrl: './condiment-ds.component.html',
  styleUrls: ['./condiment-ds.component.css'],
  providers: [CondimentDemandService, UnitService, ItemService,
    SupplyPlaceService]
})
export class CondimentDsComponent implements OnInit {

  lstItem: Item[] = new Array<Item>();
  public objVMUnitDemand: VMCondimentDemand = new VMCondimentDemand();
  public lstVMUnitDemand: VMCondimentDemand[] = new Array<VMCondimentDemand>();
  public lstCondimentDemandDetail: CondimentDemandDetail[] = new Array<CondimentDemandDetail>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objQueryObject: QueryObject = new QueryObject();
  public objUser: Users = new Users();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();
  constructor(private unitDemandService: CondimentDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService, private ItemService: ItemService,
    private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstVMUnit = [];
    this.getAllUnit();
    this.getAllItem();
    this.generateBarcode('5454');
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
      $("#dryItemPrintpdf").print({
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
      this.generateBarcode(this.objDryItemDemand.AutogeneratedNumber);
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
        showHRI: true,
        posX: '0',
        posY: '0',
        addQuietZone: '1'
      };

      $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    });
  }

  distributeCondimentItemDemandPrint(vmDemand) {
    var supplyPalce = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == vmDemand.CondimentDemand.SupplyPlaceID)[0];

    if (supplyPalce) {
      vmDemand.CondimentDemand.SupplyPlaceName = supplyPalce.SupplyPlaceName;
    }

    $('#CondimentItemDemandModalPrint').modal("show");
  }


  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }

  getAllUnitDemandByFilter() {
    this.unitDemandService.getFilteredCondimentDemandFroDistribution(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        this.lstVMUnitDemand = response.ResponseObj;

        this.lstVMUnitDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.CondimentDemand.FromUnitID)[0];
          var rStatus = DemandStatus.filter(d => d.id == demad.CondimentDemand.Status)[0];
          if (unit) {
            demad.CondimentDemand.UnitName = unit.Unit.UnitName;
            demad.CondimentDemand.StatusName = rStatus.name;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
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

  distributeDemand(vmDemand) {
    this.objVMUnitDemand.CondimentDemand = vmDemand.CondimentDemand;
    this.lstCondimentDemandDetail = vmDemand.lstCondimentDemandDetail;
    this.lstCondimentDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    $('#unitDemandModal').modal("show");
  }

  demandDetail(vmDemand) {
    this.lstCondimentDemandDetail = vmDemand.lstCondimentDemandDetail;
    this.lstCondimentDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    $('#unitDemandDetailModal').modal("show");
  }


  saveDistribution() {

    this.objVMUnitDemand.lstCondimentDemandDetail = this.lstCondimentDemandDetail;
    this.unitDemandService.saveCondimentDistribution(this.objVMUnitDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        $('#unitDemandModal').modal("hide");
        this.getAllUnitDemandByFilter();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


}
