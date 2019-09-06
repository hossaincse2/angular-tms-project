import { Component, OnInit } from '@angular/core';
import { QueryObject } from '../../models/queryObject';
import { PMAuctionService } from '../../services/pmAuctionService';
import { VMPMAuction } from '../../models/smModels/vmPMAuction';
import { ResponseStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { PMAuction } from '../../models/smModels/pmAuction';
import { PMAuctionDetail } from '../../models/smModels/pmAuctionDetail';
import { PackingMaterialService } from '../../services/packingMaterialService';
import { PackingMaterial } from '../../models/smModels/packingMaterial';
declare var $: any;

@Component({
  selector: 'app-pm-auction',
  templateUrl: './pm-auction.component.html',
  styleUrls: ['./pm-auction.component.css'],
  providers: [PMAuctionService, PackingMaterialService]
})
export class PmAuctionComponent implements OnInit {
  showEntry: boolean = false;
  public objQueryObject: QueryObject = new QueryObject();
  public objVMPMAuction: VMPMAuction = new VMPMAuction();
  public lstVMPMAuction: VMPMAuction[] = new Array<VMPMAuction>();

  public objPMAuction: PMAuction = new PMAuction();
  public objPMAuctionDetail: PMAuctionDetail = new PMAuctionDetail();
  public lstPMAuctionDetail: PMAuctionDetail[] = new Array<PMAuctionDetail>();

  lstPackingMaterial: PackingMaterial[] = new Array<PackingMaterial>();
  constructor(private messageHelper: MessageHelper, private pmAuctionService: PMAuctionService,
    private packingMaterialService: PackingMaterialService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.getAllPackingMaterial();
  }

  getAllPackingMaterial() {

    this.packingMaterialService.getAllPackingMaterial().subscribe((response) => {

      if (response.StatusCode == ResponseStatus.success) {
        this.lstPackingMaterial = response.ResponseObj;
        this.lstPackingMaterial.forEach(material => {
          this.objPMAuctionDetail = new PMAuctionDetail();
          this.objPMAuctionDetail.PackingMaterialID = material.PackingMaterialID;
          this.objPMAuctionDetail.Quantity = 0;
          this.objPMAuctionDetail.MaterialName = material.MaterialName;
          this.lstPMAuctionDetail.push(this.objPMAuctionDetail);
        })

      }
    });


  }



  searchByDate() {
    this.pmAuctionService.getFilteredPMAuction(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMPMAuction = response.ResponseObj;
      }
    });
  }

  savePmAuction() {

    this.objVMPMAuction.PMAuction = this.objPMAuction;
    this.objVMPMAuction.lstPMAuctionDetail = this.lstPMAuctionDetail.filter(i => i.itemCheck);

    this.pmAuctionService.savePMAuction(this.objVMPMAuction).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.lstPMAuctionDetail = [];
        this.objVMPMAuction = new VMPMAuction();
        this.objPMAuction = new PMAuction();
        this.objPMAuctionDetail = new PMAuctionDetail();
      }
    });
  }

  detailPmAuction(vmPMAuction) {
    this.lstPMAuctionDetail = vmPMAuction.lstPMAuctionDetail;
    this.lstPMAuctionDetail.forEach(detail => {
      var material = this.lstPackingMaterial.filter(f => f.PackingMaterialID == detail.PackingMaterialID)[0];

      if (material) {
        detail.MaterialName = material.MaterialName;
      }
    })
    $('#pmAuctionDetailModal').modal("show");
  }

  editPmAuction(vmPMAuction) {
    this.objPMAuction = vmPMAuction.PMAuction;
    this.lstPMAuctionDetail = vmPMAuction.lstPMAuctionDetail;
    this.lstPMAuctionDetail.forEach(detail => {
      var material = this.lstPackingMaterial.filter(f => f.PackingMaterialID == detail.PackingMaterialID)[0];
      if (material) {
        detail.MaterialName = material.MaterialName;
        detail.itemCheck = true;
      }
    })
    this.showEntry = true;
  }
  addNew() {
    this.showEntry = true;
  }
  close() {
    this.showEntry = false;
  }
}
