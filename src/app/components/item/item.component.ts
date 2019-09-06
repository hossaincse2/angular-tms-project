import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/smModels/item';
import { ItemService } from '../../services/itemService';
import { ResponseStatus, DemandItemType } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { ItemTypeService } from '../../services/itemTypeService';
import { ItemType } from '../../models/smModels/itemType';
import { UnitOfMeasureService } from '../../services/unitOfMeasureService';
import { UnitOfMeasure } from '../../models/smModels/unitOfMeasure';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService, ItemTypeService, UnitOfMeasureService]
})
export class ItemComponent implements OnInit {

  showEntry: boolean = false;
  lstItemType: ItemType[] = new Array<ItemType>();
  lstItem: Item[] = new Array<Item>();
  lstAllItem: Item[] = new Array<Item>();
  public lstUnitOfMeasure: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  public lstDemandItemType: any[];
  public objItem: Item = new Item();
  searchItemType: number;

  constructor(private messageHelper: MessageHelper, private ItemService: ItemService,
    private itemTypeService: ItemTypeService, private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.getAllItemType();
    this.getAllUnitOfMeasure();
    this.lstDemandItemType = DemandItemType;
    console.log(this.lstUnitOfMeasure);
  }

  getAllItemType() {
    this.itemTypeService.getAllItemType().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItemType = response.ResponseObj;
        this.getAllItem();
      }
    });
  }

  getAllUnitOfMeasure() {
    this.unitOfMeasureService.getAllUnitOfMeasure().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstUnitOfMeasure = response.ResponseObj;
        console.log("unit List", this.lstUnitOfMeasure);
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


  searchByItemType() {
    if (this.searchItemType > 0) {
      this.lstItem = this.lstAllItem.filter(i => i.ItemTypeID == this.searchItemType);
    }
    else {
      this.lstItem = this.lstAllItem;
    }
  }

  editItemType(item) {
    this.objItem = item;
    this.showEntry = true;
  }

  addNew() {
    this.objItem = new Item();
    this.showEntry = true;
  }

  close() {
    this.objItem = new Item();
    this.showEntry = false;
  }

  deleteItemType(item) {

    if (confirm("Are you sure to delete this record?")) {
      this.ItemService.deleteItem(item).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Successfully deleted");
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, response.Message);
        }
      });
    }


  }

  getAllItem() {
    this.ItemService.getAllItem().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstItem = response.ResponseObj;
        this.lstItem.forEach(item => {
          var itemType = this.lstItemType.filter(i => i.ItemTypeID == item.ItemTypeID)[0];
          if (itemType)
            item.TypeName = itemType.TypeName;
        })
        this.lstAllItem = JSON.parse(JSON.stringify(this.lstItem))

        if (this.searchItemType > 0) {
          this.lstItem = this.lstAllItem.filter(i => i.ItemTypeID == this.searchItemType);
        }
        else {
          this.lstItem = this.lstAllItem;
        }

      }
    });
  }


  changeSelection(event) {
    console.log(event);
  }

  saveItem() {
    console.log("Item", this.objItem);
    this.ItemService.saveItem(this.objItem).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objItem = new Item();
        this.getAllItem();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }


}
