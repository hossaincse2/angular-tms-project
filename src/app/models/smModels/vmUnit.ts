import { Unit } from "./unit";
import { UnitResourceDetail } from "./unitResourceDetail";

export class VMUnit {
    Unit: Unit;
    lstUnitResourceDetail: UnitResourceDetail[] = new Array<UnitResourceDetail>();
}