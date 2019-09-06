import { PMReceive } from "./PMReceive";
import { PMReceiveDetail } from "./PMReceiveDetail";

export class VMPMReceive {
    PMReceive: PMReceive = new PMReceive();
    lstPMReceiveDetail: PMReceiveDetail[] = new Array<PMReceiveDetail>();
}