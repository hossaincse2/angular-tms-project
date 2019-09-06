import { CondimentDemand } from "./condimentDemand";
import { CondimentDemandDetail } from "./condimentDemandDetail";

export class VMCondimentDemand {
    CondimentDemand: CondimentDemand=new CondimentDemand();
    lstCondimentDemandDetail: CondimentDemandDetail[] = new Array<CondimentDemandDetail>();
}