import { GatePass } from "./gatePass";
import { GatePassDetail } from "./gatePassDetail";
import { GatePassItemDetail } from "./gatePassItemDetail";

export class VMGatePass {
    GatePass: GatePass;
    lstGatePassDetail: GatePassDetail[] = new Array<GatePassDetail>();
    lstGatePassItemDetail: GatePassItemDetail[] = new Array<GatePassItemDetail>();
    lstVMGatePassItemDetail: GatePassItemDetail[] = new Array<GatePassItemDetail>();

}