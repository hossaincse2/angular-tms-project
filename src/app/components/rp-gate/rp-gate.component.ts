import { Component, OnInit } from '@angular/core';
import { DryItemDemandDetail } from '../../models/smModels/dryItemDemandDetail';
import { DryItemDemandFamilyDetail } from '../../models/smModels/dryItemDemandFamilyDetail';
import { Users } from '../../models/user';
import { VMCondimentDemand } from '../../models/smModels/vmCondimentDemand';
import { DemandItemType, ResponseStatus, GatePassStatus } from '../../common/QSEnums';
import { HospitalItemDemandDetail } from '../../models/smModels/hospitalItemDemandDetail';
import { FreshDemandDetail } from '../../models/smModels/freshDemandDetail';
import { FreshDemand } from '../../models/smModels/freshDemand';
import { ButcheryDemandDetail } from '../../models/smModels/ButcheryDemandDetail';
import { CondimentDemandDetail } from '../../models/smModels/condimentDemandDetail';
import { Item } from '../../models/smModels/item';
import { GatePassService } from '../../services/gatePassService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { VMGatePass } from '../../models/smModels/vmGatePass';
import { GatePass } from '../../models/smModels/gatePass';
import { GatePassItemDetail } from '../../models/smModels/gatePassItemDetail';
import { PackingMaterial } from '../../models/smModels/packingMaterial';
import { PackingMaterialService } from '../../services/packingMaterialService';
import { ItemService } from '../../services/itemService';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';


declare var $: any;
@Component({
  selector: 'app-rp-gate',
  templateUrl: './rp-gate.component.html',
  styleUrls: ['./rp-gate.component.css'],
  providers: [GatePassService, PackingMaterialService, ItemService,
    UnitService]
})
export class RpGateComponent implements OnInit {
  public objUser: Users = new Users();
  public objVMUnitDemand: VMCondimentDemand = new VMCondimentDemand();
  public lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();
  public lstDryItemDemandFamilyDetail: DryItemDemandFamilyDetail[] = new Array<DryItemDemandFamilyDetail>();
  public objHospitalItemDemandDetail: HospitalItemDemandDetail[] = new Array<HospitalItemDemandDetail>();
  public lstFreshDemandDetail: FreshDemandDetail[] = new Array<FreshDemandDetail>();
  public objFreshDemand: FreshDemand = new FreshDemand();
  lstDemandDetail: ButcheryDemandDetail[] = new Array<ButcheryDemandDetail>();
  public lstGatePassItemDetail: GatePassItemDetail[] = new Array<GatePassItemDetail>();
  public lstHospitalItemDemandDetail: HospitalItemDemandDetail[] = new Array<HospitalItemDemandDetail>();
  public lstCondimentDemandDetail: CondimentDemandDetail[] = new Array<CondimentDemandDetail>();
  public bellow3ChildTotal: number;
  public totalDay: number;
  public totalResource: number;
  public netResource: number;
  public netChildTotal: number;
  public showEntry: boolean = false;
  demandType: number;
  lstItem: Item[] = new Array<Item>();
  objVMGatePass: VMGatePass = new VMGatePass();
  public objGatePass: GatePass = new GatePass();
  public gatePassNumber: number;
  public lstPackingMaterial: PackingMaterial[] = new Array<PackingMaterial>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();

  constructor(private gatePassService: GatePassService, private messageHelper: MessageHelper,
    private packingMaterialService: PackingMaterialService, private itemService: ItemService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.generatePrint();
    this.getAllPackingMaterial();
    this.getAllItem();
  }

  getAllUnit() {
    this.unitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
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

  getAllPackingMaterial() {
    this.packingMaterialService.getAllPackingMaterial().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstPackingMaterial = response.ResponseObj;
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

  passGate() {

    this.gatePassService.getGatePassByNumber(this.objGatePass).subscribe((response) => {
      this.objVMGatePass = response.ResponseObj;
      this.objGatePass = this.objVMGatePass.GatePass;
      this.lstGatePassItemDetail = this.objVMGatePass.lstVMGatePassItemDetail;
      this.generateBarcode(this.objGatePass.GatePassNumber);
      $('#GetPassModalPrintView').modal("show");
    });
  }

  getAllGatePass(gatePassNumber) {
    this.gatePassService.getGatePassByNumber(gatePassNumber).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMGatePass = response.ResponseObj;
        this.objGatePass = this.objVMGatePass.GatePass;

        var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == this.objGatePass.UnitID)[0];

        var rStatus = GatePassStatus.filter(d => d.id == this.objGatePass.Status)[0];
        if (unit) {
          this.objGatePass.UnitName = unit.Unit.UnitName;
          this.objGatePass.StatusName = rStatus.name;
        }

        this.lstGatePassItemDetail = this.objVMGatePass.lstVMGatePassItemDetail;
        this.generateBarcode(this.objGatePass.GatePassNumber);
        $('#GetPassModalPrintView').modal("show");
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, response.Message);
      }
    });
  }

  showReports(event: any) {
    if (event.keyCode == 13) {
      this.getAllGatePass(this.gatePassNumber);
    }
  }

}
