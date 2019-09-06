import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/smModels/item';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemService } from '../../services/itemService';
import { ResponseStatus, Months, Years } from '../../common/QSEnums';
import { ADCSetup } from '../../models/smModels/adcSetup';
import { ADCSetupDetail } from '../../models/smModels/adcSetupDetail';
import { VMADCSetup } from '../../models/smModels/vmADCSetup';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { QueryObject } from '../../models/queryObject';
import { VMUnit } from '../../models/smModels/vmUnit';
import { ADCSetupService } from '../../services/adcSetupService';

@Component({
  selector: 'app-adcsetup',
  templateUrl: './adcsetup.component.html',
  styleUrls: ['./adcsetup.component.css'],
  providers: [ItemService, UnitOfMeasureService,ADCSetupService]
})
export class ADCSetupComponent implements OnInit {
  public lstItem: Item[] = new Array<Item>();
  public objADCSetup: ADCSetup = new ADCSetup();
  public lstADCSetupDetail: ADCSetupDetail[] = new Array<ADCSetupDetail>();
  public objADCSetupDetail: ADCSetupDetail = new ADCSetupDetail();
  lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public objVMADCSetup: VMADCSetup = new VMADCSetup();
  public objQueryObject: QueryObject = new QueryObject();
  showEntry: boolean = false;
  public lstMonth: any[];
  public lstYear: any[];
  public lstVMADCsetup: VMADCSetup[] = new Array<VMADCSetup>();

  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();

  constructor(private messageHelper: MessageHelper, private itemService: ItemService,
    private unitOfMeasureService: UnitOfMeasureService,private adcsetupService: ADCSetupService) { }

  ngOnInit() {
    this.getAllItem();
    this.getAllUnitOfMeasure();
    this.lstMonth = Months;
    this.lstYear = Years;
    console.log(this.lstYear);
    this.lstADCSetupDetail.push(this.objADCSetupDetail);
  }
  addNew() { 
    this.objADCSetup = new ADCSetup();
    this.lstADCSetupDetail = [];
    this.objADCSetupDetail = new ADCSetupDetail();
    this.lstADCSetupDetail.push(this.objADCSetupDetail);
    this.showEntry = true;
  }
  close() {
    this.objADCSetup = new ADCSetup();
    this.lstADCSetupDetail = [];
    this.showEntry = false;

  }
  addResource(){
    this.objADCSetupDetail = new ADCSetupDetail();
    this.lstADCSetupDetail.push(this.objADCSetupDetail);
  }
  removeResource() {
    this.lstADCSetupDetail.pop();
  }

  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
      }
    });
  }

  getAllUnitOfMeasure() {
    this.unitOfMeasureService.getAllUnitOfMeasure().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstUnitOfMeasure = response.ResponseObj;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  saveADCSetup() {
    debugger;
    this.objVMADCSetup.ADCSetup = this.objADCSetup;
    this.objVMADCSetup.lstADCSetupDetail = this.lstADCSetupDetail;
    this.adcsetupService.saveADCSetup(this.objVMADCSetup).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objADCSetup = new ADCSetup();
        this.lstADCSetupDetail=[];
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  getFilteredADCSetup() {
    this.adcsetupService.getFilteredADCSetup(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMADCsetup = response.ResponseObj;
        // this.lstVMADCsetup.forEach(r => {         
        //   var rStatus = RRStatus.filter(d => d.id == r.RR.Status)[0];
        //   if (unit) {
        //     r.RR.StatusName = rStatus.name;
        //   }
        //   if (month) {
        //     r.RR.MonthName = month.name;
        //   }
        // })
      }
    });

  }
}
