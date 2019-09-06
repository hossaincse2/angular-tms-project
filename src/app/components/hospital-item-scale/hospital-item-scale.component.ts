import { Component, OnInit } from '@angular/core';
import { HospitalScaleDetail } from '../../models/smModels/hospitalScaleDetail';
import { Item } from '../../models/smModels/item';
import { ItemService } from '../../services/itemService';
import { ResponseStatus, DemandItemType } from '../../common/QSEnums';
import { HospitalItemScaleService } from '../../services/hospitalItemScaleService';
import { MessageHelper } from '../../common/helper/messageHelper';

@Component({
  selector: 'app-hospital-item-scale',
  templateUrl: './hospital-item-scale.component.html',
  styleUrls: ['./hospital-item-scale.component.css'],
  providers: [ItemService, HospitalItemScaleService],
})
export class HospitalItemScaleComponent implements OnInit {
  lstFreshItem: Item[] = new Array<Item>();
  lstItem: Item[] = new Array<Item>();
  public lstHospitalItemScaleDetail: HospitalScaleDetail[] = new Array<HospitalScaleDetail>();
  public objHospitalItemScaleDetail: HospitalScaleDetail = new HospitalScaleDetail();
  public lstHospitalScaleDetail: HospitalScaleDetail[] = new Array<HospitalScaleDetail>();

  constructor(private itemService: ItemService, private hospitalItemScaleService: HospitalItemScaleService,
    private messageHelper: MessageHelper, private hospitalScaleService: HospitalItemScaleService) { }

  ngOnInit() {
    this.getAllHospitalItemScale();
  }

  getAllHospitalItemScale() {
    this.hospitalScaleService.getAllHospitalItemScale().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstHospitalScaleDetail = response.ResponseObj;
        this.getAllItem();
      }
    });
  }


  getAllItem() {
    this.itemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;

        this.lstItem = this.lstItem.filter(i => i.ItemTypeID == DemandItemType[5].id);
        this.lstItem.forEach(item => {

          var existinScale = this.lstHospitalScaleDetail.filter(s => s.ItemID == item.ItemID)[0];
          if (existinScale) {
            this.objHospitalItemScaleDetail = new HospitalScaleDetail();
            this.objHospitalItemScaleDetail.ItemName = item.ItemName;
            this.objHospitalItemScaleDetail.ItemID = item.ItemID;
            this.objHospitalItemScaleDetail.HighCalorie = existinScale.HighCalorie;
            this.objHospitalItemScaleDetail.Standard = existinScale.Standard;
            this.objHospitalItemScaleDetail.Children = existinScale.Children;
            this.objHospitalItemScaleDetail.Carbohydrate = existinScale.Carbohydrate;
            this.objHospitalItemScaleDetail.Infant = existinScale.Infant;
            this.objHospitalItemScaleDetail.Soft = existinScale.Soft;
            this.objHospitalItemScaleDetail.FatRestricted = existinScale.FatRestricted;
            this.objHospitalItemScaleDetail.ProteinRestricted = existinScale.ProteinRestricted;
            this.objHospitalItemScaleDetail.Liquid = existinScale.Liquid;
            this.lstHospitalItemScaleDetail.push(this.objHospitalItemScaleDetail);
          }
          else {

            this.objHospitalItemScaleDetail = new HospitalScaleDetail();
            this.objHospitalItemScaleDetail.ItemName = item.ItemName;
            this.objHospitalItemScaleDetail.ItemID = item.ItemID;
            this.objHospitalItemScaleDetail.HighCalorie = 0;
            this.objHospitalItemScaleDetail.Standard = 0;
            this.objHospitalItemScaleDetail.Children = 0;
            this.objHospitalItemScaleDetail.Carbohydrate = 0;
            this.objHospitalItemScaleDetail.Infant = 0;
            this.objHospitalItemScaleDetail.Soft = 0;
            this.objHospitalItemScaleDetail.FatRestricted = 0;
            this.objHospitalItemScaleDetail.ProteinRestricted = 0;
            this.objHospitalItemScaleDetail.Liquid = 0;
            this.lstHospitalItemScaleDetail.push(this.objHospitalItemScaleDetail);
          }


        })
      }
    });
  }

  saveHospitalItemScale() {

    console.log(this.lstHospitalItemScaleDetail);

    this.hospitalItemScaleService.saveHospitalItemScale(this.lstHospitalItemScaleDetail).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Saved Successfully");
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save information");
      }
    });
  }



}
