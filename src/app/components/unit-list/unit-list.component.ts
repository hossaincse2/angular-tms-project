import { Component, OnInit } from '@angular/core';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UnitService } from '../../services/unitService';
import { ResourceType, ResponseStatus } from '../../common/QSEnums';
import { VMUnit } from '../../models/smModels/vmUnit';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
  providers: [UnitService]
})
export class UnitListComponent implements OnInit {

  lstResourceType: any[];
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();

  constructor(private messageHelper: MessageHelper, private UnitService: UnitService) { }

  ngOnInit() {
    this.lstResourceType = ResourceType;
    this.getAllUnit();
  }

  getAllUnit() {
    this.UnitService.getAllUnit().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMUnit = response.ResponseObj;
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


  editUnit(vmUnit) {

  }


  deleteUnit() {

  }

  addNew() {

  }

}
