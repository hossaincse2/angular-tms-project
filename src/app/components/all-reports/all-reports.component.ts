import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/smModels/item';
import { ReportCategory, ReportName, ResponseStatus } from '../../common/QSEnums';
import { QueryObject } from '../../models/queryObject';
import { ReportService } from '../../services/reportService';
import { VMStatement } from '../../models/smModels/vmStatement';
import { VMContractorBill } from '../../models/smModels/vmContractorBill';
declare var $: any;

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css'],
  providers: [ReportService]
})
export class AllReportsComponent implements OnInit {
  reportCategory: number;
  reportID: number;
  lstDemandItemType: any[];
  lstItem: Item[] = new Array<Item>();
  lstReportCategory: any[];
  lstReportName: any[];
  showEntry: boolean;
  searchItemType: number;
  objQueryObject: QueryObject = new QueryObject();
  vmStatement: VMStatement = new VMStatement();
  public lstVMContractorBill: VMContractorBill[] = new Array<VMContractorBill>();

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.lstReportCategory = ReportCategory;

  }

  getReportName() {
    this.lstReportName = ReportName.filter(r => r.CategoryID == this.reportCategory);
  }

  loadItem() {

  }

  getReport() {
    this.contractorBill(); 
  }

  contractorBill() {
    this.reportService.getButcheryContractorBill(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMContractorBill = response.ResponseObj;
        console.log(this.lstVMContractorBill);
        $('#contractorBillModal').modal("show");
      }
    });
  }
}
