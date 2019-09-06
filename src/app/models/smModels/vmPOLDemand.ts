import { POLDemand } from "./POLDemand";
import { POLDemandDetail } from "./POLDemandDetail";

export class VMPOLDemand {
    POLDemand: POLDemand = new POLDemand();
    lstPOLDemandDetail: POLDemandDetail[] = new Array<POLDemandDetail>();
}