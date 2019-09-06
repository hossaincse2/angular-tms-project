import { Component, OnInit } from '@angular/core';
import { VMRRPeople } from '../../models/smModels/vmRRPeople';
import { RRPeople } from '../../models/smModels/rrPeople';
import { VMUnit } from '../../models/smModels/vmUnit';
import { RRPeopleDetail } from '../../models/smModels/rrPeopleDetail';
import { Item } from '../../models/smModels/item';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitService } from '../../services/unitService';
import { ItemService } from '../../services/itemService';
import { ResponseStatus, DemandItemType, Months, Years, RRStatus } from '../../common/QSEnums';
import { QueryObject } from '../../models/queryObject';
import { RRPService } from '../../services/rrpService';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rr-people-entry',
  templateUrl: './rr-people-entry.component.html',
  styleUrls: ['./rr-people-entry.component.css'],
  providers: [UnitService, ItemService, RRPService, DatePipe]
})
export class RrPeopleEntryComponent implements OnInit {
  showEntry: boolean = false;
  objVMRRPeople: VMRRPeople = new VMRRPeople();
  public objRRP: RRPeople = new RRPeople();
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public lstVMRRPeople: VMRRPeople[] = new Array<VMRRPeople>();
  public objRRPeopleDetail: RRPeopleDetail = new RRPeopleDetail();
  lstRRPeopleDetail: RRPeopleDetail[] = new Array<RRPeopleDetail>();
  public lstItem: Item[] = new Array<Item>();
  public lstItemType: any[];

  public lstMonth: any[];
  public lstYear: any[];
  public objQueryObject: QueryObject = new QueryObject();
  public totalResource = 0;
  public netResource = 0;
  public exRRPeopleDetail: RRPeopleDetail = new RRPeopleDetail();

  constructor(private messageHelper: MessageHelper, private ItemService: ItemService
    , private UnitService: UnitService, private rrpService: RRPService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.showEntry = false;
    this.lstVMUnit = [];
    this.getAllItem();
    this.getAllUnit();
    this.lstItemType = DemandItemType;
    this.lstMonth = Months;
    this.lstYear = Years;
    this.objRRP.Year = new Date().getFullYear();
    this.objRRP.Month = new Date().getMonth() + 1;

    this.objRRPeopleDetail.FRA = 0;
    this.objRRPeopleDetail.SMatch = 0;

  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }



  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
        console.log("unit List", this.lstVMUnit);
      }
    });
  }

  addNew() {
    this.objRRP = new RRPeople();
    this.lstRRPeopleDetail = [];
    this.objRRPeopleDetail = new RRPeopleDetail();
    this.lstRRPeopleDetail.push(this.objRRPeopleDetail);
    this.showEntry = true;
  }
  close() {
    this.objRRP = new RRPeople();
    this.lstRRPeopleDetail = [];
    this.showEntry = false;
  }




  onResourceChange() {
    this.lstRRPeopleDetail.forEach(detail => {
      detail.Total = detail.FRA + detail.SMatch;
    })
  }



  deleteUnit() {

  }

  loadItem() {


  }
  getFilteredExistingRRPeople() {

    if (this.objRRP.UnitID > 0 && this.objRRP.Year > 0 && this.objRRP.Month > 0) {
      var totalDays = new Date(this.objRRP.Year, this.objRRP.Month, 0).getDate();

      console.log("TotalDays", totalDays);
      this.lstRRPeopleDetail = [];

      this.rrpService.getFilteredExistingRRPeople(this.objRRP).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.objVMRRPeople = response.ResponseObj;
          this.objRRP = this.objVMRRPeople.RRPeople;
          for (var i = 1; i <= totalDays; i++) {
            this.objRRPeopleDetail = new RRPeopleDetail();

            // if (i < 10) {
            //   this.objRRPeopleDetail.ConsumtionDate = this.objRRP.Year + "/" + "0" +this.objRRP.Month + "/" + i;
            // }
            // else {
            this.objRRPeopleDetail.ConsumtionDate = this.objRRP.Year + "/" + this.objRRP.Month + "/" + i;
            //}

            console.log("date", this.objRRPeopleDetail.ConsumtionDate);

            this.exRRPeopleDetail = this.objVMRRPeople.lstRRPDetail.filter(r => this.datePipe.transform(r.ConsumtionDate, "yyyy-MM-dd") == this.datePipe.transform(this.objRRPeopleDetail.ConsumtionDate, "yyyy-MM-dd"))[0];

            if (this.exRRPeopleDetail != null && this.exRRPeopleDetail.Total > 0) {
              this.objRRPeopleDetail = this.exRRPeopleDetail;
            } else {
              this.objRRPeopleDetail.FRA = 0;
              this.objRRPeopleDetail.SMatch = 0;
            }

            this.lstRRPeopleDetail.push(this.objRRPeopleDetail);
          }
        }
        else {
          for (var i = 1; i <= totalDays; i++) {
            this.objRRPeopleDetail = new RRPeopleDetail();
            // if (i < 10) {
            //   this.objRRPeopleDetail.ConsumtionDate = this.objRRP.Year + "/" + "0" +this.objRRP.Month + "/" + i;
            // }
            // else {
            this.objRRPeopleDetail.ConsumtionDate = this.objRRP.Year + "/" + this.objRRP.Month + "/" + i;
            //}
            this.objRRPeopleDetail.FRA = 0;
            this.objRRPeopleDetail.SMatch = 0;
            this.lstRRPeopleDetail.push(this.objRRPeopleDetail);
          }
        }
      });
    }

  }






  saveRRPeople() {

    this.objVMRRPeople.RRPeople = this.objRRP;
    this.objVMRRPeople.lstRRPDetail = this.lstRRPeopleDetail;

    console.log(this.objVMRRPeople.lstRRPDetail);

    this.objVMRRPeople.lstRRPDetail = this.lstRRPeopleDetail;
    this.rrpService.saveRRPeople(this.objVMRRPeople).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objRRP = new RRPeople();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getFilteredRRPeople() {
    this.rrpService.getFilteredRRPeople(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMRRPeople = response.ResponseObj;
        this.lstVMRRPeople.forEach(r => {
          var month = this.lstMonth.filter(m => m.id == r.RRPeople.Month)[0];
          var unit = this.lstVMUnit.filter(u => u.Unit.UnitID == r.RRPeople.UnitID)[0];
          if (unit) {
            r.RRPeople.UnitName = unit.Unit.UnitName;
          }
          var rStatus = RRStatus.filter(d => d.id == r.RRPeople.Status)[0];
          if (unit) {
            r.RRPeople.StatusName = rStatus.name;
          }
          if (month) {
            r.RRPeople.MonthName = month.name;
          }
        })
      }
    });
  }

}
