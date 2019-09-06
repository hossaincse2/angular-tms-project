import { FreshDemand } from "./freshDemand";
import { FreshDemandDetail } from "./freshDemandDetail";

export class VMFreshDemand {
    FreshDemand: FreshDemand = new FreshDemand();
    lstFreshDemandDetail: FreshDemandDetail[] = new Array<FreshDemandDetail>();
}