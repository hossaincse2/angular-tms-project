import { POLDistribution } from "./POLDistribution";
import { POLDistributionDetail } from "./POLDistributionDetail";

export class VMPOLDistribuiton {
    POLDistribution: POLDistribution = new POLDistribution();
    lstPOLDistributionDetail: POLDistributionDetail[] = new Array<POLDistributionDetail>();
}