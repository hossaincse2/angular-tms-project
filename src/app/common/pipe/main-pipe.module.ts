import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OrganizationDataFilterPipe, BranchDataFilterPipe, GetAccessRightName } from './dataFilter.pipe';
import { CustomDateFormatPipe } from './datefilter.pipe';
import { HighLightPipe } from './highLight.pipe';
import { ProductDataFilterPipe, ProductModelDataFilterPipe } from './productFilter.pipe';



@NgModule({
    declarations: [OrganizationDataFilterPipe, BranchDataFilterPipe,
        GetAccessRightName, CustomDateFormatPipe, HighLightPipe,
        ProductDataFilterPipe, ProductModelDataFilterPipe],
    imports: [CommonModule],
    exports: [OrganizationDataFilterPipe, BranchDataFilterPipe,
        GetAccessRightName, CustomDateFormatPipe, HighLightPipe,
        ProductDataFilterPipe, ProductModelDataFilterPipe]
})

export class MainPipe { }