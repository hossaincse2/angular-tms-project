import { Component, OnInit } from '@angular/core';
import { VMDryItemDemand } from '../../models/smModels/vmDryItemDemand';
import { DryItemDemandService } from '../../services/DryItemDemandService';
import { DryItemDemand } from '../../models/smModels/dryItemDemand';
import { DryItemDemandDetail } from '../../models/smModels/dryItemDemandDetail';
import { ResponseStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';

@Component({
  selector: 'app-unit-demand',
  templateUrl: './unit-demand.component.html',
  styleUrls: ['./unit-demand.component.css'],
  providers: [DryItemDemandService]
})
export class DryItemDemandComponent implements OnInit {

  public objVMDryItemDemand: VMDryItemDemand = new VMDryItemDemand();
  public lstVMDryItemDemand: VMDryItemDemand[] = new Array<VMDryItemDemand>();

  public objDryItemDemand: DryItemDemand = new DryItemDemand()
  public lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();
  constructor(private dryItemDemandService: DryItemDemandService, private messageHelper: MessageHelper) { }

  ngOnInit() {
  }

  saveDryItemDemand() {
    this.objVMDryItemDemand.DryItemDemand = this.objDryItemDemand;
    this.objVMDryItemDemand.lstDryItemDemandDetail = this.lstDryItemDemandDetail;

    this.dryItemDemandService.saveDryItemDemand(this.objVMDryItemDemand).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objDryItemDemand = new DryItemDemand();
        this.lstDryItemDemandDetail = [];
        this.objVMDryItemDemand = new VMDryItemDemand();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

}
