import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unitService';
import { ResponseStatus, ResourceType } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { PackingMaterial } from '../../models/smModels/packingMaterial';
import { PackingMaterialService } from '../../services/packingMaterialService';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';

@Component({
  selector: 'app-packing-material',
  templateUrl: './packing-material.component.html',
  styleUrls: ['./packing-material.component.css'],
  providers: [UnitService, PackingMaterialService, UnitOfMeasureService]
})
export class PackingMaterialComponent implements OnInit {

  lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  showEntry: boolean = false;
  public lstPackingMeterial: PackingMaterial[] = new Array<PackingMaterial>();
  public objPackingMaterial: PackingMaterial = new PackingMaterial();

  constructor(private messageHelper: MessageHelper, private packingMaterialService: PackingMaterialService,
    private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.showEntry = false;

    this.getAllPackingMaterial();
    this.getAllUnitOfMeasure();


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


  getAllPackingMaterial() {
    this.packingMaterialService.getAllPackingMaterial().subscribe((response) => {

      if (response.StatusCode == ResponseStatus.success) {
        this.lstPackingMeterial = response.ResponseObj;


        this.lstPackingMeterial.forEach(material => {

          var objUnitOfMeasure = this.lstUnitOfMeasure.filter(u => u.UnitOfMeasureID == material.UnitOfMeasure)[0]
          if (objUnitOfMeasure) {
            material.UnitOfMeasureName = objUnitOfMeasure.Name;
          }
        })

      }
    });
  }

  addNew() {
    this.objPackingMaterial = new PackingMaterial();
    this.showEntry = true;
  }
  close() {
    this.objPackingMaterial = new PackingMaterial();
    this.showEntry = false;
  }



  editUnit(packingMaterial) {
    this.objPackingMaterial = packingMaterial;
    this.showEntry = true;
  }

  deleteUnit(packingMaterial) {
    if (confirm("Are you sure to delete this record?")) {
      // this.packingMaterialService.deletePackingMaterial(packingMaterial).subscribe((response) => {
      //   if (response.StatusCode == ResponseStatus.success) {
      //     this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
      //     this.objPackingMaterial = new PackingMaterial();
      //     this.getAllPackingMaterial();
      //   } else {
      //     this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      //   }
      // });
    }
  }

  savePackingMaterial() {

    this.packingMaterialService.savePackingMaterial(this.objPackingMaterial).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objPackingMaterial = new PackingMaterial();
        this.getAllPackingMaterial();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


}
