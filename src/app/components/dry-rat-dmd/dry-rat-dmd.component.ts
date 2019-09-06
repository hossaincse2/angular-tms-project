import { Component, OnInit } from '@angular/core';
import { VMDryItemDemand } from '../../models/smModels/vmDryItemDemand';
import { DryItemDemand } from '../../models/smModels/dryItemDemand';
import { DryItemDemandDetail } from '../../models/smModels/dryItemDemandDetail';
import { DryItemDemandService } from '../../services/dryItemDemandService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ResponseStatus, DemandType, FamilyType, SSDList, DemandItemType, DemandStatus, SMS_USER_LEVEL, AdminUser } from '../../common/QSEnums';
import { UnitService } from '../../services/unitService';
import { VMUnit } from '../../models/smModels/vmUnit';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { DryItemDemandResourceDetail } from '../../models/smModels/dryItemDemandResourceDetail';
import { DryItemDemandFamilyDetail } from '../../models/smModels/dryItemDemandFamilyDetail';
import { QueryObject } from '../../models/queryObject';
import { LocalStorageService } from 'angular-web-storage';
import { PackingMaterial } from '../../models/smModels/packingMaterial';
import { PackingMaterialService } from '../../services/packingMaterialService';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import { DryDemandRportObj } from '../../models/smModels/dryDemandRportObj';
import { UserService } from '../../services/userService';
import { Users } from '../../models/user';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
import { VMItemSummary } from '../../models/smModels/vmItemSummary';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
declare var $: any;

@Component({
  selector: 'app-dry-rat-dmd',
  templateUrl: './dry-rat-dmd.component.html',
  styleUrls: ['./dry-rat-dmd.component.css'],
  providers: [DryItemDemandService, UnitService, ItemService,
    PackingMaterialService, UserService, SupplyPlaceService,
    UnitOfMeasureService]

})
export class DryRatDmdComponent implements OnInit {

  public lstItemSummary: VMItemSummary[] = new Array<VMItemSummary>();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();
  public objVMDryItemDemand: VMDryItemDemand = new VMDryItemDemand();
  public lstVMDryItemDemand: VMDryItemDemand[] = new Array<VMDryItemDemand>();
  public lstDemandType: any[];
  public lstFamilyType: any[];
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public lstSSDList: any[];
  public objDryItemDemandDetail: DryItemDemandDetail = new DryItemDemandDetail();
  public lstItem: Item[] = new Array<Item>();
  public objDryItemDemandResourceDetail: DryItemDemandResourceDetail = new DryItemDemandResourceDetail();
  public lstDryItemDemandFamilyDetail: DryItemDemandFamilyDetail[] = new Array<DryItemDemandFamilyDetail>();
  public objUser: Users = new Users()
  public objUnitFamilyDetail = new DryItemDemandFamilyDetail();
  public totalResource = 0;
  public totalResourceForSugar = 0;

  showEntry: boolean = false;
  public totalBellow3Children = 0;
  public totalBellow12Children = 0;

  public totalDay = 1;
  public netResource = 0;
  public bellow3ChildTotal = 0;
  public netChildTotal = 0;
  objQueryObject: QueryObject = new QueryObject();
  public objDryDemandRportObj: DryDemandRportObj = new DryDemandRportObj();
  public userID: string;
  userLevel: number = 0;
  public lstPackingMaterial: PackingMaterial[] = new Array<PackingMaterial>();
  public objDryItemDemand: DryItemDemand = new DryItemDemand()
  public lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();

  public numberOfOwn: number = 0;
  public numberOfWife: number = 0;
  public numberOfChild12: number = 0;



  constructor(private dryItemDemandService: DryItemDemandService, private messageHelper: MessageHelper,
    private UnitService: UnitService, private ItemService: ItemService, private userService: UserService,
    private localStorageService: LocalStorageService, private packingMaterialService: PackingMaterialService,
    private supplyPlaceService: SupplyPlaceService, private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.lstItem = [];

    this.getAllUnit();
    this.getAllPackingMaterial();
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstDemandType = DemandType;
    this.lstFamilyType = FamilyType;
    this.lstSSDList = SSDList;
    this.objDryItemDemand.ToSSDID = 1;
    this.getAllItem();
    this.getAllSupplyPlace();
    this.getAllUnitOfMeasure();

    this.objDryItemDemandResourceDetail.NumberOfJCO = 0;
    this.objDryItemDemandResourceDetail.NumberOfOR = 0;
    this.objDryItemDemandResourceDetail.NumberOfNCR = 0;
    this.objDryItemDemandResourceDetail.NumberOfCivil = 0;
    this.objDryItemDemandResourceDetail.NewAdmission = 0;
    this.userLevel = this.localStorageService.get("userLevel");
    this.userID = AdminUser.Ocssd;
    this.generatePrint();
    this.objQueryObject.SupplyPlaceID = 0;
  }

  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
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

  enableOther() {
    console.log(this.objDryItemDemand.SupplyPlace);
    if (this.objDryItemDemand.SupplyPlace == 7) {
      $('#supplyPlaceName').attr("disabled", false);
    }
    else {
      $('#supplyPlaceName').val("");
      $('#supplyPlaceName').attr("disabled", true);
    }
  }

  getAllPackingMaterial() {
    this.packingMaterialService.getAllPackingMaterial().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstPackingMaterial = response.ResponseObj;
      }
    });
  }


  calculateCurrentDemand() {
    this.lstDryItemDemandDetail.forEach(demand => {
      if (demand.PradhikarNo && demand.Stock)
        demand.CurrentDemand = Math.round(demand.PradhikarNo - demand.Stock);
    });
  }


  calculateApprovedQuantity() {
    this.lstDryItemDemandDetail.forEach(demand => {
      var material = this.lstPackingMaterial.filter(p => p.PackingMaterialID == demand.PackingMaterial)[0];

      if (material) {
        var numberOfMeterial = 1;
        if (demand.CurrentDemand > 0) {
          numberOfMeterial = Math.round(demand.CurrentDemand / material.Quantity);
        }
        demand.NumberOfPackingMaterial = numberOfMeterial;
        if (demand.NumberOfPackingMaterial) {
          demand.ApprovedQty = material.Quantity * demand.NumberOfPackingMaterial;
          demand.UnitOfMeasure = material.UnitOfMeasure;
        }
      }
      else {
        demand.ApprovedQty = 0;
      }
    })
  }

  calculateApprovedQuantityByPM() {
    this.lstDryItemDemandDetail.forEach(demand => {
      var material = this.lstPackingMaterial.filter(p => p.PackingMaterialID == demand.PackingMaterial)[0];

      if (material) {
        if (demand.NumberOfPackingMaterial) {
          demand.ApprovedQty = material.Quantity * demand.NumberOfPackingMaterial;
          demand.UnitOfMeasure = material.UnitOfMeasure;
        }
      }
      else {
        demand.ApprovedQty = 0;
      }
    })
  }

  demandDetail(vmDemand) {

    
    this.lstDryItemDemandDetail = vmDemand.lstDryItemDemandDetail;

    this.lstDryItemDemandDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      if (item != null) {
        c.ItemName = item.ItemName;
      }
      var packingM = this.lstPackingMaterial.filter(p => p.PackingMaterialID == c.PackingMaterial)[0];
      if (packingM) {
        c.PackingMaterialName = packingM.MaterialName;
      }
    })
    $('#unitDemandModal').modal("show");
  }

  onResourceChange() {
    this.totalResource = 0;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfJCO;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfOR;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfNCR;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfCivil;
    this.totalResource += this.objDryItemDemandResourceDetail.NewAdmission;
    this.netResource = (this.totalResource * this.totalDay);

    console.log("Net Resource", this.netResource);
  }


  onFamilyResourceChange() {
    this.totalResource = 0;

    this.numberOfOwn = 0;
    this.numberOfWife = 0;
    this.numberOfChild12 = 0;
    this.totalBellow12Children = 0;
    this.totalResourceForSugar = 0;

    console.log("Initial Sugar resource", this.totalResourceForSugar);
    console.log("Family detail", this.lstDryItemDemandFamilyDetail);

    this.lstDryItemDemandFamilyDetail.forEach(family => {

      this.totalResource += family.NumberOfOwn;
      this.numberOfOwn += family.NumberOfOwn;

      this.numberOfWife += family.NumberOfWife;
      this.numberOfChild12 += family.NumberOfChildrendAbove12;


      this.totalResource += family.NumberOfWife;


      this.totalResource += family.NumberOfChildrendAbove12;
      this.totalBellow12Children += family.NumberOfChildrendBellow12;


      this.totalResourceForSugar += family.NumberOfOwn;
      this.totalResourceForSugar += family.NumberOfWife;
      this.totalResourceForSugar += family.NumberOfChildrendAbove12;
      // this.totalBellow3Children += family.NumberOfChildrendBellow12;

      this.totalResourceForSugar += family.NumberOfChildrendBellow12;
      this.totalResourceForSugar += family.NumberOfChildrenBellow3;


      if (family.NumberOfChildrendBellow12) {
        this.totalResource += (family.NumberOfChildrendBellow12 / 2);
      }


    })
    console.log("Total resource", this.totalResource);
    console.log("Sugar resource", this.totalResourceForSugar);

    this.netResource = (this.totalResource * this.totalDay);

    if (this.totalDay > 0 && this.bellow3ChildTotal > 0) {
      this.netChildTotal = (this.totalResourceForSugar) * this.totalDay;
    }


  }

  onDateChange() {
    // var diff = this.objDryItemDemand.DemandTo.valueOf() - this.objDryItemDemand.DemandFrom.valueOf();
    console.log("Demand To", this.objDryItemDemand.DemandTo);

    console.log("Demand From", this.objDryItemDemand.DemandFrom);
    var dt1 = new Date(this.objDryItemDemand.DemandFrom);
    var dt2 = new Date(this.objDryItemDemand.DemandTo);
    var daysCount = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate() + 1) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    console.log("daycount", daysCount);

    if (daysCount) {
      this.totalDay = daysCount;
      this.netResource = (this.totalResource * this.totalDay);
      if (this.objDryItemDemand.DemandTypeID == DemandType[1].id) {
        this.netChildTotal = (this.bellow3ChildTotal * this.totalDay);
      }
    }
    else {
      this.totalDay = 1;
    }
  }




  calculatePradhikar(index) {

    if (this.objDryItemDemand.DemandTypeID == DemandItemType[0].id) {
      this.calculateFreeDemandNew(index);
    } else if (this.objDryItemDemand.DemandTypeID == DemandItemType[1].id) {
      this.calculateGeneralDemand(index);
    }
    else if (this.objDryItemDemand.DemandTypeID == DemandItemType[2].id) {
      this.calculateVortukiDemand(index);
    }
  }

  calculateFreeDemandNew(index) {
    if (this.netResource > 0) {
      if (this.lstDryItemDemandDetail[index].isItemCheck) {
        var item = this.lstItem.filter(i => i.ItemID == this.lstDryItemDemandDetail[index].ItemID)[0];
        if (item && !item.NewAdmission) {
          var unitOfMeasure = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == item.UnitOfMesure)[0];
          var newAdmissionPeopel = this.objDryItemDemandResourceDetail.NewAdmission * this.totalDay;
          if (unitOfMeasure != null && unitOfMeasure.ParentUnitOfMeasure > 0) {


            this.lstDryItemDemandDetail[index].PradhikarNo = ((this.netResource - newAdmissionPeopel) * item.FreeScale) / 1000;
          }
          else {
            this.lstDryItemDemandDetail[index].PradhikarNo = ((this.netResource - newAdmissionPeopel) * item.FreeScale);
          }

          // this.lstDryItemDemandDetail[index].PradhikarNo = (this.netResource * item.FreeScale) / 1000;
          $('#Stock' + index).removeAttr("disabled")
          $('#CurrentDemand' + index).removeAttr("disabled")
        }
        else {
          this.lstDryItemDemandDetail[index].PradhikarNo = (this.objDryItemDemandResourceDetail.NewAdmission * this.totalDay * item.FreeScale) / 1000;
        }
      }
      else {
        this.lstDryItemDemandDetail[index].PradhikarNo = 0;
        $('#Stock' + index).attr("disabled", true);
        $('#CurrentDemand' + index).attr("disabled", true);

      }
    }
  }

  calculateGeneralDemand(index) {

    var totalPradikar = 0;
    console.log("NetResource", this.netResource);

    if (this.netResource > 0) {

      if (this.lstDryItemDemandDetail[index].isItemCheck) {

        var item = this.lstItem.filter(i => i.ItemID == this.lstDryItemDemandDetail[index].ItemID)[0];
        if (item) {
          console.log(item);
          console.log("Total Sugar People", this.totalResourceForSugar);

          if (item.IsBellowThree) {
            totalPradikar = ((this.totalResourceForSugar * this.totalDay) * item.GeneralScale) / 1000;
            console.log(totalPradikar)
          }
          else {
            totalPradikar = (this.netResource * item.GeneralScale) / 1000;
          }

          //totalPradikar += (this.totalBellow12Children * (item.GeneralScale / 2)) / 1000;


          this.lstDryItemDemandDetail[index].PradhikarNo = totalPradikar;
          $('#Stock' + index).removeAttr("disabled")
          $('#CurrentDemand' + index).removeAttr("disabled")
        }
      }
      else {
        this.lstDryItemDemandDetail[index].PradhikarNo = 0;
        $('#Stock' + index).attr("disabled", true);
        $('#CurrentDemand' + index).attr("disabled", true);

      }
    }
  }

  calculateVortukiDemand(index) {

    if (this.netResource > 0) {
      if (this.lstDryItemDemandDetail[index].isItemCheck) {
        var item = this.lstItem.filter(i => i.ItemID == this.lstDryItemDemandDetail[index].ItemID)[0];

        if (item) {

          console.log("is Bellow three", item.IsBellowThree);
          if (item.IsBellowThree) {
            var total = this.numberOfOwn + this.numberOfWife + this.numberOfChild12 + this.totalBellow12Children + this.bellow3ChildTotal;
            console.log("Total", total);
            this.lstDryItemDemandDetail[index].PradhikarNo = (total * this.totalDay * item.VortukiScale) / 1000;
          }
          else {
            this.lstDryItemDemandDetail[index].PradhikarNo = (this.netResource * item.VortukiScale) / 1000;
          }



          $('#Stock' + index).removeAttr("disabled")
          $('#CurrentDemand' + index).removeAttr("disabled")
        }

      }
      else {
        this.lstDryItemDemandDetail[index].PradhikarNo = 0;
        $('#Stock' + index).attr("disabled", true);
        $('#CurrentDemand' + index).attr("disabled", true);

      }
    }
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
      $("#DryItemDemandModalPrint").print({
        globalStyles: true,
        mediaPrint: true,
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


  distributeDryItemDemandPrint(vmDemand) {
    this.getUserByID();
    this.dryItemDemandService.printDemand(vmDemand.DryItemDemand.DryItemDemandID)
      .subscribe(response => {

        if (response.StatusCode == ResponseStatus.success) {

          this.objVMDryItemDemand = response.ResponseObj;

          this.objDryItemDemand = this.objVMDryItemDemand.DryItemDemand;

          this.objDryDemandRportObj = this.objVMDryItemDemand.DryDemandRportObj;
          this.objDryItemDemandResourceDetail = this.objVMDryItemDemand.DryItemDemandResourceDetail;
          this.lstDryItemDemandDetail = this.objVMDryItemDemand.lstDryItemDemandDetail;
          this.lstDryItemDemandFamilyDetail = this.objVMDryItemDemand.lstDryItemDemandFamilyDetail;


          this.onDateChange();

          this.objDryDemandRportObj.totalResource = this.objDryItemDemandResourceDetail.NumberOfCivil +
            this.objDryItemDemandResourceDetail.NumberOfJCO + this.objDryItemDemandResourceDetail.NumberOfNCR +
            this.objDryItemDemandResourceDetail.NumberOfOR + this.objDryItemDemandResourceDetail.NewAdmission;

          var supplyPlace = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == this.objDryItemDemand.SupplyPlaceID)[0];
          if (supplyPlace) {
            this.objDryItemDemand.SupplyPlaceName = supplyPlace.SupplyPlaceName;
          }
          this.lstDryItemDemandFamilyDetail.forEach(f => {

            var post = this.lstFamilyType.filter(fam => fam.id == f.PostID)[0];
            if (post) {
              f.PostName = post.name;
            }
          })

          var demandType = this.lstDemandType.filter(d => d.id == this.objDryItemDemand.DemandTypeID)[0];
          if (demandType) {
            this.objDryItemDemand.DemandTypeName = demandType.name;
          }

          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == this.objDryItemDemand.FromUnitID)[0];
          if (unit) {
            this.objDryItemDemand.UnitName = unit.Unit.UnitName;
          }
          this.lstDryItemDemandDetail.forEach(detail => {
            var packingM = this.lstPackingMaterial.filter(p => p.PackingMaterialID == detail.PackingMaterial)[0];
            if (packingM) {
              detail.PackingMaterialName = packingM.MaterialName;
            }
          })

          if (this.objDryItemDemand.DemandTypeID == DemandType[0].id) {
            $('#lblChildrenCount').css("display", "none");
          }
          else if (this.objDryItemDemand.DemandTypeID == DemandType[1].id) {
            $('#lblChildrenCount').css("display", "block");
          }
          console.log("Auto Number", this.objDryItemDemand.AutogeneratedNumber);
          this.generateBarcode(this.objDryItemDemand.AutogeneratedNumber);

          this.objDryDemandRportObj.totalDay = this.totalDay;
          this.objDryDemandRportObj.netResource = this.objDryDemandRportObj.totalResource * this.totalDay;

        }
      });

    $('#DryItemDemandModalPrint').modal("show");
  }

  getUserByID() {
    this.userService.getUserByID(this.userID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objUser = response.ResponseObj;
        console.log("user", this.objUser);
      }
    });
  }

  LoadItem() {
    this.lstDryItemDemandDetail = new Array<DryItemDemandDetail>();
    if (this.objDryItemDemand.DemandTypeID == DemandType[0].id) {
      this.getFreeItem();
      $('#lblChildrenCount').css("display", "none");
      this.lstDryItemDemandFamilyDetail = [];
    }
    else if (this.objDryItemDemand.DemandTypeID == DemandType[1].id) {
      this.lstDryItemDemandFamilyDetail = [];
      this.getGeneralItem();
      $('#lblChildrenCount').css("display", "block");

      this.lstFamilyType.forEach(family => {

        if (family.type == 1) {
          this.objUnitFamilyDetail = new DryItemDemandFamilyDetail();
          this.objUnitFamilyDetail.PostName = family.name;
          this.objUnitFamilyDetail.PostID = family.id;
          this.objUnitFamilyDetail.Type = family.type;
          this.objUnitFamilyDetail.NumberOfOwn = 0;
          this.objUnitFamilyDetail.NumberOfWife = 0;
          this.objUnitFamilyDetail.NumberOfChildrendAbove12 = 0;
          this.objUnitFamilyDetail.NumberOfChildrendBellow12 = 0;
          this.objUnitFamilyDetail.NumberOfChildrenBellow3 = 0;
          if (this.objDryItemDemand.DemandTypeID == 2 && family.id != FamilyType[4].id) {
            console.log(this.objDryItemDemand.DemandTypeID + family.id);
            this.objUnitFamilyDetail.isEnable = true;
            console.log("check");
          }
          this.lstDryItemDemandFamilyDetail.push(this.objUnitFamilyDetail);

        }


      }

      )

    }
    else if (this.objDryItemDemand.DemandTypeID == DemandType[2].id) {
      this.lstDryItemDemandFamilyDetail = [];
      $('#lblChildrenCount').css("display", "block");
      this.getVortukiItem();
      this.lstFamilyType.forEach(family => {
        this.objUnitFamilyDetail = new DryItemDemandFamilyDetail();
        this.objUnitFamilyDetail.PostName = family.name;
        this.objUnitFamilyDetail.PostID = family.id;
        this.objUnitFamilyDetail.Type = family.type;
        this.objUnitFamilyDetail.NumberOfOwn = 0;
        this.objUnitFamilyDetail.NumberOfWife = 0;
        this.objUnitFamilyDetail.NumberOfChildrendAbove12 = 0;
        this.objUnitFamilyDetail.NumberOfChildrendBellow12 = 0;
        this.objUnitFamilyDetail.NumberOfChildrenBellow3 = 0;

        if (family.id != FamilyType[0].id) {
          this.objUnitFamilyDetail.otherDisable = true;
        }

        if (this.objDryItemDemand.DemandTypeID == 3 && family.id == FamilyType[4].id) {
          console.log(this.objDryItemDemand.DemandTypeID + family.id);
          this.objUnitFamilyDetail.isEnable = true;
          console.log("check");
        }
        this.lstDryItemDemandFamilyDetail.push(this.objUnitFamilyDetail);
      })
    }
  }




  calculateBellow2Child() {

    this.netChildTotal = 0;
    this.bellow3ChildTotal = 0;
    this.lstDryItemDemandFamilyDetail.forEach(family => {
      this.bellow3ChildTotal += family.NumberOfChildrenBellow3;
    })
    this.onFamilyResourceChange();
  }

  calculateBellow12Child() {
    this.totalBellow12Children = 0;
    var bellow12ChildTotal = 0;
    this.lstDryItemDemandFamilyDetail.forEach(family => {
      bellow12ChildTotal += family.NumberOfChildrendBellow12;
    })

    if (this.totalDay > 0 && bellow12ChildTotal > 0) {
      this.totalBellow12Children = (bellow12ChildTotal * this.totalDay);
    }
    this.onFamilyResourceChange();
  }



  getFreeItem() {
    this.lstItem.forEach(item => {
      if (item.FreeScale > 0 && item.ItemTypeID == DemandItemType[0].id) {
        this.objDryItemDemandDetail = new DryItemDemandDetail();
        this.objDryItemDemandDetail.ItemID = item.ItemID;
        this.objDryItemDemandDetail.ItemName = item.ItemName;
        this.lstDryItemDemandDetail.push(this.objDryItemDemandDetail);
      }
    })
  }

  getFreeItemForEdit() {
    this.lstItem.forEach(item => {
      if (item.FreeScale > 0 && item.ItemTypeID == DemandItemType[0].id) {
        this.objDryItemDemandDetail = new DryItemDemandDetail();

        var existingDetail = this.lstDryItemDemandDetail.filter(f => f.ItemID == item.ItemID)[0];
        if (existingDetail) {
          existingDetail.isItemCheck = true;
        }
        else {

          this.objDryItemDemandDetail.ItemID = item.ItemID;
          this.objDryItemDemandDetail.ItemName = item.ItemName;
          this.lstDryItemDemandDetail.push(this.objDryItemDemandDetail);
        }


      }
    })
  }

  getGeneralItem() {
    console.log("general Item")
    this.lstItem.forEach(item => {
      if (item.GeneralScale > 0 && item.ItemTypeID == DemandItemType[0].id) {
        this.objDryItemDemandDetail = new DryItemDemandDetail();
        this.objDryItemDemandDetail.ItemID = item.ItemID;
        this.objDryItemDemandDetail.ItemName = item.ItemName;
        this.lstDryItemDemandDetail.push(this.objDryItemDemandDetail);
      }
    })

  }

  getVortukiItem() {
    console.log("vortuki Item")
    this.lstItem.forEach(item => {
      if (item.VortukiScale > 0 && item.ItemTypeID == DemandItemType[0].id) {
        this.objDryItemDemandDetail = new DryItemDemandDetail();
        this.objDryItemDemandDetail.ItemID = item.ItemID;
        this.objDryItemDemandDetail.ItemName = item.ItemName;
        this.lstDryItemDemandDetail.push(this.objDryItemDemandDetail);
      }
    })

  }

  getAllUnit() {
    this.lstVMUnit = [];
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("UnitList", this.lstVMUnit)

        this.lstVMUnit = response.ResponseObj;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  saveDryItemDemand() {
    this.objVMDryItemDemand.DryItemDemand = this.objDryItemDemand;
    this.objVMDryItemDemand.lstDryItemDemandDetail = this.lstDryItemDemandDetail.filter(d => d.isItemCheck);
    this.objVMDryItemDemand.DryItemDemandResourceDetail = this.objDryItemDemandResourceDetail;
    this.objVMDryItemDemand.lstDryItemDemandFamilyDetail = this.lstDryItemDemandFamilyDetail;
    this.objVMDryItemDemand.DryItemDemand.ToSSDID = 1;

    this.dryItemDemandService.saveDryItemDemand(this.objVMDryItemDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objDryItemDemand = new DryItemDemand();
        this.objDryItemDemandResourceDetail = new DryItemDemandResourceDetail();
        this.lstDryItemDemandDetail = [];
        this.objVMDryItemDemand = new VMDryItemDemand();
        this.netChildTotal = 0;
        this.totalBellow12Children = 0;
        this.bellow3ChildTotal = 0;
        this.totalResource = 0;
        this.netResource = 0;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getAllDryItemDemandByFilter() {
    this.dryItemDemandService.getFilteredDryItemDemand(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

        console.log("unit Demand", response.ResponseObj);
        this.lstVMDryItemDemand = response.ResponseObj;

        if (this.objQueryObject.SupplyPlaceID > 0) {
          this.lstVMDryItemDemand = this.lstVMDryItemDemand.filter(d => d.DryItemDemand.SupplyPlaceID == this.objQueryObject.SupplyPlaceID);
        }

        this.lstVMDryItemDemand.forEach(demad => {
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == demad.DryItemDemand.FromUnitID)[0];

          var demandType = DemandType.filter(d => d.id == demad.DryItemDemand.DemandTypeID)[0];
          if (demandType) {
            demad.DryItemDemand.DemandTypeName = demandType.name;
          }

          var supplyPalce = this.lstSupplyPlace.filter(s => s.SupplyPlaceID == demad.DryItemDemand.SupplyPlaceID)[0];

          if (supplyPalce) {
            demad.DryItemDemand.SupplyPlaceName = supplyPalce.SupplyPlaceName;
          }


          var rStatus = DemandStatus.filter(d => d.id == demad.DryItemDemand.Status)[0];
          if (unit) {
            demad.DryItemDemand.UnitName = unit.Unit.UnitName;
            demad.DryItemDemand.StatusName = rStatus.name;
          }

          console.log("Status", demad.DryItemDemand.Status);
          console.log("user level", this.userLevel);

          //for uni approver
          if (demad.DryItemDemand.Status == DemandStatus[0].id
            && (this.userLevel >= SMS_USER_LEVEL[1].id && this.userLevel < SMS_USER_LEVEL[5].id)) {
            demad.DryItemDemand.showApproval = true;
            console.log("unit admin");
          }
          else if (demad.DryItemDemand.Status == DemandStatus[1].id && this.userLevel == SMS_USER_LEVEL[5].id) {
            demad.DryItemDemand.showApproval = true;
            console.log("SSD admin");
          }
          else if (demad.DryItemDemand.Status == DemandStatus[2].id && this.userLevel == SMS_USER_LEVEL[6].id) {
            demad.DryItemDemand.showApproval = true;
            console.log("OC SSD");
          }
          else {
            demad.DryItemDemand.showApproval = false;
          }
        })
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "No data found");
        this.lstVMDryItemDemand = [];
      }
    });
  }


  getDryDemandSummary() {
    this.dryItemDemandService.getDryDemandSummary(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemSummary = response.ResponseObj;
        $('#demandSummaryModal').modal("show");
      }
    });
  }


  editDemand(vmDemand) {

    console.log("Dry demand", vmDemand);

    this.objDryItemDemand = vmDemand.DryItemDemand;
    this.lstDryItemDemandDetail = vmDemand.lstDryItemDemandDetail;
    this.lstDryItemDemandFamilyDetail = vmDemand.lstDryItemDemandFamilyDetail;
    this.objDryItemDemandResourceDetail = vmDemand.DryItemDemandResourceDetail;

    this.onDateChange();


    this.totalResource = 0;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfJCO;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfOR;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfNCR;
    this.totalResource += this.objDryItemDemandResourceDetail.NumberOfCivil;
    this.netResource = (this.totalResource * this.totalDay);


    this.getFreeItemForEdit();


    this.showEntry = true;
    if (this.objDryItemDemand.DemandTypeID == DemandType[0].id) {
      $('#lblChildrenCount').css("display", "none");
      this.lstDryItemDemandFamilyDetail = [];
    }
    else if (this.objDryItemDemand.DemandTypeID == DemandType[1].id) {

      console.log("General Demand");
      console.log("family Detail", this.lstDryItemDemandFamilyDetail);

      $('#lblChildrenCount').css("display", "block");
      this.lstFamilyType.forEach(family => {
        this.objUnitFamilyDetail = this.lstDryItemDemandFamilyDetail.filter(f => f.PostID == family.id)[0];
        this.objUnitFamilyDetail.PostName = family.name;
        if (this.objDryItemDemand.DemandTypeID == 2 && family.id != FamilyType[4].id) {
          console.log(this.objDryItemDemand.DemandTypeID + family.id);
          this.objUnitFamilyDetail.isEnable = true;
          console.log("check");
        }
      })
    }
    else if (this.objDryItemDemand.DemandTypeID == DemandType[2].id) {

      console.log("Voartuki Demand");
      console.log("family Detail", this.lstDryItemDemandFamilyDetail);

      $('#lblChildrenCount').css("display", "block");
      this.lstFamilyType.forEach(family => {

        this.objUnitFamilyDetail = this.lstDryItemDemandFamilyDetail.filter(f => f.PostID == family.id)[0];
        this.objUnitFamilyDetail.PostName = family.name;

        if (family.id != FamilyType[0].id) {
          this.objUnitFamilyDetail.otherDisable = true;
        }

        if (this.objDryItemDemand.DemandTypeID == 3 && family.id == FamilyType[4].id) {
          console.log(this.objDryItemDemand.DemandTypeID + family.id);
          this.objUnitFamilyDetail.isEnable = true;
          console.log("check");
        }
        this.lstDryItemDemandFamilyDetail.push(this.objUnitFamilyDetail);
      })
    }






  }

  addNew() {

    this.showEntry = true;
    this.objDryItemDemand = new DryItemDemand();
    this.lstDryItemDemandDetail = [];
    this.lstDryItemDemandFamilyDetail = [];

  }
  close() {

    this.showEntry = false;
  }


  approveDryItemDemand() {
    if (confirm("Do you want to approve this demand?")) {
      this.objVMDryItemDemand.DryItemDemand = this.objDryItemDemand;
      this.objVMDryItemDemand.lstDryItemDemandDetail = this.lstDryItemDemandDetail;
      this.dryItemDemandService.approveDryItemDemand(this.objVMDryItemDemand).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
          $('#adminApprovalModal').modal("hide");
          this.getAllDryItemDemandByFilter();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
        }
      });
    }
  }


  approveDemand(vmDemand) {

    if (this.userLevel < SMS_USER_LEVEL[5].id) {
      if (confirm("Do you want to approve this demand?")) {
        this.dryItemDemandService.approveDryItemDemand(vmDemand).subscribe((response) => {
          if (response.StatusCode == ResponseStatus.success) {
            this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
            this.getAllDryItemDemandByFilter();
          } else {
            this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve");
          }
        });
      }
    }
    else {
      this.objDryItemDemand = vmDemand.DryItemDemand;
      this.lstDryItemDemandDetail = vmDemand.lstDryItemDemandDetail;
      this.lstDryItemDemandDetail.forEach(c => {
        var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
        if (item != null) {
          c.ItemName = item.ItemName;
        }
      })
      $('#adminApprovalModal').modal("show");
    }
  }


  

}
