import { ButcheryDemand } from "./butcheryDemand";
import { ButcheryDemandDetail } from "./butcheryDemandDetail";

export class VMButcheryDemand {
    ButcheryDemand: ButcheryDemand;
    lstButcheryDemandDetail: ButcheryDemandDetail[] = new Array<ButcheryDemandDetail>();
}