import { DryItemDemand } from "./dryItemDemand";
import { DryItemDemandDetail } from "./dryItemDemandDetail";
import { DryItemDemandResourceDetail } from "./dryItemDemandResourceDetail";
import { DryItemDemandFamilyDetail } from "./dryItemDemandFamilyDetail";
import { DryDemandRportObj } from "./dryDemandRportObj";


export class VMDryItemDemand {
    DryItemDemand: DryItemDemand;
    DryDemandRportObj: DryDemandRportObj;
    lstDryItemDemandDetail: DryItemDemandDetail[] = new Array<DryItemDemandDetail>();
    DryItemDemandResourceDetail: DryItemDemandResourceDetail;
    lstDryItemDemandFamilyDetail: DryItemDemandFamilyDetail[] = new Array<DryItemDemandFamilyDetail>();

}