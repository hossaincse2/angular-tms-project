import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { DryItemDemandService } from '../../services/DryItemDemandService';
import { ResponseStatus, DemandStatus, GatePassStatus } from '../../common/QSEnums';
import { VMDryItemDemand } from '../../models/smModels/vmDryItemDemand';
import { VMUnit } from '../../models/smModels/vmUnit';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitService } from '../../services/unitService';
import { VMGatePass } from '../../models/smModels/vmGatePass';
import { GatePassService } from '../../services/gatePassService';
import { DryItemDemandDetail } from '../../models/smModels/dryItemDemandDetail';
import { PackingMaterial } from '../../models/smModels/packingMaterial';
import { PackingMaterialService } from '../../services/packingMaterialService';
import { GatePassDetail } from '../../models/smModels/gatePassDetail';
import { GatePassItemDetail } from '../../models/smModels/gatePassItemDetail';
import { GatePass } from '../../models/smModels/gatePass';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { LocalStorageService } from 'angular-web-storage';
import { Users } from '../../models/user';
import { UserService } from '../../services/userService';
declare var $: any;

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css'],
  providers: [DryItemDemandService, UnitService, GatePassService,
    PackingMaterialService, ItemService, UserService]
})
export class GatePassComponent implements OnInit {

  public lstPackingMaterial: PackingMaterial[] = new Array<PackingMaterial>();
  public objVMGatePass: VMGatePass = new VMGatePass();
  public objQueryObject: QueryObject = new QueryObject();
  public lstVMDryItemDemand: VMDryItemDemand[] = new Array<VMDryItemDemand>();
  public lstSelectedVMDryItemDemand: VMDryItemDemand[] = new Array<VMDryItemDemand>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();
  public objGatePassDetail: GatePassDetail = new GatePassDetail();
  public lstGatePassDetail: GatePassDetail[] = new Array<GatePassDetail>();
  public lstGatePassItemDetail: GatePassItemDetail[] = new Array<GatePassItemDetail>();
  public objGatePassItemDetail: GatePassItemDetail = new GatePassItemDetail();
  public objGatePass: GatePass = new GatePass();
  public lstVMGatePass: VMGatePass[] = new Array<VMGatePass>();
  public lstItem: Item[] = new Array<Item>();
  public userID: string;
  public objUser: Users = new Users();

  constructor(private dryItemDemandService: DryItemDemandService, private messageHelper: MessageHelper,
    private unitService: UnitService, private gatePassService: GatePassService,
    private packingMaterialService: PackingMaterialService, private itemService: ItemService,
    private localStorageService: LocalStorageService, public userService: UserService) { }

  ngOnInit() {
    this.objQueryObject.ToDate = new Date();
    this.objQueryObject.FromDate = new Date();
    this.getAllUnit();
    this.getAllPackingMaterial();
    this.lstSelectedVMDryItemDemand = [];
    this.generatePrint();
   
    this.userID = this.localStorageService.get("userID")
    this.getUserByID();
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
      $("#GetPassModalPrint").print({
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
      this.generateBarcode(this.objGatePass.GatePassNumber);
    });
  }

  LoadGatepassPrintInitialData() {
    console.log("unit list", this.lstVMUnit);
    if (this.lstVMUnit.length == 0) {
      this.getAllUnit();
    }
    this.getAllItem();

  }


  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }

  getAllUnit() {
    this.unitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        this.getAllDemandForGatePass();
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

  getAllGatePass() {
    this.gatePassService.getFilteredGatePass(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMGatePass = response.ResponseObj;
        this.lstVMGatePass.forEach(gate => {
          var unit = this.lstVMUnit.filter(v => v.Unit.UnitID == gate.GatePass.UnitID)[0];
          if (unit) {
            gate.GatePass.UnitName = unit.Unit.UnitName;
          }
        })
      }
    });
  }

  printGatePassSlip(vmGatePass) {
    this.objGatePass = vmGatePass.GatePass;
    this.lstGatePassItemDetail = vmGatePass.lstGatePassItemDetail;
    console.log("list", this.lstGatePassItemDetail);
    console.log("Gate pass Number", this.objGatePass.GatePassNumber);
    this.generateBarcode(this.objGatePass.GatePassNumber);
    this.lstGatePassItemDetail.forEach(itemDetail => {
      var item = this.lstItem.filter(i => i.ItemID == itemDetail.ItemID)[0];
      if (item) {
        itemDetail.ItemName = item.ItemName;
      }
      var packingM = this.lstPackingMaterial.filter(p => p.PackingMaterialID == itemDetail.PackingMaterialID)[0];
      if (packingM) {
        itemDetail.PackingMaterialName = packingM.MaterialName;
      }
    })
    $('#GetPassModalPrintView').modal("show");
  }


  getAllPackingMaterial() {
    this.packingMaterialService.getAllPackingMaterial().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstPackingMaterial = response.ResponseObj;
      }
    });
  }


  selectDemand() {
    this.lstSelectedVMDryItemDemand = [];
    this.lstVMDryItemDemand.forEach(vmDemand => {

      if (vmDemand.DryItemDemand.ItemCheck) {
        console.log("check one");
        this.lstSelectedVMDryItemDemand.push(vmDemand);
      }

    })

    console.log("checkList", this.lstSelectedVMDryItemDemand);
  }

  distributeDetail(vmDryItemDemand) {
    this.lstDryItemDemandDetail = vmDryItemDemand.lstDryItemDemandDetail;

    this.lstDryItemDemandDetail.forEach(detail => {
      var packingM = this.lstPackingMaterial.filter(p => p.PackingMaterialID == detail.PackingMaterial)[0];
      if (packingM) {
        detail.PackingMaterialName = packingM.MaterialName;
      }
    })

    $('#DryItemDemandModal').modal("show");
  }




  getAllDemandForGatePass() {

    this.dryItemDemandService.getFilteredDryItemDemandFroGatePass(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMDryItemDemand = response.ResponseObj;

        this.lstVMDryItemDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.DryItemDemand.FromUnitID)[0];

          var rStatus = GatePassStatus.filter(d => d.id == demad.DryItemDemand.Status)[0];
          if (unit) {
            demad.DryItemDemand.UnitName = unit.Unit.UnitName;
            demad.DryItemDemand.StatusName = rStatus.name;
          }
        })
      } else {
        this.lstVMDryItemDemand = [];
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
      }
    });
  }


  CreateGatePass() {

    if (this.lstVMDryItemDemand.length > 0) {
      this.lstVMDryItemDemand.forEach(vmDryDemand => {
        this.objGatePassDetail.UnitDemandID = vmDryDemand.DryItemDemand.DryItemDemandID;


        vmDryDemand.lstDryItemDemandDetail.forEach(detail => {
          var gatePassItemDetail = this.lstGatePassItemDetail.filter(i => i.ItemID == detail.ItemID && i.PackingMaterialID == detail.PackingMaterial)[0];
          console.log("ItemID", detail.ItemID, "PM", detail.PackingMaterial);

          if (gatePassItemDetail) {
            this.lstGatePassItemDetail.filter(i => i.ItemID == detail.ItemID)[0].Quantity += detail.ApprovedQty;
          }
          else {
            this.objGatePassItemDetail = new GatePassItemDetail();
            this.objGatePassItemDetail.UnitDemandID = vmDryDemand.DryItemDemand.DryItemDemandID;
            this.objGatePassItemDetail.ItemID = detail.ItemID;
            this.objGatePassItemDetail.ItemName = detail.ItemName;
            this.objGatePassItemDetail.Quantity = detail.ApprovedQty;
            this.objGatePassItemDetail.PackingMaterialID = detail.PackingMaterial;
            this.objGatePassItemDetail.NumberOfPackingMaterial = detail.NumberOfPackingMaterial;
            var packingM = this.lstPackingMaterial.filter(p => p.PackingMaterialID == detail.PackingMaterial)[0];
            if (packingM) {
              this.objGatePassItemDetail.PackingMaterialName = packingM.MaterialName;
            }
            this.lstGatePassItemDetail.push(this.objGatePassItemDetail);
          }
        })
        this.lstGatePassDetail.push(this.objGatePassDetail);

      })
      this.lstGatePassItemDetail.sort((n1) => n1.ItemID);

      $('#GatePassModal').modal("show");
    }
    else {
      this.messageHelper.showMessage(ResponseStatus.fail, "No available item found");
    }

  }





  saveGatePass() {

    if (this.lstGatePassItemDetail.length > 0) {

      this.objVMGatePass.GatePass = new GatePass();
      this.objVMGatePass.GatePass.UnitID = this.objQueryObject.UnitID;
      this.objVMGatePass.lstGatePassDetail = this.lstGatePassDetail;
      this.objVMGatePass.lstGatePassItemDetail = this.lstGatePassItemDetail;
      this.gatePassService.saveGatePass(this.objVMGatePass).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Gate pass created successfull");
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to generat gate pass");
        }
      });
    } else {
      this.messageHelper.showMessage(ResponseStatus.fail, "No item found for create gate pass");
    }
  }


}
