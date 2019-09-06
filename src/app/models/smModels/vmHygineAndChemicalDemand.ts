import { HygineAndChemicalDemand } from "./HygineAndChemicalDemand";
import { HygineAndChemicalDemandDetail } from "./HygineAndChemicalDemandDetail";

export class VMHygineAndChemicalDemand {
    HygineAndChemicalDemand: HygineAndChemicalDemand = new HygineAndChemicalDemand();
    lstHygineAndChemicalDemandDetail: HygineAndChemicalDemandDetail[] = new Array<HygineAndChemicalDemandDetail>();
}