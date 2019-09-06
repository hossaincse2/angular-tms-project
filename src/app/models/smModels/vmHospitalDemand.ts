import { HospitalItemDemand } from "./hospitalItemDemand";
import { HospitalItemDemandDetail } from "./hospitalItemDemandDetail";

export class VMHospitalDemand {
    HospitalItemDemand: HospitalItemDemand = new HospitalItemDemand();
    lstHospitalItemDemandDetail: HospitalItemDemandDetail[] = new Array<HospitalItemDemandDetail>();
}