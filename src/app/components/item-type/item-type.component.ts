import { Component, OnInit } from '@angular/core';
import { ItemType } from '../../models/smModels/itemType';
import { ItemTypeService } from '../../services/itemTypeService';
import { ResponseStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.css'],
  providers: [ItemTypeService]
})

export class ItemTypeComponent implements OnInit {

  showEntry: boolean = false;
  public objItemType: ItemType = new ItemType();
  lstItemType: ItemType[] = new Array<ItemType>();

  constructor(private messageHelper: MessageHelper, private ItemTypeService: ItemTypeService) { }

  ngOnInit() {
    this.getAllItemType();
  }

  editItemType(itemType) {
    this.objItemType = itemType;
    this.showEntry = true;
  }

  addNew() {
    this.objItemType = new ItemType();
    this.showEntry = true;
  }
  close() {
    this.objItemType = new ItemType();
    this.showEntry = false;
  }

  deleteItemType(itemType) {

  }

  getAllItemType() {
    this.ItemTypeService.getAllItemType().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemType = response.ResponseObj;
        console.log("ItemType", response.ResponseObj);
      }
    });
  }

  

  saveItemType() {
    this.ItemTypeService.saveItemType(this.objItemType).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objItemType = new ItemType();
        this.getAllItemType();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

}
