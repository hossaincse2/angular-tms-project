import { Component, OnInit } from '@angular/core';
import { SupplyPlace } from '../../models/smModels/supplyPlace';
import { SupplyPlaceService } from '../../services/supplyPlaceService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ResponseStatus } from '../../common/QSEnums';

@Component({
  selector: 'app-supply-place',
  templateUrl: './supply-place.component.html',
  styleUrls: ['./supply-place.component.css'],
  providers: [SupplyPlaceService]
})
export class SupplyPlaceComponent implements OnInit {

  public objSupplyPlace: SupplyPlace = new SupplyPlace();
  showEntry: boolean = false;
  lstSupplyPlace: SupplyPlace[] = new Array<SupplyPlace>();

  constructor(private messageHelper: MessageHelper, private supplyPlaceService: SupplyPlaceService) { }

  ngOnInit() {
    this.getAllSupplyPlace();
  }



  editSupplyPlace(supplyPlace) {
    this.objSupplyPlace = supplyPlace;
    this.showEntry = true;
  }

  addNew() {
    this.objSupplyPlace = new SupplyPlace();
    this.showEntry = true;
  }
  close() {
    this.objSupplyPlace = new SupplyPlace();
    this.showEntry = false;
  }

  deleteSupplyPlace(supplyPlace) {
    if (confirm("Are you sure to delte this record?")) {
      this.supplyPlaceService.deleteSupplyPlace(supplyPlace).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Deleted successfully");
          this.getAllSupplyPlace();
        }
      });
    }
  }


  getAllSupplyPlace() {
    this.supplyPlaceService.getAllSupplyPlace().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstSupplyPlace = response.ResponseObj;
        console.log("Supply Plce", this.lstSupplyPlace);
      }
    });
  }

  saveSupplyPlace() {
    this.supplyPlaceService.saveSupplyPlace(this.objSupplyPlace).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objSupplyPlace = new SupplyPlace();
        this.getAllSupplyPlace();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }




}
