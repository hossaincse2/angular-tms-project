import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, ResourceType, DemandItemType, Months, Years, RRStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { VMUnit } from '../../models/smModels/vmUnit';
import { RRDetail } from '../../models/smModels/rrDetail';
import { VMRR } from '../../models/smModels/vmRR';
import { RR } from '../../models/smModels/rr';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/smModels/item';
import { QueryObject } from '../../models/queryObject';
import { RRService } from '../../services/rrService';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { RRPService } from '../../services/rrpService';
import { VMRRPeople } from '../../models/smModels/vmRRPeople';
import { RRPeople } from '../../models/smModels/rrPeople';
import { visitValue } from '@angular/compiler/src/util';
declare var $: any;

@Component({
  selector: 'app-rr-entry',
  templateUrl: './rr-entry.component.html',
  styleUrls: ['./rr-entry.component.css'],
  providers: [UnitService, ItemService, RRService, UnitOfMeasureService,
    RRPService]
})
export class RrEntryComponent implements OnInit {
  showEntry: boolean = false;
  objVMRR: VMRR = new VMRR();
  public objRR: RR = new RR();
  lstResourceType: any[];
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public lstVMRR: VMRR[] = new Array<VMRR>();
  public objRRDetail: RRDetail = new RRDetail();
  lstRRDetail: RRDetail[] = new Array<RRDetail>();

  lstDryRRDetail: RRDetail[] = new Array<RRDetail>();
  lstFreshRRDetail: RRDetail[] = new Array<RRDetail>();
  lstCondimentRRDetail: RRDetail[] = new Array<RRDetail>();

  public lstItem: Item[] = new Array<Item>();
  public lstAllItem: Item[] = new Array<Item>();
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public lstItemType: any[];

  public lstMonth: any[];
  public lstYear: any[];
  public lstVMRRPeople: VMRRPeople[] = new Array<VMRRPeople>();
  objVMRRPeople: VMRRPeople = new VMRRPeople();
  public totalManpower: number = 0;
  public objRRP: RRPeople = new RRPeople();
  public objQueryObject: QueryObject = new QueryObject();


  constructor(private messageHelper: MessageHelper, private UnitService: UnitService,
    private ItemService: ItemService, private rrService: RRService,
    private unitOfMeasureService: UnitOfMeasureService, private rrpService: RRPService, ) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.showEntry = false;
    this.lstVMUnit = [];
    this.getAllItem();
    this.lstResourceType = ResourceType;
    this.getAllUnit();
    this.getAllUnitOfMeasure();
    this.lstItemType = DemandItemType;
    this.lstMonth = Months;
    this.lstYear = Years;
    this.generatePrint();
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

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
        this.lstAllItem = this.lstItem;
      }
    });
  }


  getAllManpower() {
    this.rrpService.getFilteredExistingRRPeople(this.objRR).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objVMRRPeople = response.ResponseObj;
        this.objVMRRPeople.lstRRPDetail.forEach(v => {
          this.totalManpower += v.Total;
        })

        this.lstRRDetail = [];
        this.objRRDetail = new RRDetail();
        this.objRRDetail.NumberOfPeople = this.totalManpower;
        this.lstRRDetail.push(this.objRRDetail);
      }
    })
  };

  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        console.log("unit List", this.lstVMUnit);
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  calculateTotal() {
    this.lstRRDetail.forEach(detail => {

      var unitOfMeasure = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == detail.UnitOfMeasure)[0];
      if (unitOfMeasure) {
        detail.Description = ((detail.NumberOfPeople * detail.Scale)).toFixed(3);
      }
      else {

      }
    })
  }

  addNew() {
    this.objRR = new RR();
    this.lstRRDetail = [];
    this.objRRDetail = new RRDetail();
    this.lstRRDetail.push(this.objRRDetail);
    this.showEntry = true;
  }
  close() {
    this.objRR = new RR();
    this.lstRRDetail = [];
    this.showEntry = false;
  }

  addResource() {
    this.objRRDetail = new RRDetail();
    this.objRRDetail.NumberOfPeople = this.totalManpower;
    this.lstRRDetail.push(this.objRRDetail);
  }
  removeResource() {
    this.lstRRDetail.pop();
  }

  editRR(vmUnit) {
    this.objRR = vmUnit.RR;
    this.lstRRDetail = vmUnit.lstRRDetail;
    this.showEntry = true;
  }

  LoadItem(itemType) {
    this.lstItem = this.lstAllItem.filter(i => i.ItemTypeID == itemType);
  }


  detailRR(vmUnit) {
    this.lstRRDetail = vmUnit.lstRRDetail;
    this.lstRRDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      var unitOfMeasure = this.lstUnitOfMeasure.filter(f => f.UnitOfMeasureID == c.UnitOfMeasure)[0];
      console.log("UnitOfMeasure", unitOfMeasure);
      if (unitOfMeasure) {
        c.UnitOfMeasureName = unitOfMeasure.Name;
      }
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })
    $('#unitDemandModal').modal("show");
  }


  generatePrint() {
    $('.printMe').click(function () {
      $("#RRDetail").print({
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


  printRR(vmUnit) {
    // this.objRR.RRID=1;
    //   this.rrService.printRR(this.objRR).subscribe((blob) => {
    //     var link=document.createElement('a');
    //   link.href=window.URL.createObjectURL(blob);
    //   link.download="test.pdf";
    //   link.click();
    //   });

    this.lstRRDetail = vmUnit.lstRRDetail;


    this.lstRRDetail.forEach(c => {
      var item = this.lstItem.filter(i => i.ItemID == c.ItemID)[0];
      var unitOfMeasure = this.lstUnitOfMeasure.filter(f => f.UnitOfMeasureID == c.UnitOfMeasure)[0];

      if (unitOfMeasure) {
        c.UnitOfMeasureName = unitOfMeasure.Name;
      }
      if (item != null) {
        c.ItemName = item.ItemName;
      }
    })   

    this.lstDryRRDetail = this.lstRRDetail.filter(i => i.ItemTypeID == DemandItemType[0].id);

    this.lstCondimentRRDetail = this.lstRRDetail.filter(i => i.ItemTypeID == DemandItemType[1].id);

    this.lstFreshRRDetail = this.lstRRDetail.filter(i => i.ItemTypeID == DemandItemType[3].id || i.ItemTypeID == DemandItemType[4].id);


    $('#unitDemandPrintModal').modal("show");

  }

  deleteUnit() {

  }

  saveRR() {
    this.objVMRR.RR = this.objRR;
    this.objVMRR.lstRRDetail = this.lstRRDetail;
    this.rrService.saveRR(this.objVMRR).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objRR = new RR();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getFilteredRR() {
    this.rrService.getFilteredRR(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMRR = response.ResponseObj;
        this.lstVMRR.forEach(r => {
          var month = this.lstMonth.filter(m => m.id == r.RR.Month)[0];
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == r.RR.UnitID)[0];
          if (unit) {
            r.RR.UnitName = unit.Unit.UnitName;
          }
          var rStatus = RRStatus.filter(d => d.id == r.RR.Status)[0];
          if (unit) {
            r.RR.StatusName = rStatus.name;
          }
          if (month) {
            r.RR.MonthName = month.name;
          }
        })

      }
    });
  }


}
